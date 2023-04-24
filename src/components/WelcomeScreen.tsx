import React from 'react'

type PROPS = {
    inputRef: React.RefObject<HTMLInputElement>;
    handleSubmit: () => void;
}

export const WelcomeScreen = ({ inputRef, handleSubmit }:PROPS) => {
  return (
    <div className="w-full p-4 min-h-screen bg-gradient-to-r from-[#374151] via-[#111827] to-black flex justify-center">
    <div className="pt-10 w-full max-w-[500px] ">
        <h1 className="text-[#eee] font-bold text-center text-5xl mb-4">Draw Recognition </h1>
        <div className="text-white text-center mb-10">
        This project involves using machine learning and JavaScript to create an algorithm that can recognize drawings. The project may involve training a learning model using labeled data and implementing the trained model using JavaScript in a web application. The end result would be a web-based tool that can recognize the drawing and provide relevant information or actions based on the recognized input.              
        </div>
        <ul className="text-white mb-5">
          <li><span>1. </span> Introduce your name in the below input and click start</li>
          <li><span>2. </span> You will see a white sketched when you have to draw what is asked of you</li>
        </ul>
        <div className="text-white mb-10">
          There are 8-10 drawings to be done. Good luck and have fun!
        </div>
        <div className="mb-5">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">FullName</label>
          <input ref={inputRef} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        </div>
    </div>
  </div>
  )
}
