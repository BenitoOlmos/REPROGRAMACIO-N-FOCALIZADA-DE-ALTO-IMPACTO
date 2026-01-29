
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "w-48", variant = 'full' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isotipo Circular Zen */}
        <path 
          d="M200 60C122.68 60 60 122.68 60 200C60 277.32 122.68 340 200 340C238.66 340 273.66 324.33 298.99 298.99" 
          stroke="#0097B2" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeDasharray="10 5"
        />
        <path 
          d="M210 50C280 55 335 110 345 180" 
          stroke="#0097B2" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        <circle cx="200" cy="200" r="120" stroke="#0097B2" strokeWidth="1" strokeOpacity="0.2" />
        
        {variant === 'full' && (
          <g>
            <text x="200" y="215" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="300" fontSize="18" fill="#64748B" letterSpacing="0.2em">CENTRO CLÍNICO</text>
            <text x="200" y="255" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="38" fill="#0097B2" letterSpacing="0.1em">EQUILIBRAR</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Logo;
