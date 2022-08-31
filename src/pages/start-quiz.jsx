import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import Result from '../components/Result';

const StartQuizPage = () => {
  let userQuery = '';
  Object.values(useRouter().query).map((e) => (userQuery += e + ','));
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testEnded, setTestEnded] = useState(false);
  const [showModalCorrect, setShowModalCorrect] = useState(false);
  const [showModalWrong, setShowModalWrong] = useState(false);
  const [bgBlur, setBgBlur] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [rightAnswers, setRightAnswers] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://the-trivia-api.com/api/questions?categories=${userQuery}&limit=10`
      )
      .then((res) => res.data)
      .then((data) => {
        setQuestions(data);
      });
  }, [userQuery]);

  return questions.length > 0 && !testEnded ? (
    <>
      <Head>
        <title>Quzify : Question {questionIndex + 1}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>
        <>
          <section
            className={
              bgBlur
                ? 'min-h-screen bg-black  p-8 blur-sm '
                : 'min-h-screen  bg-black p-8 '
            }
          >
            <a className='group flex flex-col rounded-sm '>
              <div>
                <span className='text-5xl font-bold text-cyan-600'>
                  Q{questionIndex + 1}
                </span>
                <br />
                <span className='text-xl font-bold text-cyan-600'>
                  Score: {userScore}
                </span>
                <div className='mt-4 border-t-2 border-cyan-100 pt-2'>
                  <span className='text-sm font-medium uppercase tracking-widest text-cyan-300'>
                    <h3>{questions[questionIndex].question}</h3>
                  </span>
                </div>
              </div>
              <div className='mt-24 grid grid-flow-col grid-rows-4 gap-4 md:grid-rows-4 lg:grid-rows-2'>
                {[
                  ...questions[questionIndex].incorrectAnswers,
                  questions[questionIndex].correctAnswer,
                ]
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value)
                  .map((e, i) => {
                    return (
                      <button
                        onClick={() => {
                          if (e === questions[questionIndex].correctAnswer) {
                            setRightAnswers((oldArray) => [
                              ...oldArray,
                              questions[questionIndex],
                            ]);
                            setUserScore(userScore + 1);
                            setShowModalCorrect(true);
                            setBgBlur(true);
                            setTimeout(() => {
                              questionIndex <= 8
                                ? setquestionIndex(questionIndex + 1)
                                : setTestEnded(true);
                              setShowModalCorrect(false);
                              setBgBlur(false);
                            }, 1500);
                          } else {
                            setWrongAnswers((oldArray) => [
                              ...oldArray,
                              questions[questionIndex],
                            ]);

                            setBgBlur(true);
                            setShowModalWrong(true);
                            setTimeout(() => {
                              questionIndex <= 8
                                ? setquestionIndex(questionIndex + 1)
                                : setTestEnded(true);
                              setShowModalWrong(false);
                              setBgBlur(false);
                            }, 1500);
                          }
                        }}
                        key={i}
                        className='border border-cyan-200  text-cyan-200
                         active:bg-primary-100
                        disabled:bg-primary-100 lg:hover:bg-cyan-50 lg:hover:text-cyan-900'
                      >
                        <div>
                          <span className='block rounded-xl  p-4 shadow-sm  focus:outline-none focus:ring'>
                            <h6 className='text-${rightOptionColor}-500 mt-2 font-bold'>
                              {e}
                            </h6>
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </a>
          </section>
        </>
      </div>
      <>
        {showModalCorrect ? (
          <>
            <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
              <div className='relative my-6 mx-auto w-auto max-w-3xl'>
                <div className='relative flex w-full flex-col rounded-lg border-0  bg-cyan-50 shadow-lg outline-none drop-shadow-lg backdrop-blur-md focus:outline-none'>
                  <div className='relative flex-auto p-6'>
                    <p className='my-4 text-lg leading-relaxed text-slate-500'>
                      {
                        [
                          'Bravo',
                          'Superb',
                          'Excellent',
                          'Wohoo',
                          'Nice',
                          'Great',
                        ].sort(() => 0.5 - Math.random())[0]
                      }
                      !{' '}
                      {
                        [
                          'You got that right!',
                          'That was the right answer!',
                          'You seem intelligent!',
                          '+1 directly to your score board!',
                          'I sense right answer!',
                          'PLUS ONE!!!',
                        ].sort(() => 0.5 - Math.random())[0]
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
          </>
        ) : null}
      </>
      <>
        {showModalWrong ? (
          <>
            <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
              <div className='relative my-6 mx-auto w-auto max-w-3xl'>
                <div className='relative flex w-full flex-col rounded-lg border-0  bg-cyan-50 shadow-lg outline-none drop-shadow-lg backdrop-blur-md focus:outline-none'>
                  <div className='relative flex-auto p-6'>
                    <p className='my-4 text-lg leading-relaxed text-slate-500'>
                      {
                        ['Ooops', 'Sorry', 'Oh no', 'No', 'Hmmm'].sort(
                          () => 0.5 - Math.random()
                        )[0]
                      }
                      !{' '}
                      {
                        [
                          'You got that one wrong!',
                          'That was the wrong answer!',
                          'Not this one!',
                          'That was not correct!',
                        ].sort(() => 0.5 - Math.random())[0]
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
          </>
        ) : null}
      </>
    </>
  ) : !testEnded ? (
    <section className='flex h-screen bg-black'>
      <div className='m-auto text-6xl text-cyan-50'>
        <ImSpinner2 className='animate-spin' />
      </div>
    </section>
  ) : (
    <Result
      correctAnswers={rightAnswers}
      wrongAnswers={wrongAnswers}
      score={userScore}
    />
  );
};

export default StartQuizPage;
