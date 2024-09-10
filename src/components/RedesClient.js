'use client';

import { MotionH1, MotionDiv } from './MotionWrapper';
import { Instagram } from 'lucide-react';

export default function RedesClient() {
  return (
    <div className="min-h-screen bg-sans-wall bg-cover bg-center flex flex-col items-center justify-center text-white p-4">
      <MotionH1 
        className="text-5xl md:text-6xl font-sans text-neon-green mb-8 text-shadow-neon text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Nuestras Redes
      </MotionH1>
      <MotionDiv
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <a 
          href="https://www.instagram.com/thenewgalaxies" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center bg-neon-purple text-black font-bold py-3 px-6 rounded-full inline-block transform hover:scale-105 transition-transform duration-300 shadow-neon mb-4"
        >
          <Instagram className="mr-2" />
          Síguenos en Instagram
        </a>
      </MotionDiv>
    </div>
  );
}