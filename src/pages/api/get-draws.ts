// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const _URL = 'https://sketchsense-api.zerpacode.com/dataset-json' 

// type Data = {
//   status: string
// }

export default async function  handler( req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await fetch(_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const draws = await response.json()
    
    const groups:any = {} // {artist_id: [draws]}
    let groupArray:any = []

    draws.forEach((draw:any, i:number) => {
      if(groupArray.length===0){
        groupArray.push(draw)
        return
      }
      if(draw.artist_id===groupArray[0].artist_id){
        groupArray.push(draw)
      }
      if(draw.artist_id!==groupArray[0].artist_id){
        groups[draw.artist_id] = groupArray
        groupArray = [draw]
      }
    });
    res.status(200).json(groups)
  } catch (error) {
    console.log('error-->',error)
    res.status(500).json({ status: 'error' })
  }
}
