'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Instagram, Copy, ChevronRight, RefreshCw } from 'lucide-react';
import { shuffle } from '@/utils';
import { members } from '@/data/members';
import { questions, memberAnswers } from '@/data/questions';

const QuizApp = () => {
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

    const personalizedMessages = {
      'Juanchi': '¡Felicidades! Eres tan versátil como Juanchi. ¿Listo para improvisar en el escenario?',
      'Giu': '¡Eres un visual como Giu! Prepárate para deslumbrar con tu encanto natural.',
      'Emi': '¡Tienes el espíritu de Emi! Lista para conquistar el escenario con tus pasos de baile.',
      'Stefi': '¡Eres tan ocurrente como Stefi! ¿Ya tienes lista tu camiseta de Boca para The Boyz?',
      'Val': '¡Multitalentosa como Val! Main rapper, main vocal, ¿hay algo que no puedas hacer?',
      'Agos': '¡Tienes la energía de Agos! Lista para brillar en todos los aspectos del K-pop.'
    };

    setResult({
      ...resultMember,
      message: personalizedMessages[resultMember.name]
    });
  };

  const shareResult = () => {
    if (result) {
      const text = `¡Mi photocard de Bad News es ${result.name}! Descubre la tuya en https://galaxies-quiz-bad-news.vercel.app/`;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-3 font-poppins text-gray-800"
    >
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Bad News Photocard Quiz</h2>
              <p className="mb-6">¿Descubre qué miembro de Bad News eres?</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
                onClick={startQuiz}
              >
                Comenzar Quiz <ChevronRight className="ml-2" />
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
                <Camera className="h-10 w-10 text-teal-500 mr-2" />
                <h2 className="text-3xl font-bold text-gray-800">Pregunta {currentQuestion + 1}</h2>
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
                  className="rounded-lg shadow-md"
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
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
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
                className="text-2xl font-bold mb-4"
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
                    className="rounded-lg shadow-md"
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
                    width={200} 
                    height={300} 
                    className="rounded-lg shadow-md"
                  />
                </motion.div>
              </div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl font-semibold mb-2"
              >
                {result.name}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4"
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
                  className="bg-gray-100 border border-gray-300 rounded-l-lg py-2 px-4"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyInstagram}
                  className="bg-pink-500 text-white rounded-r-lg p-2 hover:bg-blue-600"
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
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white opacity-100 font-bold py-2 px-4 rounded-full inline-flex items-center hover:opacity-90 transition duration-300"
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
                className="mt-4 bg-teal-500 text-white font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-teal-600 transition duration-300"
              >
                <RefreshCw className="mr-2" />
                Hacer el test de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizApp;