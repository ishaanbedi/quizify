import Head from 'next/head';
import Link from 'next/link';

const Result = (props) => {
  return (
    <div>
      <Head>
        <title>Quzify : You scored {props.score} points</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <section className='flex min-h-screen  items-center bg-black'>
        <div className=' m-auto mt-24 p-8 sm:p-12'>
          <p className='text-center text-sm font-semibold uppercase tracking-widest text-cyan-500'>
            Game Over
          </p>

          <h5 className='mt-6 text-center text-3xl font-bold text-cyan-50'>
            Your final score is {props.score}{' '}
            {props.score > 1 ? 'points.' : 'point.'}
          </h5>

          <div className='flex'>
            <div className='mx-auto'>
              <Link href='/'>
                <button className='mt-12 inline-block w-32 rounded-full bg-cyan-600 py-4 text-sm font-bold text-white shadow-xl hover:bg-cyan-500 active:bg-cyan-700'>
                  Play Again
                </button>
              </Link>
            </div>
          </div>

          {Object.entries(props.correctAnswers).length > 0 ? (
            <div className='mt-12 w-full divide-y divide-gray-200 rounded-xl border border-gray-200 bg-cyan-50'>
              <h4 className='py-2 text-center'>
                Here are the questions you got right
              </h4>
              {Object.entries(props.correctAnswers).map((e, i) => {
                return (
                  <details key={i} className='group p-6'>
                    <summary className='flex cursor-pointer items-center justify-between'>
                      <h5 className='text-md font-bold text-gray-900'>
                        Q. {e[1].question}
                      </h5>

                      <span className='relative ml-1.5 h-5 w-5 flex-shrink-0'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </span>
                    </summary>

                    <p className='mt-4 leading-relaxed text-gray-700'>
                      You answered it correctly by giving{' '}
                      <span className='font-bold underline underline-offset-2'>
                        {e[1].correctAnswer}
                      </span>{' '}
                      as the answer.
                    </p>
                  </details>
                );
              })}
            </div>
          ) : (
            <div className='my-24 text-cyan-50'>
              {' '}
              You did not answer any question correctly!
            </div>
          )}

          <div className='mt-12 w-full divide-y divide-gray-200 rounded-xl border border-gray-200 bg-cyan-50'>
            <h4 className='py-2 text-center'>
              Here are the questions you got wrong
            </h4>
            {Object.entries(props.wrongAnswers).map((e, i) => {
              return (
                <details key={i} className='group p-6'>
                  <summary className='flex cursor-pointer items-center justify-between'>
                    <h5 className='text-md font-bold text-gray-900'>
                      Q. {e[1].question}
                    </h5>

                    <span className='relative ml-1.5 h-5 w-5 flex-shrink-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className='mt-4 leading-relaxed text-gray-700'>
                    The correct answer to this question was{' '}
                    <span className='font-bold underline underline-offset-2'>
                      {e[1].correctAnswer}
                    </span>
                    .
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Result;
