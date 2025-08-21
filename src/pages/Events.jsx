import React from 'react'
import Card from '../ui/Card.jsx'
export default function Events({ data }){
  if(!data) return <div>Loading...</div>
  const items = data.events.items || []
  return (<div className='grid gap-4'>{items.map((e,i)=>(<Card key={i} title={e.title}><div className='space-y-1'>{e.location&&<div><b>Applies to:</b> {e.location}</div>}{e.links?.length>0&&<ul className='list-disc ml-5'>{e.links.map((l,idx)=>(<li key={idx}><a className='underline' href={l.href} target='_blank' rel='noreferrer'>{l.label}</a></li>))}</ul>}{e.details&&<div className='text-gray-600'>{e.details}</div>}</div></Card>))}</div>)
}