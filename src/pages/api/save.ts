// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const STORE_DATA_URL = 'url'

type Data = {
  status: string
}

export default async function  handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data } = req.body
    console.log('data-->',data)
    //SEND DATA TO SERVER AND STORE IT IN DATABASE OR FILE
    // const response = await fetch(STORE_DATA_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    res.status(200).json({ status: 'success' })
  } catch (error) {
    
  }
}
