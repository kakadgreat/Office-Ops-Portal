import React from 'react'
import Card from '../ui/Card.jsx'

export default function Vendors({ data, query }){
  if(!data) return <div>Loading...</div>
  const q = (query||'').toLowerCase()
  const items = data.vendors.items.filter(v => 
    (v.name + ' ' + (v.category||'') + ' ' + (v.phone||'') + ' ' + (v.email||'')).toLowerCase().includes(q)
  )
  return (
    <div className="grid gap-4">
      {items.map((v,i)=>(
        <Card key={i} title={`${v.name}${v.category ? ' — ' + v.category : ''}`}>
          <div className="space-y-1">
            {v.phone && <div><b>Phone:</b> {v.phone}</div>}
            {v.email && <div><b>Email:</b> <a className="underline" href={`mailto:${v.email}`}>{v.email}</a></div>}
            {v.address && <div><b>Address:</b> {v.address}</div>}
            {v.notes && <div className="text-gray-600 whitespace-pre-wrap">{v.notes}</div>}
          </div>
        </Card>
      ))}
    </div>
  )
}
