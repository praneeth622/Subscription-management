// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">My App</h1>
              </div>
              <div className="ml-auto">
                <button
                  onClick={handleSignIn}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      

      <main>
        <section className="text-center py-12" id="header-2">
          <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(./assets/images/15.jpg)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center h-full">
                  <div className="w-full lg:w-2/5 text-right">
                    <img src='https://picsum.photos/200' alt="Image" className="mx-auto lg:ml-auto w-64" />
                  </div>
                  <div className="w-full lg:w-3/5 mt-8 lg:mt-0 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                      Intuitive codes make it
                      <br /> easy to get around
                    </h1>
                    <p className="text-xl font-light text-gray-300 mt-4">
                      Or replace your coding headache with all
                      <br /> new powerful page builder
                    </p>
                    <a
                      className="inline-block mt-6 py-3 px-6 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="fab fa-apple mr-3"></span>Get Slick Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-12" id="header-3">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/4">
                <img className="mx-auto w-3/4 max-w-full h-auto" src="https://picsum.photos/200" alt="Birthday Cake" />
                <h1 className="text-4xl md:text-5xl font-light text-black mt-6">Inviting, engaging experience.</h1>
                <p className="text-xl text-gray-600 mt-5 md:px-6">
                  Slick's layouts range from detailed hero section down to the in-page call to action, with a consistent scheme of
                  softness, cleanliness, and modernity used throughout. This is accomplished through shape, color, and imagery to achieve
                  an inviting, engaging experience.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <a
                    className="inline-block py-2 px-6 bg-white text-gray-900 border border-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Purchase Now for $99
                  </a>
                  <a
                    className="inline-block py-2 px-6 bg-transparent text-blue-700 font-medium rounded-lg hover:text-blue-900 transition duration-300"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more &#x27F6;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Home;
