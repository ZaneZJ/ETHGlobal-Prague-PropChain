"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "../../fonts.css";

const montserrat = Montserrat({ subsets: ["latin"] });

// Mock property data (replace with real data source)
const sampleProperties = [
  {
    id: "1",
    name: "Modern Apartment",
    address: "123 Main St, Prague, Czech Republic",
    price: "254,948 $",
    description: "A beautiful property in Prague",
    image: "/images/home1.jpg",
    ltv: "64.8%",
    period: "18 months",
    country: "Czech Republic",
    interest: "11% + 1%",
    schedule: "Bullet",
    highlights: [
      "Self-contained units ranging from 23.24 m² to 30.09 m², each designed as a studio-style apartment.",
      "Estimated rental potential of €500-€600 per unit/month, offering strong cash flow during the holding period.",
      "Prime location: city center, close to public transport and amenities."
    ],
    overview: "The loan is used to refinance previously secured loans by leveraging a fully renovated property located at 123 Main St, Prague. The property is ideally suited for high-quality non-residential premises - administrative premises, tailored for rental income and real estate market.",
    plan: [
      "Refinance existing obligations.",
      "Provide working capital while the six units are rented out.",
      "Gradually market and sell each unit at a projected price of ~€3,600/m²."
    ],
    location: {
      city: "Prague",
      district: "City Center",
      highlights: [
        "Situated in the city center, a highly sought-after area known for its architectural heritage and urban lifestyle.",
        "Just 1 km from Old Town, with excellent walkability and access to key urban hubs.",
        "Multiple public transport routes within a 150 m radius for seamless citywide connectivity."
      ]
    }
  },
  // ... more properties
];

