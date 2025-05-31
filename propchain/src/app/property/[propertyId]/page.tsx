"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "../../fonts.css";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const montserrat = Montserrat({ subsets: ["latin"] });

// Mock property data for Dubai property
const dubaiProperty = {
  id: "5",
  name: "Dubai Marina Penthouse",
  address: "Dubai Marina, Dubai, UAE",
  price: "550,000 $",
  description: "Luxurious penthouse with marina views",
  image: "/images/test.jpg",
  ltv: "70%",
  period: "12 months",
  country: "UAE",
  interest: "12% + 1.5%",
  schedule: "Monthly",
  highlights: [
    "Stunning penthouse with panoramic views of Dubai Marina and the Arabian Gulf.",
    "High-end finishes and premium appliances throughout the property.",
    "Access to exclusive marina facilities and private beach club."
  ],
  overview: "This premium penthouse in Dubai Marina offers an exceptional investment opportunity in one of Dubai's most sought-after locations. The property features modern architecture, luxury finishes, and breathtaking views of the marina and city skyline.",
  plan: [
    "Secure long-term rental agreements with high-net-worth individuals.",
    "Implement value-add improvements to maximize rental returns.",
    "Explore potential for short-term luxury rentals during peak seasons."
  ],
  location: {
    city: "Dubai",
    district: "Dubai Marina",
    highlights: [
      "Located in the heart of Dubai Marina, one of the most prestigious waterfront communities.",
      "Walking distance to Dubai Marina Mall and the beach.",
      "Excellent connectivity to major highways and Dubai Metro."
    ]
  }
};

// Add this above the main component
interface CircularProgressProps {
  percent: number;
  secondaryPercent?: number;
  size?: number;
  stroke?: number;
}

