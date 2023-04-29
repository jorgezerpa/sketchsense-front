import React, { useEffect, useRef, useState } from 'react'
import { features  } from '@/utils/features';

const labels=["car", "fish", "house", "tree","bicycle", "guitar", "pencil", "watch"];

type Props = {
  handleSetfeatures: (features: any) => void;
  coincidenceLabel: string;
}

export const RealTimeSketchPad = ({handleSetfeatures,coincidenceLabel}:Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [paths, setPaths] = useState<any[]>([]); // array of paths -> each path is a tuple of x,y coordinates
    const [isDrawing, setIsDrawing] = useState(false);
    // const [currentDraw, setCurrentDraw] = useState(0);

    useEffect(() => {
      if(!canvasRef.current) return
      const context = canvasRef.current.getContext('2d');
      if(!context) return
      contextRef.current = context;
    },[])

    //desktop handlers
    const handleMouseDown = (e: any) => {
      const mouse = getMousePos(canvasRef.current!, e);
      setPaths([...paths, [mouse]]); // add beginning of path
      setIsDrawing(true);
    }

    const handleMouseMove = (e: any) => { 
      if(isDrawing){
        const mouse = getMousePos(canvasRef.current!, e);
        const lastPath = paths[paths.length - 1];
        setPaths([...paths.slice(0, paths.length - 1), [...lastPath, mouse]]); // add to last path
        redraw()
      }
    }

    const handleMouseUp = () => {
      const pathsFeature = features.getPathCount(paths)
      const pointsFeature = features.getPointCount(paths)
      handleSetfeatures([pathsFeature, pointsFeature])
      setIsDrawing(false);
    }
    // mobile handlers
    const handleTouchStart=(e:any)=>{
      const loc=e.touches[0];
      handleMouseDown(loc);
   }

   const handleTouchMove = (e:any)=>{
      const loc=e.touches[0];
      handleMouseMove(loc);
   }

   const handleTouchEnd=()=>{
      handleMouseUp();
   }

    //utils
    const drawPath = (path:any[]) => {
      if(!contextRef.current) return
      contextRef.current.strokeStyle='0x000000';
      contextRef.current.lineWidth=3;
      contextRef.current.beginPath();
      contextRef.current.moveTo(path[0][0], path[0][1]);
      for(let i=1;i<path.length;i++){
         contextRef.current.lineTo(path[i][0],path[i][1]);
      }
      contextRef.current.lineCap="round";
      contextRef.current.lineJoin="round";
      contextRef.current.stroke();
    }

    const drawPaths = () => {
      for(let i=0;i<paths.length;i++){
        drawPath(paths[i]);
      }
    }

    const redraw = () => {
      if(!canvasRef.current) return
      contextRef.current!.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawPaths();
      if(paths.length>0){} //enable undo button
      if(paths.length<=0){} //disable undo button
    }

    const getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return [
        Math.round(e.clientX - rect.left),
        Math.round(e.clientY - rect.top),
      ]
    }

    const reset = () => {
      if(!canvasRef.current) return
      setPaths([])
      setIsDrawing(false)
      contextRef.current!.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }


    //buttons    
    const handleUndo = () => {
      if(paths.length<=0 || !canvasRef.current) return
      const newPaths = paths.slice(0, paths.length - 1)
      setPaths(paths.slice(0, paths.length - 1))
      contextRef.current!.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      for(let i=0;i<newPaths.length;i++){
        drawPath(newPaths[i]);
      }
    }


  return (
    <div className="w-full h-full p-4 border bg-gradient-to-r from-[#374151] via-[#111827] to-black flex justify-center">
      <div className="pt-2 w-full max-w-[500px] ">
          <div id="sketchPadContainer">
              <div className='text-center font-bold mb-2'>You are drawing a: { coincidenceLabel }</div>
              <canvas
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={canvasRef} className='bg-[#eee] shadow-lg shadow-black mx-auto' width="250" height="250" ></canvas>
          </div>
          <div className="flex justify-center mt-5 gap-2">
            <button onClick={handleUndo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Undo</button>
          </div>
      </div>
    </div>
  )
}
