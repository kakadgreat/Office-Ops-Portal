import React from 'react'
import Card from '../ui/Card.jsx'
import CollapsibleCard from '../ui/CollapsibleCard.jsx'

export default function Offices({ data }){
  if(!data) return <div>Loading...</div>
  const [types,setTypes]=React.useState(new Set())
  const [names,setNames]=React.useState(new Set())
  const all=data.offices.locations||[]
  const toggle=(set,value)=>{const next=new Set(set); next.has(value)?next.delete(value):next.add(value); return next}
  const typeList=['Primary Care','Pediatrics','MedSpa']
  const nameList=Array.from(new Set(all.map(o=>o.name))).sort()
  let items=all
  if(types.size>0) items=items.filter(o=>types.has(o.service||''))
  if(names.size>0) items=items.filter(o=>names.has(o.name))
  const Pill=({label,active,onClick})=> <button onClick={onClick} className={`pill ${active?'on':'off'}`}>{label}</button>
  return (<div className='space-y-4'>
    <div className='no-print'>
      <CollapsibleCard title='Filters' defaultOpen={true}>
        <div className='text-sm font-semibold'>Filter by Service Type</div>
        <div className='flex flex-wrap gap-2 mb-2'>{typeList.map(c=> <Pill key={c} label={c} active={types.has(c)} onClick={()=>setTypes(toggle(types,c))}/>)}</div>
        <div className='text-sm font-semibold mt-2'>Filter by Location</div>
        <div className='flex flex-wrap gap-2'>{nameList.map(n=> <Pill key={n} label={n} active={names.has(n)} onClick={()=>setNames(toggle(names,n))}/>)}</div>
      </CollapsibleCard>
    </div>
    <div className='grid md:grid-cols-2 gap-4'>
      {items.map((o,i)=>(
        <Card key={i} title={o.name}>
          <div className='space-y-2'>
            {o.service&&<div><b>Type:</b> {o.service}</div>}
            {o.address&&<div><b>Address:</b> {o.address}</div>}
            {o.url&&<div><a className='underline' href={o.url} target='_blank' rel='noreferrer'>Location page</a></div>}
          </div>
        </Card>
      ))}
    </div>
  </div>)
}