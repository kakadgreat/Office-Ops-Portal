import React from 'react'
import CollapsibleCard from '../ui/CollapsibleCard.jsx'

export default function Dashboard({ data }){
  if(!data) return <div>Loading...</div>
  const links = data.ll?.links || {}
  const social = data.ll?.social || {}
  const events = (data.events?.items)||[]
  const target = {target:'_blank', rel:'noreferrer'}

  const SiteSocial = ({title, site, socials=[]}) => (
    <CollapsibleCard title={title}>
      <div className='space-y-2'>
        <div className='font-semibold'>Website</div>
        <div><a className='underline' href={site} {...target}>Open {title.split(' ')[0]}</a></div>
        {socials.length>0 && <div className='mt-2'>
          <div className='font-semibold mb-1'>Social</div>
          <ul className='list-disc ml-5'>
            {socials.map((u,i)=>(<li key={i}><a className='underline' href={u} {...target}>{u}</a></li>))}
          </ul>
        </div>}
      </div>
    </CollapsibleCard>
  )

  return (<div className='space-y-4'>
    {/* Row 1: Events + Quick Links + Contact IT + Directory */}
    <div className='grid md:grid-cols-4 gap-4'>
      <CollapsibleCard title='Events (from internal guide)' defaultOpen={true}>
        <ul className='list-disc ml-5'>{events.slice(0,12).map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?` — ${e.date}`:''}</li>))}</ul>
      </CollapsibleCard>

      <CollapsibleCard title='Quick Links' defaultOpen={true}>
        <div className='space-y-2'>
          <div className='font-semibold'>Website</div>
          <ul className='list-disc ml-5'>
            <li><a className='underline' href={links.primary} {...target}>Primary Care Website</a></li>
            <li><a className='underline' href={links.spa} {...target}>Spa Website</a></li>
            <li><a className='underline' href={links.peds} {...target}>Pediatrics Website</a></li>
          </ul>
          <div className='font-semibold mt-3'>Schedule & Time Clock</div>
          <ul className='list-disc ml-5'>
            <li><a className='underline' href='https://heartlandhcm.com/login' {...target}>Heartland HCM Login</a> — <span className='text-gray-600'>View schedules and clock in/out.</span></li>
          </ul>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title='Contact IT' defaultOpen={false}>
        <div>Inacomp — 770-255-1022</div>
        <div>Epic Help Desk — 404-605-3000</div>
      </CollapsibleCard>

      <CollapsibleCard title='Directory & Tools' defaultOpen={false}>
        <div><a className='underline' href='/phone'>Phone Directory</a></div>
        <div className='text-xs text-gray-500 mt-2'>Editor link is at the bottom of the Directory page.</div>
      </CollapsibleCard>
    </div>

    {/* Row 2: Combined Website + Social per brand + After Hours */}
    <div className='grid md:grid-cols-4 gap-4'>
      <SiteSocial title='Primary Care' site={links.primary} socials={social.primary||[]} />
      <SiteSocial title='Spa' site={links.spa} socials={social.spa||[]} />
      <SiteSocial title='Pediatrics' site={links.peds} socials={social.peds||[]} />
      <CollapsibleCard title='Pediatric After Hours Advice Line' defaultOpen={true}>
        <img src='/assets/afterhours.jpg' alt='Pediatric After Hours' className='rounded-xl border'/>
        <div className='mt-2 text-xs text-gray-600'>(770) 851-9947 — Weekdays 5–10 PM • Weekends 8 AM–10 PM</div>
      </CollapsibleCard>
    </div>
  </div>)
}