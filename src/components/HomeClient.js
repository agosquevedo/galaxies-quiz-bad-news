'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-sans-wall bg-cover bg-center flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-black bg-opacity-70 p-8 rounded-lg shadow-neon"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-sans text-bg-neon-green mb-8 text-shadow-neon"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Test de Galaxies
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          ¿Estás listo?
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/quiz" className="bg-neon-purple text-black font-sans py-3 px-6 rounded-full inline-block transform hover:rotate-2 transition-transform duration-300 shadow-neon">
            Comenzar Quiz
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}