// Add this above the main component
interface CircularProgressProps {
  percent: number;
  size?: number;
  stroke?: number;
}
function CircularProgress({ percent, size = 80, stroke = 7 }: CircularProgressProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg width={size} height={size} className="block" style={{ display: 'block', position: 'relative', fontFamily: 'Montserrat, sans-serif' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f3f3f3"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#ea9800"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
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
          RAISED
        </text>
      </g>
    </svg>
  );
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const property = sampleProperties.find((p) => p.id === params.propertyId);

  // Add state for investment amount in USD
  const [investment, setInvestment] = useState<string>("50");
  const investmentNum = Number(investment);
  const minInvestment = 0;
  const maxInvestment = 73645;

  // Handler for input and slider
  const handleInvestmentChange = (val: string | number) => {
    let value = typeof val === 'number' ? val : Number(val);
    if (isNaN(value)) value = 0;
    if (value < minInvestment) value = minInvestment;
    if (value > maxInvestment) value = maxInvestment;
    setInvestment(String(value));
  };

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
        {/* <div style={{
          height: '50px',
          width: '50vw',
          background: 'linear-gradient(to right, #eee6d5 60%, rgba(238,230,213,0) 100%)',
          position: 'absolute',
          left: 'calc(-50vw + 50%)',
          marginTop: '27px',
          top: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}></div> */}
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
        <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'Kaftan, serif', fontWeight: 400, position: 'relative', zIndex: 1 }}>{property.name}</h1>
        <div className="text-gray-600 text-base mt-2" style={{position: 'relative', zIndex: 1}}>{property.address}</div>
      </div>
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 md:px-6 py-10" style={{marginTop: '0px'}}>
        {/* Top Section: Image, Badges, and Summary */}
        <div className="relative w-full overflow-hidden shadow-lg border border-gray-200 mb-8" style={{height: '340px', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          {/* Property Image (carousel placeholder) */}
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
            style={{zIndex: 1}}
          />
          {/* Carousel Arrows (static for now) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white" style={{border: '1px solid #eee'}}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white" style={{border: '1px solid #eee'}}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
          {/* Status and Info Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="bg-[#fff9f0] text-[#ea9800] text-xs font-semibold px-3 py-1 rounded">Open</span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 3 days left</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <span className="bg-[#ffffff] text-[#ea9800] text-xs font-medium px-3 py-1 rounded">Up to 1% Bonus interest</span>
            <span className="bg-[#fff9f0] text-[#ea9800] text-xs font-medium px-3 py-1 rounded">Viewed by 226 investors</span>
          </div>
          {/* Carousel dots (static) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {[0,1,2,3,4].map(i => (
              <span key={i} className={`w-2 h-2 rounded-full ${i===0 ? 'bg-gray-800' : 'bg-gray-300'}`}></span>
            ))}
          </div>
        </div>
        {/* Summary Card */}
        <div className="w-full bg-white rounded-xl shadow border border-gray-100 flex flex-wrap justify-between items-center px-6 py-4 mb-8" style={{marginTop: '-40px', zIndex: 2, position: 'relative', fontFamily: 'Montserrat, sans-serif'}}>
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="mb-1"><CircularProgress percent={29} size={80} stroke={7} /></div>
            <span className="text-xs text-gray-400 mt-1">73,645$ left</span>
            <span className="text-xs text-gray-400">21 investors</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.price}</span>
            <span className="text-xs text-gray-500">Amount</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.period}</span>
            <span className="text-xs text-gray-500">Period</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.country}</span>
            <span className="text-xs text-gray-500">Country</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.interest}</span>
            <span className="text-xs text-gray-500">Interest</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.ltv}</span>
            <span className="text-xs text-gray-500">LTV</span>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-base text-gray-900">{property.schedule}</span>
            <span className="text-xs text-gray-500">Schedule type</span>
            <span className="text-xs text-gray-400">Quarterly payments</span>
          </div>
        </div>
        {/* Decorative divider as on landing page */}
        <div
            style={{
              height: '400px',
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
          {/* Enter amount to invest card */}
          <div className="flex-1 basis-1/2 bg-white shadow p-6 mx-auto md:mx-0" style={{border: '1px solid #e6e8f0'}}>
            <div className="relative mb-4" style={{height: '40px'}}>
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
              <div className="text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 400, fontSize: '18px' }}>Enter amount to invest</div>
            </div>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
              <input
                type="number"
                min={minInvestment}
                max={maxInvestment}
                value={investment}
                onChange={e => handleInvestmentChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-9 py-2 text-lg bg-white focus:outline-none focus:ring-2"
                placeholder="Amount in $"
                style={{paddingLeft: '2.2rem', boxShadow: '0 0 0 0px #ea9800'}}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #ea9800'}
                onBlur={e => e.currentTarget.style.boxShadow = '0 0 0 0px #ea9800'}
              />
            </div>
            {/* Slider */}
            <input
              type="range"
              min={minInvestment}
              max={maxInvestment}
              value={investmentNum}
              onChange={e => handleInvestmentChange(e.target.value)}
              className="w-full mb-2"
              style={{
                accentColor: '#ea9800',
                background: 'linear-gradient(to right, #ea9800 0%, #e5e7eb 100%)',
                height: '4px',
                borderRadius: '2px',
              }}
            />
            <div className="flex justify-between text-gray-500 text-sm mb-2">
              <span>{investment} $</span>
              <span>73645 $</span>
            </div>
            <div className="mb-6 text-base">Potential earnings: <span className="font-semibold" style={{ color: '#ea9800' }}>€8.25</span> <span className="text-gray-700">(11%)</span></div>
            <a
              href="#"
              className="w-full block py-2 text-lg font-medium border text-center"
              style={{
                border: '1px solid #ea9800',
                color: '#ea9800',
                background: 'white',
                borderRadius: 0,
                textTransform: 'uppercase',
                transition: 'background 0.4s ease, color 0.4s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ea9800';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#ea9800';
              }}
            >
              INVEST NOW
            </a>
          </div>
          {/* Location card */}
          <div className="flex-1 basis-1/2 bg-white shadow p-6 mx-auto md:mx-0 border border-gray-200">
            <div className="relative mb-4" style={{height: '40px'}}>
              <div style={{
                backgroundColor: 'rgb(238, 230, 213)',
                height: '35px',
                width: '150px',
                position: 'absolute',
                left: '-25px',
                top: '38%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}></div>
              <div className="text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 400, fontSize: '18px' }}>Location</div>
            </div>
            <div className="mb-2 text-gray-900 font-medium">{property.address}</div>
            <div className="mb-2 text-gray-500 text-sm">Reg. nr: 1094-0456-6012:0042 • Total area: 191.09m²</div>
            <div className="w-full h-36 bg-gray-200 flex items-center justify-center mb-3 relative overflow-hidden" style={{ borderRadius: '8px' }}>
              <iframe
                title="Property Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'grayscale(1)', opacity: 0.85 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                allowFullScreen
              ></iframe>
              <span className="absolute inset-0 flex items-center justify-center z-10">
                <a
                  href="/explore"
                  className="px-4 py-2 text-lg font-medium border text-center"
                  style={{
                    border: '1px solid #ea9800',
                    color: '#ea9800',
                    background: 'white',
                    borderRadius: 0,
                    textTransform: 'uppercase',
                    transition: 'background 0.4s ease, color 0.4s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = '#ea9800';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#ea9800';
                  }}
                >
                  Show map
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded text-xs font-semibold flex items-center gap-1" style={{ background: '#fff9f0', color: '#ea9800' }}><svg width="14" height="14" fill="none" stroke="#ea9800" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2"/></svg>RESIDENTIAL</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10" style={{ position: 'relative', zIndex: 2, marginBottom: '-50px' }}>
          {/* Main Info */}
          <div className="flex-1 flex flex-col gap-4" style={{fontFamily: 'Montserrat, sans-serif', marginTop: '20px'}}>
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-lg text-gray-900" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Project Highlights</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {property.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-lg text-gray-900" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Project Overview</h2>
              <p className="text-gray-700 text-sm">{property.overview}</p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-lg text-gray-900" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Project Plan</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {property.plan.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-lg text-gray-900" style={{ fontFamily: 'Kaftan, serif', letterSpacing: '0.06em', fontWeight: 400 }}>Location</h2>
              <div className="text-gray-700 text-sm mb-1">{property.location.city} - {property.location.district}</div>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {property.location.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 