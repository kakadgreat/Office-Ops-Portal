import React from 'react'
import Card from '../ui/Card.jsx'
import { Link } from 'react-router-dom'
export default function Dashboard({ data }){
  if(!data) return <div>Loading...</div>
  const { meetings, events } = data
  const upcoming = (events.items || []).slice(0,4)
  return (<div className='space-y-4'>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title="This Month's Meetings"><ul className='list-disc ml-5'>{(meetings.recurring||[]).map((m,i)=>(<li key={i}><b>{m.name}</b> – {m.schedule}</li>))}</ul></Card>
      <Card title='Upcoming Events'><ul className='list-disc ml-5'>{upcoming.map((e,i)=>(<li key={i}><b>{e.title}</b></li>))}</ul></Card>
      <Card title='Quick Links'><ul className='list-disc ml-5'><li><a className='underline' target='_blank' rel='noreferrer' href='https://www.prestigemedicalgroup.org/locations'>Locations</a></li><li><a className='underline' target='_blank' rel='noreferrer' href='https://www.prestigemedspa.org/resources/events-specials'>MedSpa Events</a></li></ul></Card>
      <Card title='Phone / IT / Departments'><ul className='list-disc ml-5'><li><Link className='underline' to='/phone'>Phone Directory</Link> (<Link className='underline' to='/phone/edit'>edit</Link>)</li><li><Link className='underline' to='/it-help'>IT Help</Link></li><li><Link className='underline' to='/departments'>Departments</Link></li></ul></Card>
    </div>
  </div>)
}