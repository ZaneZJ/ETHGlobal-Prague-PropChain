import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm shadow-sm bg-white/60">
        <div className="flex items-center gap-3 w-full z-20 mx-[150px]">
          <div className="relative group flex items-center gap-3">
            <Link href="/" className="relative overflow-hidden group">
              <Image
                src="/images/black-logo.png"
                alt="PropChain Logo"
                width={40}
                height={40}
                className="object-contain w-10 h-10 transition-all duration-400 relative z-10"
                style={{ width: 'auto', height: '40px' }}
              />
            </Link>
            <Link
              href="/"
              className="text-gray-900 text-base md:text-lg tracking-[0.2em] font-medium relative overflow-hidden group-hover:text-yellow-600 transition-all duration-400 uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              PROPCHAIN
              <span className="brand-underline absolute bottom-0 left-0 w-1/2 h-[1px] group-hover:w-full transform transition-all duration-500"></span>
            </Link>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700 uppercase" style={{ marginRight: '150px' }}>
          <Link href="/" className="transition-colors duration-200 hover:text-yellow-600">Home</Link>
          <Link href="/explore" className="transition-colors duration-200 hover:text-yellow-600">Explore</Link>
          <Link href="/contacts" className="transition-colors duration-200 hover:text-yellow-600">Contacts</Link>
          <Link href="#" className="transition-colors duration-200 hover:text-yellow-600">Access</Link>
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
          <Link href="/" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600 text-sm md:text-base tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            HOME
          </Link>
          <Link href="/explore" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600 text-sm md:text-base tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            EXPLORE
          </Link>
          <Link href="/contacts" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600 text-sm md:text-base tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            CONTACTS
          </Link>
          <Link href="#" className="text-white mb-4 transition-all duration-400 hover:text-yellow-600 text-sm md:text-base tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ACCESS
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header; 