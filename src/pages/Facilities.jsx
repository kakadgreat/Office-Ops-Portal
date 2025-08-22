import React from 'react'
import CollapsibleCard from '../ui/CollapsibleCard.jsx'
export default function Facilities({ data }){
  if(!data) return <div>Loading...</div>
  const cats=(data.facilities?.categories)||[]
  if(cats.length===0) return <div>No facilities vendors found. Add them in <code>public/data/facilities.json</code>.</div>
  return (<div className='space-y-4'>
    <div className='no-print flex gap-2 justify-end'>
      <button onClick={()=>window.print()} className='border rounded px-3 py-1'>Print / Export PDF</button>
    </div>
    <div className='grid md:grid-cols-2 gap-4'>
    {cats.map((c,i)=>(
      <CollapsibleCard key={i} title={c.category} defaultOpen={false}>
        <div className='space-y-2'>
          {c.vendors.map((v,idx)=>(
            <div key={idx} className='border rounded-xl p-2'>
              <div className='font-semibold'>{v.name}</div>
              {v.phone&&<div><b>Phone:</b> {v.phone}</div>}
              {v.email&&<div><b>Email:</b> <a className='underline' href={`mailto:${v.email}`}>{v.email}</a></div>}
              {v.notes&&<div className='text-gray-600 text-sm'>{v.notes}</div>}
            </div>
          ))}
        </div>
      </CollapsibleCard>
    ))}
  </div>)
}