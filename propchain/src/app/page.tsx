"use client";
import React, { useState } from "react";
import Image from "next/image";

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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm shadow-sm bg-white/60">
        <div className="flex items-center gap-3 w-full z-20 mx-[150px]">
          <div className="relative group flex items-center gap-3">
            <a href="/" className="relative overflow-hidden group">
              <Image
                src="/images/black-logo.png"
                alt="PropChain Logo"
                width={40}
                height={40}
                className="object-contain w-10 h-10 transition-all duration-400 relative z-10"
                style={{ width: 'auto', height: '40px' }}
              />
            </a>
            <a
              href="/"
              className="text-gray-900 text-base md:text-lg tracking-[0.2em] font-medium relative overflow-hidden group-hover:text-yellow-600 transition-all duration-400 uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              PROPCHAIN
              <span className="brand-underline absolute bottom-0 left-0 w-1/2 h-[1px] group-hover:w-full transform transition-all duration-500"></span>
            </a>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700 uppercase" style={{ marginRight: '150px' }}>
          <a href="#" className="transition-colors duration-200 hover:text-yellow-600">Home</a>
          <a href="#" className="transition-colors duration-200 hover:text-yellow-600">Solutions</a>
          <a href="#" className="transition-colors duration-200 hover:text-yellow-600">About</a>
          <a href="#" className="transition-colors duration-200 hover:text-yellow-600">Contact</a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-6 flex flex-col justify-center items-center cursor-pointer group"
            aria-label="Open menu"
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1 transition-all duration-400 group-hover:bg-yellow-600"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1 transition-all duration-400 group-hover:bg-yellow-600"></div>
            <div className="w-6 h-0.5 bg-gray-700 transition-all duration-400 group-hover:bg-yellow-600"></div>
          </button>
        </nav>
      </header>

      {/* Sidebar menu and overlay with animation */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu overlay"
      />
      <div className={`fixed top-0 right-0 w-64 h-full z-50 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-black/90 flex flex-col items-start p-8 h-full relative">
          <a
            href="#"
            onClick={e => { e.preventDefault(); setMenuOpen(false); }}
            className="absolute top-6 right-6 text-white/90 p-2 rounded-lg transition-all duration-400 group hover:scale-110"
            aria-label="Close menu"
          >
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white transform -translate-y-1/2 rotate-45 transition-all duration-400 group-hover:bg-[#ea9800]"></div>
              <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white transform -translate-y-1/2 -rotate-45 transition-all duration-400 group-hover:bg-[#ea9800]"></div>
            </div>
          </a>
          <a href="#" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600">HOME</a>
          <a href="#" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600">SOLUTIONS</a>
          <a href="#" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600">ABOUT</a>
          <a href="#" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600">CONTACT</a>
        </div>
      </div>

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
            <div className="max-w-xs text-right">
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>01. Property Owners & Managers</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Easily manage portfolios, automate leasing, and receive payments without intermediaries. Get real-time reports and compliance documents per property.
              </div>
            </div>
            <div className="max-w-xs text-right">
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>02. Tenants & Renters</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Enjoy transparent leases, crypto payment options, automated reminders, and instant support via AI assistants—faster than traditional systems.
              </div>
            </div>
          </div>
          {/* Center spiral image */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center mx-8">
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
            <div className="max-w-xs text-left">
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>03. Developers & Builders</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Deploy custom logic for payments, escrow, and smart workflows using modular smart contract templates tailored for real estate logic.
              </div>
            </div>
            <div className="max-w-xs text-left">
              <div className="text-sm font-semibold mb-1 uppercase" style={{ color: 'oklch(0.49 0 0)' }}>04. Financial Institutions & Tax Authorities</div>
              <div className="text-gray-700 text-sm md:text-base font-light">
                Access clean, immutable ledgers for income verification, tax reporting, and regulatory audit trails—generated directly from on-chain events.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 