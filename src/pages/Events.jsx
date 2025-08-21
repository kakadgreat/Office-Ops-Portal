import React from 'react'
import Card from '../ui/Card.jsx'
export default function Events({ data }){
  if(!data) return <div>Loading...</div>
  const items = data.events.items || []
  return (<div className='grid gap-4'>{items.map((e,i)=>(<Card key={i} title={e.title}><div className='space-y-1'>{e.date && <div><b>Date:</b> {e.date}</div>}{e.location && <div><b>Location:</b> {e.location}</div>}{e.details && <div className='text-gray-600'>{e.details}</div>}</div></Card>))}</div>)
}