'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Instagram, Copy, ChevronRight, RefreshCw } from 'lucide-react';
import { shuffle } from '@/utils';
import { members } from '@/data/members';
import { questions, memberAnswers } from '@/data/questions';

const QuizClient = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [copied, setCopied] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    setShuffledOptions(shuffle(questions[currentQuestion].options));
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    const answerIndex = questions[currentQuestion].options.indexOf(answer);
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    let maxScore = -1;
    let resultMember = null;

    memberAnswers.forEach((member) => {
      const score = answers.reduce((acc, answer, index) => {
        return acc + (answer === member.answers[index] ? 1 : 0);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        resultMember = members.find(m => m.name === member.name);
      }
    });

    setResult(resultMember);
  };

  const shareResult = () => {
    if (result) {
      const text = `¡Mi photocard de Bad News es ${result.name}! Descubre la tuya en [URL de tu sitio]`;
      navigator.clipboard.writeText(text).then(() => {
        window.open('https://www.instagram.com', '_blank');
        alert('El texto ha sido copiado al portapapeles. Abrimos Instagram en una nueva pestaña. Por favor, pega el texto en una nueva historia o post.');
      }).catch(err => {
        console.error('Error al copiar el texto: ', err);
        alert('No se pudo copiar el texto automáticamente. Por favor, copia el siguiente texto y compártelo en Instagram:\n\n' + text);
      });
    }
  };

  const copyInstagram = () => {
    navigator.clipboard.writeText('@thenewgalaxies');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResult(null);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResult(null);
    setQuizStarted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-3 font-sans text-white"
    >
      <div className="text-center bg-black bg-opacity-70 p-8 rounded-lg shadow-neon"      >
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-sans text-bg-neon-green mb-8 text-shadow-neon">Photocard de Bad News Test</h2>
              <p className="mb-6 text-xl">¿Qué miembro te tocará en la Bad News era?</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px #39ff14' }}
                whileTap={{ scale: 0.95 }}
                className="bg-neon-green text-black font-sans py-2 px-4 rounded-full inline-flex items-center"
                onClick={startQuiz}
              >
                <ChevronRight className="mr-2" />
                Comenzar Quiz
              </motion.button>
            </motion.div>
          ) : !result ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-6">
                <Camera className="h-10 w-10 text-neon-green mr-2" />
                <h2 className="text-3xl font-sans text-neon-green">Pregunta {currentQuestion + 1}</h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Image 
                  src={`/img/question_${currentQuestion + 1}.jpg`} 
                  alt={`Question ${currentQuestion + 1}`} 
                  width={400} 
                  height={300} 
                  className="rounded-lg shadow-neon"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 text-xl"
              >
                {questions[currentQuestion].question}
              </motion.p>
              <div className="space-y-3">
                {shuffledOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 8px #39ff14' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 px-4 bg-neon-purple text-black rounded-lg hover:bg-neon-green transition duration-300"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h3
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-sans text-neon-green mb-4"
              >
                ¡Tu resultado!
              </motion.h3>
              <div className="flex justify-center space-x-4 mb-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Image 
                    src={`/img/${result.name.toLowerCase()}_1.jpg`} 
                    alt={result.name} 
                    width={200} 
                    height={300} 
                    className="rounded-lg shadow-neon"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Image 
                    src={`/img/${result.name.toLowerCase()}_2.jpg`} 
                    alt={result.name} 
                    width={188} 
                    height={300} 
                    className="rounded-lg shadow-neon"
                  />
                </motion.div>
              </div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-sans text-neon-green mb-2"
              >
                {result.name}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4 text-xl"
              >
                {result.description}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4 text-xl"
              >
                {result.message}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mb-4 text-sm"
              >
                Saca captura y súbelo a tus redes etiquetándonos
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex justify-center items-center mb-4"
              >
                <input 
                  type="text" 
                  value="@thenewgalaxies" 
                  readOnly 
                  className="bg-gray-800 border border-neon-green rounded-l-lg py-2 px-4 text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyInstagram}
                  className="bg-neon-green text-black rounded-r-lg p-2 hover:neon-green"
                >
                  {copied ? 'Copiado!' : <Copy size={20} />}
                </motion.button>
              </motion.div>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareResult}
                className="bg-gradient-to-r from-neon-blue to-neon-green text-black font-sans py-2 px-4 rounded-full inline-flex items-center hover:from-neon-green hover:to-neon-blue transition duration-300 mb-4"
              >
                <Instagram className="mr-2" />
                Copiar y abrir Instagram
              </motion.button>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className="bg-neon-white text-black font-sans py-2 px-4 rounded-full inline-flex items-center hover:bg-custom-neon-light transition duration-300"
              >
                <RefreshCw className="mr-2" />
                Hacer el test de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </div>
  );
};

export default QuizClient;