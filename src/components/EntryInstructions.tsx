import React from 'react'

type PROPS = {
    inputRef: React.RefObject<HTMLInputElement>;
    handleSubmit: () => void;
}

export const EntryInstructions = ({ inputRef, handleSubmit }:PROPS) => {
  return (
    <div className="w-full p-4 min-h-screen pb-32 bg-gradient-to-r from-[#374151] via-[#111827] to-black flex justify-center">
    <div className="pt-32 w-full max-w-[600px] ">
        <h1 className="text-[#eee] font-bold text-center text-4xl mb-6">You´re a Tech Titan!</h1>
        <div className="text-gray-300 text-justify mb-10 ">
          Thanks so much for want to contribute. Now, In the main fact, we need data... more specifically, we need draws! So, here as the steps to follow:
        </div>
        <ul className="text-[#ccc] mb-5 max-w-[570px] px-2 mx-auto">
          <li ><span className='font-bold text-lg text-white'>1. </span> Introduce your name in the below input and click start</li>
          <li ><span className='font-bold text-lg text-white'>2. </span> You will see a white board when you have to draw what is asked of you</li>
        </ul>
          <br />
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
