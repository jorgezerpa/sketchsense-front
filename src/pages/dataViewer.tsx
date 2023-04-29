import React, { useEffect, useState, useRef } from "react"
import { VictoryScatter, VictoryChart, VictoryTheme } from 'victory';
import { RealTimeSketchPad } from "@/components/RealTimeSketchPad";
import { NearestNeighbor } from '@/utils/nearestNeighbor';


type DrawPointProps = {
  x?: number;
  y?: number;
  datum?: any;
  handleChooseDraw?: (id:number) => void;
};

const drawIcons:any = {
  'clock': '⏰',
  'pencil': '✏️',
  'car': '🚗',
  'house': '🏠',
  'tree': '🌳',
  'bicycle': '🚲',
  'guitar': '🎸',
  'fish': '🐟',
  'currentFeature':'🔴'
}

const DrawPoint = ({x, y, datum, handleChooseDraw }:DrawPointProps) => {
  const icon = drawIcons[datum.label];
  return (
    <text 
      x={x} 
      y={y} 
      fontSize={20} 
      onClick={()=>{
        handleChooseDraw && handleChooseDraw(datum.id)
        const element = document.getElementById(`drawCard${datum.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}>
      {icon}
    </text>
  );
};


type StatusType = 'in-progress' | 'done' | 'error' | null

export default function DataViewer() {
  const [status, setStatus] = useState<StatusType>(null)
  const [draws, setDraws] = useState<any>([])
  const [features, setFeatures] = useState<any>([])
  const [currentDrawFeatures, setCurrentDrawFeatures] = useState<null|number[]>(null)
  const [selectedDraw, setSelectedDraw] = useState<null|number>(null)
  const [coincidenceLabel, setCoincidenceLabel] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('in-progress')
        const drawsRes = await fetch('/api/get-draws')
        const featuresRes = await fetch('/api/get-features')
        if(drawsRes.status !== 200 || featuresRes.status !==200 ) throw new Error('error getting data')
        const drawsJson = await drawsRes.json()
        const featuresJson = await featuresRes.json()
        setDraws(drawsJson)
        setFeatures(featuresJson)
        setStatus('done')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }
    fetchData()
  }, [])

  useEffect(()=>{
    if(!currentDrawFeatures) return
    addCurrentDrawFeatures()
  }, [currentDrawFeatures])

 
  const handleChooseDraw = (id:number) => {
    setSelectedDraw(id)
  }

  const handleSetfeatures = (features: any) => {
    setCurrentDrawFeatures(features)
  }
  
  const addCurrentDrawFeatures = () => {
    if(!currentDrawFeatures) return
    const newFeatures = { ...features, samples: [...features.samples.slice(0,features.samples.length-1), { id:'currentFeature', label:'currentFeature', point:currentDrawFeatures }] }
    setFeatures(newFeatures)
    
    let minDistance = Number.MAX_SAFE_INTEGER
    let minDistanceSample
    features.samples.forEach((sample:any)=>{
      if(sample.id==='currentFeature') return
      const distance = NearestNeighbor.getDistance(currentDrawFeatures as [number, number], sample.point)
      if(distance < minDistance) {
        minDistance = distance
        minDistanceSample = sample
        setCoincidenceLabel(sample.label)
      }
    })
  }

  return (
    <div className="w-full p-4 min-h-screen bg-gradient-to-r from-[#374151] via-[#111827] to-black text-white" >
      <div className="w-full text-center text-4xl sm:text-6xl font-bold pt-10 pb-20">Data Viewer</div>
      { status==='in-progress' && <div>creating...</div> }
      { status==='error' && <div>ups! an error happens, try again :)</div> }

      <div className="flex">
        { status==='done' && (
          <div className="w-[500px] relative">
            <VictoryChart
              theme={VictoryTheme.material}
              domain={{ x: [0, 400], y: [0, 16000] }}
            >
              <VictoryScatter
                style={{ data: { fill: "#00ff00", width:1, height:1 }, labels: { fill: "#00000000" } }}
                size={5}
                dataComponent={<DrawPoint handleChooseDraw={handleChooseDraw}  />}
                data={[
                  ...features.samples.map((sample:any)=>({ x: sample.point[0], y:sample.point[1], label:sample.label, id:sample.id })) // 0->n of paths, 1->n of points
                ]}
              />
            </VictoryChart>
          </div>
        )}
        { status==='done' && (
          <div className="w-[400px] h-[400px] relative">
            <RealTimeSketchPad handleSetfeatures={handleSetfeatures} coincidenceLabel={coincidenceLabel} />
          </div>
        )}
      </div>

      { status==='done' && (
        <div className="overflow-x-scroll">
          { Object.keys(draws).map((key, index)=>(  // key ==> artist_id
            <div  key={key+index} className="flex items-center py-3 gap-3">
              <div className="w-[100px] shrink-0">{draws[key][0].artist_name}</div>
              { draws[key].map((draw:any, i:number)=>(
                <div id={`drawCard${draw.id}`} key={draw.label+key+index} className={`shrink-0 w-[100px] flex items-center bg-white rounded-lg overflow-hidden ${selectedDraw==draw.id && 'border-8 border-yellow-400'}`}>
                  <img className="w-[100%] border border-white" src={`http://localhost:3001/images/${draw.id}.png`} alt="" />
                </div>
              )) }
            </div>
          )) }
        </div>
      )}
    </div>
  )
}
