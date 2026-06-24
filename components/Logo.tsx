import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export default function Logo({ variant = 'dark', className = '', showText = true }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="brightmind-logo">
      <div className="relative w-12 h-12 transition-all duration-300 transform hover:scale-105 shrink-0 flex items-center justify-center">
        <Image
          src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png"
          alt="BrightMind Logo"
          width={48}
          height={48}
          className="object-contain"
          style={{
            filter: isLight ? 'brightness(0) invert(1)' : 'none',
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left select-none">
          <span
            className={`font-sans font-bold leading-none tracking-wider text-xs md:text-sm ${
              isLight ? 'text-[#FAF7F2]' : 'text-[#0E1C35]'
            }`}
          >
            BRIGHTMIND
          </span>
          <span
            className="font-mono text-[8px] md:text-[9px] font-semibold leading-none mt-1 uppercase tracking-widest text-[#E05C1A]"
          >
            Institute of Education
          </span>
        </div>
      )}
    </div>
  );
}
