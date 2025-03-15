import React from 'react';

const Main = () => {
  return (
        <main className="bg-white flex justify-center items-center min-h-screen">
          <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
            
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Welcome to <span className="text-red-600">MediCore</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mt-6 max-w-xl">
                MediCore is an innovative platform that connects doctors and patients, allowing users to receive diagnoses and medical advice. It also provides a forum where doctors can collaborate, share insights, and engage with each other in a professional community.
              </p>
              <button className="mt-8 bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:bg-red-800 transition duration-300">
                Get your diagnosis
              </button>
            </div>
    
            <div className="md:w-1/2">
              <img src="hero1.jpg" alt="Doctor using phone" className="rounded-lg shadow-lg w-full object-cover" />
            </div>
    
          </div>
        </main>
      );
    };

export default Main;
