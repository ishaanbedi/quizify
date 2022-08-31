import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

export default function GetStartedPage(props) {
  const [chosenCategory, setChosenCategory] = useState([]);
  return (
    <>
      <Head>
        <title>New Quiz : Quizify</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main>
        <section className='min-h-screen bg-black text-center text-cyan-50'>
          <div className='layout pt-16'>
            <h1>Choose your favorite topics:</h1>
          </div>
          <div>
            <h6 className='my-4'>Select as many topics you like.</h6>
            <div className='mx-4 grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-2 '>
              {Object.entries(props).map((e, i) => {
                return (
                  <div key={i}>
                    <div className='relative'>
                      <input
                        className='group peer hidden'
                        type='checkbox'
                        value={e[1][0]}
                        onClick={(element) => {
                          if (!chosenCategory.includes(element.target.value)) {
                            setChosenCategory([
                              ...chosenCategory,
                              element.target.value,
                            ]);
                          } else {
                            setChosenCategory(
                              chosenCategory.filter(
                                (e) => e !== element.target.value
                              )
                            );
                          }
                        }}
                        id={i.toString()}
                      />

                      <label
                        className='block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-cyan-50 hover:text-cyan-900 peer-checked:border-cyan-900 peer-checked:bg-cyan-100 peer-checked:text-cyan-900 peer-checked:ring-1 peer-checked:ring-cyan-900'
                        htmlFor={i.toString()}
                      >
                        <span> {e[0]} </span>
                      </label>

                      <svg
                        className='absolute top-4 right-4 h-5 w-5 text-cyan-600 opacity-0 peer-checked:opacity-100'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='py-12'>
              <div
                className={
                  chosenCategory.length === 0 ? 'invisible' : 'visible'
                }
              >
                <Link
                  href={{
                    pathname: '/start-quiz',
                    query: chosenCategory,
                  }}
                >
                  <button className='inline-block rounded-full border border-cyan-600 bg-cyan-600 p-3 text-white hover:bg-transparent hover:text-cyan-600 focus:outline-none focus:ring active:text-cyan-500'>
                    <svg
                      className='h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const response = await axios.get(`https://the-trivia-api.com/api/categories`);
  return {
    props: response.data,
  };
}
