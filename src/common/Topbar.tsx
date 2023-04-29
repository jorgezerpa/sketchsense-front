import React from 'react'
import { useRouter } from 'next/router'

export const Topbar = () => {
    const router = useRouter()

  return (
    <div className='absolute top-0 left-0 right-0 z-50'>
        <div className='flex items-center justify-center gap-5 px-2 py-6 text-white '>
            <div className={`${router.pathname==='/' ? 'font-bold text-white' : 'text-gray-200'}`} onClick={()=>router.push('/')}>Home</div>
            <div className='w-[1px] bg-white h-[1.2rem]'></div>
            <div className={`${router.pathname==='/createEntry' ? 'font-bold text-white' : 'text-gray-200'}`} onClick={()=>router.push('/createEntry')}>Create Entry</div>
            <div className='w-[1px] bg-white h-[1.2rem]'></div>
            <div className={`${router.pathname==='/dataViewer' ? 'font-bold text-white' : 'text-gray-200'}`} onClick={()=>router.push('/dataViewer')}>Data Viwer</div>
        </div>
    </div>
  )
}
