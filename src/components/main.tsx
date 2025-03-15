import React from 'react';

const Main = () => {
  return (
    <>
      <main id="main" className="flex min-h-screen align-middle items-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-center pb-16">
            Welcome to MediCore
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mx-auto w-3/4 flex text-center pb-24">
            MediCore is an innovative platform that connects doctors and
            patients, allowing users to receive diagnoses and medical advice. It
            also provides a forum where doctors can collaborate, share insights,
            and engage with each other in a professional community.
          </p>
          <a
            href="https://themesberg.com/product/tailwind-css/landing-page"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none h-10"
          >
            Get your diagnosis
          </a>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="true"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="w-1/2">
          <img
            src="/hero1.jpg"
            className="w-full h-full object-cover object-bottom"
            alt="hero1"
          />
        </div>
      </main>

  
    </>
  );
};

export default Main;
