import React from "react";

const Footer = () => (
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
);

export default Footer; 