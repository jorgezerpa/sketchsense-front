import React, { useEffect, useState, useRef } from "react"

type StatusType = 'in-progress' | 'done' | 'error' | null

export default function DataViewer() {
  const [status, setStatus] = useState<StatusType>(null)
  const [draws, setDraws] = useState<any>([])
  const [features, setFeatures] = useState<any>([])

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

  console.log('features', features)
  
  return (
    <div className="w-full p-4 min-h-screen bg-gradient-to-r from-[#374151] via-[#111827] to-black text-white" >
      <div className="w-full text-center text-4xl sm:text-6xl font-bold pt-10 pb-20">Data Viewer</div>
      { status==='in-progress' && <div>creating...</div> }
      { status==='error' && <div>ups! an error happens, try again :)</div> }
      { status==='done' && (
        <div className="overflow-x-scroll">
          { Object.keys(draws).map((key, index)=>(  // key ==> artist_id
            <div key={key+index} className="flex items-center py-3 gap-3">
              <div className="w-[100px] shrink-0">{draws[key][0].artist_name}</div>
              { draws[key].map((draw:any, i:number)=>(
                <div key={draw.label+key+index} className="shrink-0 w-[100px] flex items-center bg-white rounded-lg overflow-hidden">
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
