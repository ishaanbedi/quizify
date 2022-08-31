import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Quzify : Unlimited online quizzes</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main>
        <section className='relative  bg-cyan-50'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='absolute inset-0 h-screen w-screen object-cover object-[75%] opacity-90 blur-sm sm:object-[25%] '
            src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80'
            alt='BG Image'
          />

          <div className='absolute inset-0 block h-screen bg-gradient-to-r from-black to-transparent'></div>

          <div className='relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
            <div className='max-w-xl text-center sm:text-left'>
              <h1 className='mt-24 text-6xl font-extrabold md:mt-4 lg:mt-2'>
                <strong className=' font-extrabold text-cyan-100 sm:block'>
                  Quizify
                </strong>
              </h1>

              <p className='mt-4 max-w-lg text-cyan-50 sm:text-xl sm:leading-relaxed'>
                Unlimited online quizzes! <br /> A project by{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.ishaanbedi.in'
                  className='underline underline-offset-4'
                >
                  Ishaan Bedi
                </a>
              </p>

              <div className='mt-12 flex flex-wrap gap-4 text-center'>
                <Link href='/get-started'>
                  <button className='block w-full rounded bg-cyan-600 px-12 py-3 text-sm  font-medium text-cyan-50 hover:bg-cyan-500 focus:outline-none  focus:ring active:bg-cyan-700  sm:w-auto'>
                    Get Started
                  </button>
                </Link>
                <span className='invisible md:visible lg:visible'>
                  <Link href='https://www.github.com/ishaanbedi/quizify'>
                    <a
                      target='_blank'
                      className='group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-cyan-100 hover:text-cyan-50 focus:outline-none active:text-cyan-200'
                    >
                      <span className='absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                          />
                        </svg>
                      </span>

                      <span className='text-sm font-medium transition-all group-hover:mr-4'>
                        Source code
                      </span>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
