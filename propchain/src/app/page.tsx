"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/images/main1.jpg')" }}>
      {/* Light grey overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to right, rgba(235, 235, 235, 0.7) 0%, rgba(255, 255, 255, 0.07) 100%)",
          height: "100vh"
        }}
      ></div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-start px-8 md:px-24 mx-[100px] relative z-10" style={{ height: 'calc(100vh - 170px)' }}>
        {/* <div
          className="h-0.5 rounded-full"
          style={{
            position: "absolute",
            marginTop: "55px",
            marginLeft: "75px",
            width: "430px",
            background: "linear-gradient(to right, transparent 0%, #ea9800 20%, #ea9800 80%, transparent 100%)"
          }}
        ></div>
        <div
          className="h-0.5 rounded-full"
          style={{
            position: "absolute",
            marginTop: "180px",
            width: "485px",
            background: "linear-gradient(to right, transparent 0%, #ea9800 20%, #ea9800 80%, transparent 100%)"
          }}
        ></div> */}
        <div className="relative z-10 mt-16 md:mt-32 animate-fade-in-up">
          <p className="font-[Kaftan] text-3xl md:text-5xl text-left mb-6 font-normal leading-tight -mt-[30px] animate-fade-in-color">
            We Build AI-Driven Solutions<br />
            for Smarter Property & <br />
            Financial Workflows
          </p>
        </div>
      </section>

      {/* Pillar Cards Bar */}
      <section
        className="w-[73%] pr-[200px] bg-black/95 py-8 px-2 md:px-0 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 z-20 animate-fade-in-left"
        style={{ paddingRight: '30px', marginRight: '100px' }}
      >
        <div className="mx-[90px]"></div>
        {[
          {
            number: '01.',
            title: 'Intelligent Process Automation',
            desc: 'Streamline contracts, maintenance, and communication using AI agents trained on real property workflows.'
          },
          {
            number: '02.',
            title: 'Secure On-Chain Transactions',
            desc: 'Manage payments, escrows, and verifiable records through transparent smart contracts on the EVM network.'
          },
          {
            number: '03.',
            title: 'Data-Driven Insights & Compliance',
            desc: 'Get dynamic pricing suggestions, rent optimization, and generate localized tax or compliance reports automatically.'
          }
        ].map((pillar, idx) => (
          <div
            key={pillar.number}
            className={`flex-1 flex flex-col items-start px-4 ${idx !== 0 ? 'md:border-l border-white/20' : ''}`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <div className="flex items-center w-full mb-2">
              <span className="flex-1 h-px bg-white/20 mr-4"></span>
              <span className="text-white text-sm font-semibold tracking-widest">{pillar.number}</span>
            </div>
            <div className="text-left">
              <div className="text-white text-xs md:text-sm font-semibold">{pillar.title}</div>
              <div className="text-white text-xs md:text-sm font-light">{pillar.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Use Cases Section */}
      <section className="w-full bg-white py-20 px-4 flex flex-col items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Title and subtitle */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm tracking-[0.3em] text-gray-400 uppercase block mb-2">[ USE CASES ]</span>
          <h2 className="font-[Kaftan] text-2xl md:text-4xl tracking-[.06em] text-gray-900 mb-2">
            Where Our Platform Delivers Impact
          </h2>
          <div className="flex justify-center">
            <span className="text-2xl text-gray-300">⸻</span>
          </div>
        </div>
        {/* Spiral layout */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          {/* Left column */}
          <div className="flex-1 flex flex-col items-end justify-center gap-16 md:gap-24">
            <div className="max-w-xs text-right relative">
              <div className="text-gray-400 text-2xl font-semibold mb-0.5" style={{ lineHeight: 1, fontWeight: 300, marginBottom: '10px'}}>01.</div>
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>Property Owners & Managers</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Easily manage portfolios, automate leasing, and receive payments without intermediaries. Get real-time reports and compliance documents per property.
              </div>
            </div>
            <div className="max-w-xs text-right relative">
              <div className="text-gray-400 text-2xl font-semibold mb-0.5" style={{ lineHeight: 1, fontWeight: 300, marginBottom: '10px'}}>02.</div>
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>Tenants & Renters</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Enjoy transparent leases, crypto payment options, automated reminders, and instant support via AI assistants—faster than traditional systems.
              </div>
            </div>
          </div>
          {/* Center spiral image */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center mx-8" style={{ marginLeft: '70px', marginRight: '70px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '240px', top: '30px', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', background: '#ffffff', borderRadius: '50%', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', left: '240px', top: '30px', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', background: '#ffffff', borderColor: '#bbbbbb', borderWidth: '0.5px', borderStyle: 'solid', borderRadius: '50%', zIndex: 2 }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <img alt="PropChain Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" srcSet="/_next/image?url=%2Fimages%2Fblack-logo.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fblack-logo.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fblack-logo.png&w=128&q=75" style={{ color: 'transparent', maxInlineSize: '-webkit-fill-available' }} />
              </div>
            </div>
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg border-4 border-gray-100 bg-gray-200 flex items-center justify-center">
              <Image
                src="/images/main2.jpg"
                alt="Spiral"
                width={320}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Right column */}
          <div className="flex-1 flex flex-col items-start justify-center gap-16 md:gap-24">
            <div className="max-w-xs text-left relative">
              <div className="text-gray-400 text-2xl font-semibold mb-0.5" style={{ lineHeight: 1, fontWeight: 300, marginBottom: '10px'}}>03.</div>
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>Developers & Builders</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Deploy custom logic for payments, escrow, and smart workflows using modular smart contract templates tailored for real estate logic.
              </div>
            </div>
            <div className="max-w-xs text-left relative">
              <div className="text-gray-400 text-2xl font-semibold mb-0.5" style={{ lineHeight: 1, fontWeight: 300, marginBottom: '10px'}}>04.</div>
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>Financial Institutions & Tax Authorities</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Access clean, immutable ledgers for income verification, tax reporting, and regulatory audit trails—generated directly from on-chain events.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-black/95 text-white py-10 px-4 flex flex-col items-center justify-center mt-12 gap-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex flex-col items-center gap-2">
          <img src="/images/white-logo.png" alt="PropChain Logo" width={40} height={40} className="object-contain" style={{ filter: 'brightness(0.85)' }} />
          <span className="text-[#e5e5e5] text-base md:text-lg tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            PROPCHAIN
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <span className="text-sm text-gray-300">AI-driven solutions for smarter property & finance</span>
          <div className="flex gap-6 justify-center mt-2">
            {/* Twitter/X */}
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-colors text-[#e5e5e5] hover:text-[#ea9800]">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.608 2.262c0 1.56.795 2.936 2.006 3.744a4.48 4.48 0 0 1-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418a4.5 4.5 0 0 1-2.03.077c.573 1.788 2.24 3.09 4.213 3.125A9.01 9.01 0 0 1 2 19.54a12.73 12.73 0 0 0 6.89 2.02c8.266 0 12.79-6.844 12.79-12.79 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors text-[#e5e5e5] hover:text-[#ea9800]">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors text-[#e5e5e5] hover:text-[#ea9800]">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.018-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-6">&copy; {new Date().getFullYear()} PropChain. All rights reserved.</div>
      </footer>
    </div>
  );
} 