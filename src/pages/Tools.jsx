import React from 'react'
import Card from '../ui/Card.jsx'

export default function Tools({ data, query }){
  if(!data) return <div>Loading...</div>
  const q = (query||'').toLowerCase()
  const items = data.tools.items.filter(t =>
    (t.name + ' ' + (t.purpose||'')).toLowerCase().includes(q)
  )
  return (
    <div className="grid gap-4">
      {items.map((t,i)=>(
        <Card key={i} title={t.name}>
          <div className="space-y-1">
            {t.purpose && <div><b>Purpose:</b> {t.purpose}</div>}
            {t.notes && <div className="text-gray-600 whitespace-pre-wrap">{t.notes}</div>}
            {t.links?.length>0 && <ul className="list-disc ml-5">
              {t.links.map((l,idx)=>(<li key={idx}><a className="underline" href={l.href} target="_blank">{l.label}</a></li>))}
            </ul>}
          </div>
        </Card>
      ))}
    </div>
  )
}
