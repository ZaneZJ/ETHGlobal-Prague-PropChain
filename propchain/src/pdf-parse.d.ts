declare module 'pdf-parse' {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  interface PDFData {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
  }

  interface PDFParseOptions {
    version?: string;
    max?: number;
    pagerender?: (pageData: any) => string;
  }

  function pdf(dataBuffer: Buffer | Uint8Array, options?: PDFParseOptions): Promise<PDFData>;

  export = pdf;
} 