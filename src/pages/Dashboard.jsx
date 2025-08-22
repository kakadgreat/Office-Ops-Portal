import React from 'react'
import Card from '../ui/Card.jsx'
import { Link } from 'react-router-dom'
export default function Dashboard({ links }){
  return (<div className='space-y-4'>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title='Quick Links'>
        <ul className='list-disc ml-5'>
          <li><Link className='underline' to='/phone'>Phone Directory</Link></li>
          <li><Link className='underline' to='/facilities'>Facilities Rolodex</Link></li>
          <li><Link className='underline' to='/offices'>Locations</Link></li>
        </ul>
      </Card>
      <Card title='Staff Tools'>
        <ul className='list-disc ml-5'>
          <li><a className='underline' href='https://www.prestigemedicalgroup.org' target='_blank' rel='noreferrer'>Primary Care (PMG)</a></li>
          <li><a className='underline' href='https://www.prestigemedspa.org' target='_blank' rel='noreferrer'>Prestige Med Spa</a></li>
          <li><a className='underline' href='https://www.prestigepediatrics.org' target='_blank' rel='noreferrer'>Prestige Pediatrics</a></li>
        </ul>
      </Card>
      <Card title='Contact IT'><div>Inacomp — 770-255-1022</div><div>Epic Help Desk — 404-605-3000</div></Card>
      <Card title='Announcements'><div>See the banner at the top for urgent notices.</div></Card>
    </div>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title='Primary Care Website'><a className='underline' href='https://www.prestigemedicalgroup.org' target='_blank' rel='noreferrer'>Open PMG</a></Card>
      <Card title='Spa Website'><a className='underline' href='https://www.prestigemedspa.org' target='_blank' rel='noreferrer'>Open Med Spa</a></Card>
      <Card title='Pediatrics Website'><a className='underline' href='https://www.prestigepediatrics.org' target='_blank' rel='noreferrer'>Open Pediatrics</a></Card>
      <Card title='Pediatric After Hours Advice Line'>
        <img src='/assets/afterhours.jpg' alt='Pediatric After Hours' className='rounded-xl border'/>
        <div className='mt-2 text-xs text-gray-600'>(770) 851-9947 — Weekdays 5–10 PM • Weekends 8 AM–10 PM</div>
      </Card>
    </div>
  </div>)
}