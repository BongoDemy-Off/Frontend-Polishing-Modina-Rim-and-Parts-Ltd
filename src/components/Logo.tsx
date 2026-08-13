import React from 'react';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="white" />
      
      {/* Red Wheel Top Half */}
      <path d="M 30 60 A 30 30 0 0 1 90 60" stroke="#E52525" strokeWidth="3" fill="none" />
      {/* Red Spokes */}
      <line x1="60" y1="60" x2="60" y2="30" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="38" y2="38" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="82" y2="38" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="30" y2="60" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="90" y2="60" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="45" y2="85" stroke="#E52525" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="75" y2="85" stroke="#E52525" strokeWidth="1.5" />
      
      {/* Black Gear Bottom Half */}
      <path d="M 30 60 A 30 30 0 0 0 90 60" stroke="#000" strokeWidth="5" fill="none" />
      {/* Gear Teeth */}
      <path d="M 27 60 L 22 60 L 22 68 L 28 70 M 34 80 L 28 84 L 32 90 L 38 86 M 48 90 L 46 96 L 54 98 L 56 92 M 64 92 L 66 98 L 74 96 L 72 90 M 82 86 L 88 90 L 92 84 L 86 80 M 92 70 L 98 68 L 98 60 L 93 60" stroke="#000" strokeWidth="4" fill="none" strokeLinejoin="round" />
      
      {/* Black M */}
      <path d="M 42 75 L 42 50 L 60 68 L 78 50 L 78 75" stroke="#000" strokeWidth="7" fill="none" strokeLinejoin="round" />
      
      {/* Diagonal Line */}
      <line x1="32" y1="88" x2="88" y2="32" stroke="#000" strokeWidth="2.5" />
      
      {/* ESTD 2010 */}
      <path id="text-path" d="M 25 55 A 35 35 0 0 1 80 25" fill="none" />
      <text fontSize="7" fontWeight="900" fill="#000" letterSpacing="2" fontFamily="sans-serif">
        <textPath href="#text-path" startOffset="10%">ESTD 2010</textPath>
      </text>
    </svg>
  );
}
