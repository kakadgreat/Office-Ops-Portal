import React from 'react'
import Card from '../ui/Card.jsx'

export default function Contacts({ data, query }){
  if(!data) return <div>Loading...</div>
  const q = (query||'').toLowerCase()
  const flatten = data.contacts.items
  const items = flatten.filter(c => 
    (c.name + ' ' + (c.company||'') + ' ' + (c.role||'') + ' ' + (c.email||'') + ' ' + (c.phone||'')).toLowerCase().includes(q)
  )
  return (
    <div className="grid gap-4">
      {items.map((c,i)=>(
        <Card key={i} title={`${c.name}${c.company ? ' — ' + c.company : ''}`}>
          <div className="space-y-1">
            {c.role && <div><b>Role:</b> {c.role}</div>}
            {c.phone && <div><b>Phone:</b> {c.phone}</div>}
            {c.email && <div><b>Email:</b> <a className="underline" href={`mailto:${c.email}`}>{c.email}</a></div>}
            {c.notes && <div className="text-gray-600 whitespace-pre-wrap">{c.notes}</div>}
          </div>
        </Card>
      ))}
    </div>
  )
}
