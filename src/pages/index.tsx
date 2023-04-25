import React, { useEffect, useState, useRef } from "react"
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { SketchPad } from "@/components/SketchPad";
import { ThanksScreen } from "@/components/Thanks";

export default function Home() {
  const [showSketchPad, setShowSketchPad] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDone, setIsDone] = useState(false)
  const [data, setData]=useState({
    artist:'',
    session:new Date().getTime(),
    drawings:{}
  });

  const handleSubmit = () => {  
    if(!inputRef.current?.value) {
      alert('please enter your name')
      return
    }
    setData({ ...data, artist: inputRef.current.value });
    setShowSketchPad(true);
  }

  const handleIsDone = async() => {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
      })
      if(res.status === 200) setIsDone(true)
    } catch (error) {
      console.error(error)
    }
  }

  const setNewDrawing = (label:string, drawing:[number, number][][]) => {
    setData({ ...data, drawings: {...data.drawings, [label]:drawing} });
  }


  return (
    <>
      {( !isDone && !showSketchPad) && <WelcomeScreen inputRef={inputRef} handleSubmit={handleSubmit} />}
      {( !isDone && showSketchPad) && <SketchPad handleIsDone={handleIsDone} setNewDrawing={setNewDrawing} />}
      {isDone && <ThanksScreen />}
    </>
  )
}
