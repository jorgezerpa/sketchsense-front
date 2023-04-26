// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const _URL = 'http://localhost:3001/features' 

export default async function  handler( req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await fetch(_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const features = await response.json()
    
    res.status(200).json(features)
  } catch (error) {
    console.log('error-->',error)
    res.status(500).json({ status: 'error' })
  }
}
