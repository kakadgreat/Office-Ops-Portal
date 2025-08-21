import React from 'react'
import Card from '../ui/Card.jsx'
export default function Offices({ data, query }){
  if(!data) return <div>Loading...</div>
  const q = (query||'').toLowerCase()
  const items = data.offices.locations.filter(o => [o.name, (o.address||''), (o.county||''), (o.notes||'')].join(' ').toLowerCase().includes(q))
  return (<div className='grid gap-4'>
    {items.map((o,i)=>(<Card key={i} title={o.name}>
      <div className='space-y-2'>
        {o.image && <img src={o.image} alt={o.name} className='w-full rounded-xl border' />}
        {o.address && <div><b>Address:</b> {o.address}</div>}
        {o.county && <div><b>County:</b> {o.county}</div>}
        {o.hours && <div><b>Hours:</b> {o.hours}</div>}
        {o.providers?.length>0 && <div><b>Providers:</b> {o.providers.join(', ')}</div>}
        {o.managers?.length>0 && <div><b>Managers:</b> {o.managers.join(', ')}</div>}
        {o.notes && <div className='text-gray-600'>{o.notes}</div>}
      </div>
    </Card>))}
  </div>)
}