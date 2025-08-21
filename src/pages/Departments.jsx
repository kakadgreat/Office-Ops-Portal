import React from 'react'
import Card from '../ui/Card.jsx'

export default function Departments({ data, query }){
  if(!data) return <div>Loading...</div>
  const q = (query||'').toLowerCase()
  const items = data.departments.items.filter(d => 
    (d.name + ' ' + (d.scope||'') + ' ' + (d.notes||'')).toLowerCase().includes(q)
  )
  return (
    <div className="grid gap-4">
      {items.map((d,i)=>(
        <Card key={i} title={d.name}>
          <div className="space-y-1">
            {d.scope && <div><b>Scope:</b> {d.scope}</div>}
            {d.meetings && <div><b>Meetings:</b> {d.meetings}</div>}
            {d.contacts?.length>0 && <div><b>Contacts:</b> {d.contacts.join(', ')}</div>}
            {d.notes && <div className="text-gray-600">{d.notes}</div>}
          </div>
        </Card>
      ))}
    </div>
  )
}
