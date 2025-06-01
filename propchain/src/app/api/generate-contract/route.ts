// @ts-ignore
// eslint-disable-next-line
declare module 'pdf-parse';

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import formidable, { Fields, Files, File as FormidableFile } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import OpenAI from 'openai';

export const config = {
  api: { bodyParser: false },
};

async function parseForm(req: Request): Promise<{ fields: Fields; files: Files }> {
  const buffers: Buffer[] = [];
  const reader = req.body?.getReader();
  if (!reader) throw new Error('No body');
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) buffers.push(Buffer.from(value));
    done = doneReading;
  }
  const buffer = Buffer.concat(buffers);
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    form.parse(buffer as any, (err: any, fields: Fields, files: Files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req as any);
    const getString = (val: any) => Array.isArray(val) ? val[0] : val || '';
    const name = getString(fields.name);
    const surname = getString(fields.surname);
    const id = getString(fields.id);
    const email = getString(fields.email);
    const phone = getString(fields.phone);
    const rentAmount = getString(fields.rentAmount);
    const rentStart = getString(fields.rentStart);
    const rentEnd = getString(fields.rentEnd);
    const fileField = files.contractFile;
    const file: FormidableFile | undefined = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    // Read and extract text from PDF
    const fileBuffer = fs.readFileSync(file.filepath);
    const pdfData = await pdfParse(fileBuffer);

    // Compose prompt for OpenAI
    const prompt = `
Here is a rental agreement template:
${pdfData.text}

Fill in the following details:
Name: ${name}
Surname: ${surname}
ID: ${id}
Email: ${email}
Phone: ${phone}
Monthly Rent: ${rentAmount}
Rent Start Date: ${rentStart}
Rent End Date: ${rentEnd}

Return the completed contract with all placeholders filled.
`;

    // Call OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
    });

    const generatedText = completion.choices[0].message?.content || '';

    // Create a new PDF with the generated text
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    const lines = generatedText.split('\n');
    let y = page.getHeight() - 30;
    for (const line of lines) {
      page.drawText(line, { x: 30, y, size: fontSize, font });
      y -= fontSize + 2;
      if (y < 30) {
        y = page.getHeight() - 30;
        pdfDoc.addPage();
      }
    }
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=generated_contract.pdf',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
