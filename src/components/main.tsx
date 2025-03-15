import React from 'react';

const Main = () => {
  return (
    <main className="bg-white flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20 md:pt-0"> {/* Added responsive padding */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-red-600">MediCore</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4 max-w-xl mx-auto md:mx-0">
            MediCore is an innovative platform that connects doctors and patients, allowing users to receive diagnoses and medical advice. It also provides a forum where doctors can collaborate, share insights, and engage with each other in a professional community.
          </p>
          <button className="mt-6 bg-red-700 text-white text-base sm:text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:bg-red-800 transition duration-300 transform hover:scale-105">
            Get your diagnosis
          </button>
        </div>
        
        <div className="md:w-1/2 w-full max-w-2xl">
          <img 
            src="hero1.jpg" 
            alt="Doctor using phone" 
            className="rounded-lg shadow-xl w-full h-auto object-cover transform transition duration-500 hover:shadow-2xl" 
          />
        </div>
      </div>
    </main>
  );
};

export default Main;