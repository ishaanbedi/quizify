import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle,
  XCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const Result = ({ score, correctAnswers, wrongAnswers }) => {
  const totalQuestions =
    Object.keys(correctAnswers).length + Object.keys(wrongAnswers).length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className='min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white'>
      <Head>
        <title>
          Quzify : You scored {score}/{totalQuestions}
        </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <main className='container relative mx-auto px-4 py-12'>
        <AnimatedBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='relative z-10 text-center'
        >
          <h1 className='mb-6 bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-5xl font-bold text-transparent'>
            Quiz Complete!
          </h1>
          <motion.div
            className='flex items-center justify-center space-x-4'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Award className='h-24 w-24 text-yellow-300' />
            <div>
              <h2 className='bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-8xl font-extrabold text-transparent'>
                {percentage}%
              </h2>
              <p className='mt-2 text-2xl text-indigo-200'>
                {score}/{totalQuestions} correct
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className='mt-12 flex justify-center'
        >
          <Link href='/'>
            <button className='transform rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-indigo-600 hover:shadow-xl'>
              Play Again
            </button>
          </Link>
        </motion.div>

        <motion.div
          className='mt-16 grid gap-8 md:grid-cols-2'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <AnswerSection
            title='Correct Answers'
            answers={correctAnswers}
            icon={<CheckCircle className='h-8 w-8 text-green-400' />}
            bgColor='bg-green-800'
          />
          <AnswerSection
            title='Incorrect Answers'
            answers={wrongAnswers}
            icon={<XCircle className='h-8 w-8 text-red-400' />}
            bgColor='bg-red-800'
          />
        </motion.div>
      </main>
    </div>
  );
};

const AnswerSection = ({ title, answers, icon, bgColor }) => {
  const [expandedKey, setExpandedKey] = useState(null);

  return (
    <motion.div
      className={`rounded-2xl ${bgColor} bg-opacity-20 p-6 shadow-xl backdrop-blur-md`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className='mb-6 flex items-center text-3xl font-bold'>
        {icon}
        <span className='ml-3'>{title}</span>
      </h3>
      <div className='space-y-4'>
        {Object.entries(answers).map(([key, { question, correctAnswer }]) => (
          <motion.div
            key={key}
            initial={false}
            animate={{
              backgroundColor:
                expandedKey === key
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden rounded-lg'
          >
            <motion.button
              className='flex w-full items-center justify-between p-4 text-left'
              onClick={() => setExpandedKey(expandedKey === key ? null : key)}
            >
              <span className='font-medium'>{question}</span>
              <motion.span
                animate={{ rotate: expandedKey === key ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown />
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expandedKey === key && (
                <motion.div
                  initial='collapsed'
                  animate='expanded'
                  exit='collapsed'
                  variants={{
                    expanded: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className='px-4 pb-4'>
                    <motion.p
                      className='text-indigo-200'
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {title === 'Correct Answers' ? (
                        <>You answered correctly: </>
                      ) : (
                        <>The correct answer was: </>
                      )}
                      <span className='font-bold text-white'>
                        {correctAnswer}
                      </span>
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const AnimatedBackground = () => (
  <div className='absolute inset-0 z-0 overflow-hidden'>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className='absolute'
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          x: [0, Math.random() * 100 - 50],
          scale: [0, 1, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Sparkles
          className='text-indigo-300 opacity-30'
          size={Math.random() * 20 + 10}
        />
      </motion.div>
    ))}
  </div>
);

export default Result;
