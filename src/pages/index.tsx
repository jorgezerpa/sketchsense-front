import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  return (  
    <div className="pb-32 w-full p-4 min-h-screen bg-gradient-to-r from-[#374151] via-[#111827] to-black ">
      <div className="flex w-full flex-col-reverse md:flex-row ">
        <div className="w-full pt-20 px-2 md:px-20 flex flex-col justify-center md:min-h-[100vh]">
          <h5 className="text-[#ccc] font-bold text-base">Drawer Recognizer</h5>
          <h1 className="text-[#eee] font-bold text-4xl md:text-6xl mb-7">SketchSense</h1>
          <div className="text-gray-300 text-justify mb-10 text-base">
          This project involves using machine learning and JavaScript to create an application that can recognize drawings using labeled data, KNN algorithm and JavaScript.
          </div>
          <div className="w-full flex flex-wrap gap-2 sm:gap-4 text-white">
            <div onClick={()=>router.push('/createEntry')} className="shrink-0 bg-[#7817ad] hover:bg-[#500d74] text-white text-sm sm:text-base font-bold py-2 px-4 rounded">Create Entry</div>
            <div onClick={()=>router.push('/dataViewer')} className="shrink-0 bg-blue-500 hover:bg-blue-700 text-white text-sm sm:text-base font-bold py-2 px-4 rounded">Try the app</div>
          </div>
        </div>
        <div className="w-full flex items-center pt-20 md:pt-0">
            <Image src="/dra.jpg" alt="" width={500} height={500} />
       </div>
      </div>
    </div>
  )
}



{/* <div className="w-full p-4 min-h-screen bg-gradient-to-r from-[#374151] via-[#111827] to-black flex justify-center">
      <div className="pt-20 w-full max-w-[600px] ">
          <h1 className="text-[#eee] font-bold text-center text-4xl sm:text-7xl md:text-8xl mb-16">SketchSense </h1>
          <div className="text-gray-300 text-justify mb-10 ">
          This project involves using machine learning and JavaScript to create an algorithm that can recognize drawings. 
          <br /><br /> 
          The project may involve training a learning model using labeled data and implementing the trained model using JavaScript in a web application. The end result would be a web-based tool that can recognize the drawing and provide relevant information or actions based on the recognized input.              
          </div>
      </div>
    </div> */}