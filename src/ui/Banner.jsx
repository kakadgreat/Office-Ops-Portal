import React from 'react'
export default function Banner(){
  const [data,setData]=React.useState(null)
  const [closed,setClosed]=React.useState(localStorage.getItem('bannerClosed')==='1')
  React.useEffect(()=>{ fetch('/data/announcements.json').then(r=>r.json()).then(setData) },[])
  if(!data || !data.active || closed) return null
  return (<div className='banner no-print'>
    <div className='max-w-6xl mx-auto px-4 py-2 flex items-start gap-3 text-sm'>
      <div className='font-semibold'>Announcement:</div>
      <div className='flex-1'>{data.message}</div>
      <button onClick={()=>{localStorage.setItem('bannerClosed','1'); setClosed(true)}} className='border rounded px-2 py-0.5'>Dismiss</button>
    </div>
  </div>)
}