function CircularProgress({ percent, secondaryPercent = 0, size = 80, stroke = 7 }: CircularProgressProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const primaryOffset = circumference * (1 - percent / 100);
  const secondaryOffset = circumference * (1 - (percent + secondaryPercent) / 100);
  return (
    <svg width={size} height={size} className="block" style={{ display: 'block', position: 'relative', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Background */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f3f3f3"
        strokeWidth={stroke}
      />
      {/* Secondary (light beige) */}
      {secondaryPercent > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(238, 230, 213)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={secondaryOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s', transform: `rotate(-90deg)`, transformOrigin: '50% 50%' }}
        />
      )}
      {/* Primary (orange) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#ea9800"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={primaryOffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s', transform: `rotate(-90deg)`, transformOrigin: '50% 50%' }}
      />
      <g>
        <text
          x="50%"
          y="44%"
          textAnchor="middle"
          fontSize="20px"
          fontWeight="400"
          fill="#ea9800"
          dominantBaseline="middle"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {percent}%
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          fontSize="10px"
          fill="#888"
          fontWeight="400"
          style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px' }}
        >
          HOLDS
        </text>
      </g>
    </svg>
  );
}

// Mock data for charts
const roiData = [
  { month: 'Jan', income: 25000, expenses: 15000 },
  { month: 'Feb', income: 28000, expenses: 16000 },
  { month: 'Mar', income: 32000, expenses: 17000 },
  { month: 'Apr', income: 35000, expenses: 18000 },
  { month: 'May', income: 38000, expenses: 19000 },
  { month: 'Jun', income: 42000, expenses: 20000 },
  { month: 'Jul', income: 45000, expenses: 21000 },
  { month: 'Aug', income: 48000, expenses: 22000 },
  { month: 'Sep', income: 52000, expenses: 23000 },
  { month: 'Oct', income: 55000, expenses: 24000 },
  { month: 'Nov', income: 58000, expenses: 25000 },
  { month: 'Dec', income: 62000, expenses: 26000 }
];

const investmentDistribution = [
  { name: 'Equity', value: 60 },
  { name: 'Debt', value: 40 },
];

const COLORS = ['#ea9800', '#f3f3f3'];

const occupancyData = [
  { month: 'Nov', occupancy: 75 },
  { month: 'Dec', occupancy: 83 },
  { month: 'Jan', occupancy: 82 },
  { month: 'Feb', occupancy: 97 },
  { month: 'Mar', occupancy: 90 },
  { month: 'Apr', occupancy: 73 },
];

const nightlyRateData = [
  { month: 'Nov', rate: 650 },
  { month: 'Dec', rate: 700 },
  { month: 'Jan', rate: 580 },
  { month: 'Feb', rate: 630 },
  { month: 'Mar', rate: 350 },
  { month: 'Apr', rate: 520 },
];

interface PropertyMetadata {
  name: string;
  description: string;
  images_folder?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

// Add this after the existing interfaces
interface PropertyImage {
  src: string;
  alt: string;
}

export default function DubaiPropertyPage() {
  const params = useParams();
  const property = dubaiProperty;
  const [metadata, setMetadata] = useState<PropertyMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/property-data/fixed-metadata.json');
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  // Add state for investment amount in USD
  const [investment, setInvestment] = useState<string>("50");
  const investmentNum = Number(investment);
  const minInvestment = 0;
  const maxInvestment = 73645;

  // State for file upload in contract form
  const [contractFile, setContractFile] = useState<File | null>(null);

  // Handler for input and slider
  const handleInvestmentChange = (val: string | number) => {
    let value = typeof val === 'number' ? val : Number(val);
    if (isNaN(value)) value = 0;
    if (value < minInvestment) value = minInvestment;
    if (value > maxInvestment) value = maxInvestment;
    setInvestment(String(value));
  };

  const [selectedImage, setSelectedImage] = useState<string>("/property-data/prop1/prop1-11.avif");
  const [images] = useState<PropertyImage[]>(() => {
    return Array.from({ length: 29 }, (_, i) => ({
      src: `/property-data/prop1/prop1-${i + 1}.avif`,
      alt: `Property image ${i + 1}`
    }));
  });

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">Property not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-white ${montserrat.className}`}>
      <Header />
      {/* Property Title at the Top */}
      <div className="w-full max-w-5xl mx-auto px-2 md:px-6 pt-8 pb-2" style={{marginTop: '100px', marginBottom: '-20px', position: 'relative'}}>
        <div style={{
          height: '1px',
          width: '50vw',
          background: 'linear-gradient(to right,rgb(0, 0, 0) 60%, rgba(238,230,213,0) 100%)',
          position: 'absolute',
          left: 'calc(-50vw + 40%)',
          marginTop: '15px',
          top: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>
        <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'Kaftan, serif', fontWeight: 400, position: 'relative', zIndex: 1 }}>
          {isLoading ? 'Loading...' : error ? 'Error loading property' : metadata?.name || 'Property not found'}
        </h1>
        <div className="text-gray-600 text-base mt-2" style={{position: 'relative', zIndex: 1}}>
          {isLoading ? 'Loading description...' : error ? 'Error loading description' : metadata?.description || 'No description available'}
        </div>
      </div>
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 md:px-6 py-10" style={{marginTop: '0px'}}>
        {/* Top Section: Image, Badges, and Summary */}
        <div className="relative w-full overflow-hidden shadow-lg border border-gray-200 mb-8" style={{height: '340px', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          {/* Property Image */}
          <Image
            src={selectedImage}
            alt={metadata?.name || 'Property image'}
            fill
            className="object-cover"
            style={{zIndex: 1}}
          />
          {/* Status and Info Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="bg-[#fff9f0] text-[#ea9800] text-xs font-semibold px-3 py-1 rounded">Open</span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 3 days left</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <span className="bg-[#ffffff] text-[#ea9800] text-xs font-medium px-3 py-1 rounded">
              {isLoading ? 'Loading...' : error ? 'Error' : metadata?.attributes.find(attr => attr.trait_type === 'Property Type')?.value || 'Property Type'}
            </span>
            <span className="bg-[#fff9f0] text-[#ea9800] text-xs font-medium px-3 py-1 rounded">Viewed by 156 investors</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="w-full bg-white rounded-xl shadow border border-gray-100 flex flex-wrap justify-between items-center px-6 py-4 mb-8" style={{marginTop: '-40px', zIndex: 2, position: 'relative', fontFamily: 'Montserrat, sans-serif'}}>
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="mb-1"><CircularProgress percent={25} secondaryPercent={60} size={80} stroke={7} /></div>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.price}</span>
            <span className="text-xs text-gray-500">Total amount</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <a 
              href="/tokens" 
              className="text-base text-[#ea9800] hover:text-[#d88a00] transition-colors"
            >
              View Token
            </a>
            <span className="text-xs text-gray-500">DMG Token</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">
              {isLoading ? 'Loading...' : error ? 'Error' : metadata?.attributes.find(attr => attr.trait_type === 'Built Year')?.value || 'Built Year'}
            </span>
            <span className="text-xs text-gray-500">Built Year</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.country}</span>
            <span className="text-xs text-gray-500">Country</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">100,000$</span>
            <span className="text-xs text-gray-500">Left to invest</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">6</span>
            <span className="text-xs text-gray-500">Investors</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.schedule}</span>
            <span className="text-xs text-gray-500">Schedule type</span>
            <span className="text-xs text-gray-400">Monthly payments</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="w-full overflow-x-auto mb-8 pb-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-24 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200"
                style={{
                  borderColor: selectedImage === image.src ? '#ea9800' : 'transparent'
                }}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative divider as on landing page */}
        <div
            style={{
              height: '950px',
              width: '100vw',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundImage: "url('/images/main2.jpg')",
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        {/* Investment and Location Sections */}
        <div className="w-full flex flex-col md:flex-row gap-8 mb-10" style={{ position: 'relative', zIndex: 2, marginTop: '60px' }}>
          {/* Charts Section */}
          <div className="w-full bg-white shadow p-6 mb-8" style={{border: '1px solid #e6e8f0'}}>
            <div className="relative mb-6" style={{height: '40px'}}>
              <div style={{
                backgroundColor: 'rgb(238, 230, 213)',
                height: '35px',
                width: '300px',
                position: 'absolute',
                left: '-25px',
                top: '38%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}></div>
              <div className="text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 400, fontSize: '18px' }}>Property Performance</div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Income vs Expenses Chart */}
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-center" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Income vs Expenses</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="income" name="Income" stroke="#ea9800" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#4B5563" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Side by side charts */}
              <div className="flex gap-8">
                {/* Monthly Occupancy Rate Chart */}
                <div className="flex-1 bg-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Monthly occupancy rate</h3>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="occupancy" name="Occupancy rate" stroke="#ea9800" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Average Price for One Night Chart */}
                <div className="flex-1 bg-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Average price for one night</h3>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={nightlyRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[300, 800]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rate" name="Nightly rate" stroke="#ea9800" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* New 50/50 Section: Generate Contract & Chat Bot */}
        <div className="w-full flex flex-col md:flex-row gap-8 mb-10" style={{ position: 'relative', zIndex: 2 }}>
          {/* Generate Contract Form */}
          <div className="flex-1 bg-white shadow p-6 rounded-lg border border-gray-100">
            <div className="relative mb-4" style={{height: '40px'}}>
              <div style={{
                backgroundColor: 'rgb(238, 230, 213)',
                height: '35px',
                width: '260px',
                position: 'absolute',
                left: '-25px',
                top: '38%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}></div>
              <div className="text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 400, fontSize: '18px' }}>Generate Contract</div>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input type="text" placeholder="Name" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
                <input type="text" placeholder="Surname" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              </div>
              <input type="text" placeholder="ID" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              <input type="email" placeholder="Email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              <input type="tel" placeholder="Phone number" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              <input type="number" placeholder="Monthly rent amount" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              <div>
                <label className="block text-xs text-gray-500 mb-1">Upload Document</label>
                <div className="relative mt-2">
                  <input
                    id="contract-upload"
                    type="file"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/csv,application/vnd.ms-excel"
                    onChange={e => setContractFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                    className="hidden"
                  />
                  {contractFile ? (
                    <div className="mb-2">
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                        <span className="text-sm text-gray-700 truncate max-w-[180px]">{contractFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setContractFile(null)}
                          className="ml-4 text-sm text-red-500 hover:text-red-700"
                        >
                          Remove file
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="contract-upload"
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ea9800] transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-gray-600 text-sm mb-2">
                          Click to upload document
                        </div>
                        <div className="text-xs text-gray-400">
                          Supported formats: PDF, DOC, DOCX, CSV, XLS
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              <a
                href="#"
                role="button"
                tabIndex={0}
                className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[#ea9800] transition-colors duration-300 mx-auto block md:inline-block uppercase"
                style={{ letterSpacing: '0.06em' }}
              >
                Generate Contract
              </a>
            </form>
          </div>
          {/* Chat Bot Window */}
          <div className="flex-1 bg-white shadow p-6 rounded-lg border border-gray-100 flex flex-col">
            <div className="relative mb-4" style={{height: '40px'}}>
              <div style={{
                backgroundColor: 'rgb(238, 230, 213)',
                height: '35px',
                width: '175px',
                position: 'absolute',
                left: '-25px',
                top: '38%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}></div>
              <div className="text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 400, fontSize: '18px' }}>AI ASSISTANT</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-4 overflow-y-auto mb-4" style={{ minHeight: '260px', maxHeight: '320px' }}>
              {/* Placeholder chat messages */}
              <div className="mb-2 text-sm text-gray-700">👋 Hi! How can I help you with your contract?</div>
              <div className="mb-2 text-sm text-gray-500 text-right">Type your message below…</div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Type a message..." className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors" />
              <a
                href="#"
                role="button"
                tabIndex={0}
                className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[#ea9800] transition-colors duration-300 mx-auto block md:inline-block uppercase"
                style={{ letterSpacing: '0.06em' }}
              >
                Send
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10" style={{ position: 'relative', zIndex: 2, marginBottom: '-50px' }}>
          {/* {isLoading ? (
            <div className="w-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea9800] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading property metadata...</p>
            </div>
          ) : error ? (
            <div className="w-full text-center py-8 text-red-500">
              Error loading metadata: {error}
            </div>
          ) : metadata && (
            <div className="w-full bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Kaftan, serif', fontWeight: 400 }}>{metadata.name}</h2>
              <p className="text-gray-600 mb-6">{metadata.description}</p>
              
              {metadata.images_folder && (
                <div className="mb-6">
                  <img 
                    src={`${metadata.images_folder}/main.jpg`} 
                    alt={metadata.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metadata.attributes.map((attr, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{attr.trait_type}</h3>
                    <p className="text-gray-900">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </main>
      <Footer />
    </div>
  );
} 