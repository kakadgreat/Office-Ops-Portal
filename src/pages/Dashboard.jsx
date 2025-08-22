import React from 'react'
import Card from '../ui/Card.jsx'
export default function Dashboard({ data }){
  if(!data) return <div>Loading...</div>
  const links = data.ll?.links || {}
  const social = data.ll?.social || {}
  const events = (data.events?.items)||[]
  const target = {target:'_blank', rel:'noreferrer'}
  return (<div className='space-y-4'>
    <div className='grid md:grid-cols-4 gap-4'>
      <Card title='Primary Care Website'><a className='underline' href={links.primary} {...target}>Open PMG</a></Card>
      <Card title='Spa Website'><a className='underline' href={links.spa} {...target}>Open Med Spa</a></Card>
      <Card title='Pediatrics Website'><a className='underline' href={links.peds} {...target}>Open Pediatrics</a></Card>
      <Card title='Pediatric After Hours Advice Line'>
        <img src='/assets/afterhours.jpg' alt='Pediatric After Hours' className='rounded-xl border'/>
        <div className='mt-2 text-xs text-gray-600'>(770) 851-9947 — Weekdays 5–10 PM • Weekends 8 AM–10 PM</div>
      </Card>
    </div>

    <div className='grid md:grid-cols-3 gap-4'>
      <Card title='Primary Care Social'>
        <ul className='list-disc ml-5'>{(social.primary||[]).map((u,i)=>(<li key={i}><a className='underline' href={u} {...target}>{u}</a></li>))}</ul>
      </Card>
      <Card title='Spa Social'>
        <ul className='list-disc ml-5'>{(social.spa||[]).map((u,i)=>(<li key={i}><a className='underline' href={u} {...target}>{u}</a></li>))}</ul>
      </Card>
      <Card title='Pediatrics Social'>
        <ul className='list-disc ml-5'>{(social.peds||[]).map((u,i)=>(<li key={i}><a className='underline' href={u} {...target}>{u}</a></li>))}</ul>
      </Card>
    </div>

    <div className='grid md:grid-cols-4 gap-4'>
      <Card title='Events (from internal guide)'>
        <ul className='list-disc ml-5'>{events.slice(0,8).map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?` — ${e.date}`:''}</li>))}</ul>
      </Card>
      <Card title='Quick Links'>
        <ul className='list-disc ml-5'>
          <li><a className='underline' href={links.primary} {...target}>Primary Care Website</a></li>
          <li><a className='underline' href={links.spa} {...target}>Spa Website</a></li>
          <li><a className='underline' href={links.peds} {...target}>Pediatrics Website</a></li>
        </ul>
      </Card>
      <Card title='Contact IT'><div>Inacomp — 770-255-1022</div><div>Epic Help Desk — 404-605-3000</div></Card>
      <Card title='Directory & Tools'>
        <div><a className='underline' href='/phone'>Phone Directory</a></div>
        <div className='text-xs text-gray-500 mt-2'>Editor link is on the Phone Directory page.</div>
      </Card>
    </div>
  </div>)
}