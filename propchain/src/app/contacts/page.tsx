"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import "../fonts.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className={`min-h-screen relative ${montserrat.className}`}>
      <Header />

      {/* Hero Section with main4.jpg */}
      <div className="relative h-[35vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/main1.jpg"
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/10 z-20"></div>
        <div className="absolute top-0 left-[60px] w-[2px] h-full bg-white/10 z-20"></div>
        <div className="absolute top-0 right-[60px] w-[2px] h-full bg-white/10 z-20"></div>
        <div className="relative h-full flex items-center justify-center z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 tracking-wide font-[Kaftan] leading-[1.4] text-white mt-[50px]">Contacts</h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          {/* Vertical Lines - Hidden on mobile */}
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gray-200"></div>
          <div className="hidden sm:block absolute top-0 left-[30px] sm:left-[60px] w-[2px] h-full bg-gray-200"></div>
          <div className="hidden sm:block absolute top-0 right-[30px] sm:right-[60px] w-[2px] h-full bg-gray-200"></div>
          <div className="max-w-[75%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Left Side - Contact Form */}
              <div className="bg-white p-8 md:p-12 h-[400px] flex flex-col justify-center relative z-10">
                <h2 className="text-2xl font-medium mb-2">GET IN TOUCH</h2>
                <p className="text-sm text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="YOUR NAME *"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="YOUR EMAIL *"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="MESSAGE"
                      rows={4}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#ea9800] transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[#ea9800] transition-colors duration-300 mx-auto block md:inline-block"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>

              {/* Right Side - Contact Info */}
              <div className="bg-[#181818] p-8 md:p-12 flex flex-col justify-center relative z-20 mt-[10px] md:mt-[-100px]" style={{ height: '150%' }}>
                <div>
                  <p className="text-gray-400 mb-4">[ OUR CONTACT DETAILS ]</p>
                  <h2 className="text-[2rem] text-white font-[Kaftan] leading-[1.4] mb-8">Let's Simplify Property Management</h2>
                  <p className="text-gray-400 text-sm leading-relaxed flex flex-col gap-4 mb-8">
                    <span>Have questions about smart contracts, payments, or using the platform? We're here to help.</span>
                    <span>Reach out anytime—we aim to respond within 24 hours on business days.</span>
                    <span>Whether you're managing properties, handling finances, or just exploring what's possible with AI + blockchain, we're happy to assist.</span>
                  </p>
                  <div className="flex gap-4">
                    {/* Twitter/X */}
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#ea9800] hover:text-[#ea9800] text-gray-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.608 2.262c0 1.56.795 2.936 2.006 3.744a4.48 4.48 0 0 1-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418a4.5 4.5 0 0 1-2.03.077c.573 1.788 2.24 3.09 4.213 3.125A9.01 9.01 0 0 1 2 19.54a12.73 12.73 0 0 0 6.89 2.02c8.266 0 12.79-6.844 12.79-12.79 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z"/>
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#ea9800] hover:text-[#ea9800] text-gray-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
                      </svg>
                    </a>
                    {/* GitHub */}
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#ea9800] hover:text-[#ea9800] text-gray-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.018-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Pattern */}
      <div className="relative h-[30vh] w-full" style={{marginBottom: '-80px'}}>
        <div className="absolute inset-0">
          <Image
            src="/images/main2.jpg"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        {/* Vertical Lines - Hidden on mobile */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/10 z-20"></div>
        <div className="hidden sm:block absolute top-0 left-[60px] w-[2px] h-full bg-white/10 z-20"></div>
        <div className="hidden sm:block absolute top-0 right-[60px] w-[2px] h-full bg-white/10 z-20"></div>
      </div>

      {/* Final Section */}
      <Footer />
    </div>
  );
} 