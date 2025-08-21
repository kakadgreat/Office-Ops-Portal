import React from 'react'
import Card from '../ui/Card.jsx'
import { Link } from 'react-router-dom'
export default function Dashboard({ data }){
  if(!data) return <div>Loading...</div>
  const { meetings, events, highlights } = data
  const upcoming = (events.items || []).slice(0,4)
  return (<div className='space-y-4'>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title="This Month's Meetings"><ul className='list-disc ml-5'>{(meetings.recurring||[]).map((m,i)=>(<li key={i}><b>{m.name}</b> — {m.schedule}</li>))}</ul></Card>
      <Card title='Upcoming Events'><ul className='list-disc ml-5'>{upcoming.map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?` — ${e.date}`:''}</li>))}</ul></Card>
      <Card title='Quick Links'><ul className='list-disc ml-5'><li><Link className='underline' to='/phone'>Phone Directory</Link></li><li><Link className='underline' to='/it-help'>IT Help</Link></li><li><Link className='underline' to='/departments'>Departments</Link></li></ul></Card>
      <Card title='Facilities & IT Requests'><div className='space-y-1'><div>{highlights?.facilities_it?.how}</div><div><a className='underline' href={highlights?.facilities_it?.form} target='_blank' rel='noreferrer'>Open request form</a></div></div></Card>
    </div>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title='Office Facts'><div className='text-gray-700'>{highlights?.office_facts?.summary}</div></Card>
      <Card title='Chamber Memberships'><ul className='list-disc ml-5'>{(highlights?.chambers?.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul></Card>
      <Card title='Advertising & Media'><ul className='list-disc ml-5'>{(highlights?.advertising?.items||[]).map((x,i)=>(<li key={i}>{x}</li>))}</ul></Card>
      <Card title='Staff Portal'><div>View the staff portal for phones, schedules, and more. (Ask Ankur for access.)</div></Card>
    </div>
  </div>)
}