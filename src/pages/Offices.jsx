import React from 'react'
export default function Offices(){
  const [data,setData]=React.useState({offices:[]})
  const [q,setQ]=React.useState('')
  const [types,setTypes]=React.useState(new Set())
  const [open,setOpen]=React.useState(true)
  React.useEffect(()=>{ fetch('/data/offices.json').then(r=>r.json()).then(setData).catch(()=>setData({offices:[]})) },[])
  const uniq = (arr)=> Array.from(new Set(arr))
  const allTypes = uniq(data.offices.map(o=>o.type).filter(Boolean))
  const toggle=(k)=>{ const next=new Set(types); next.has(k)? next.delete(k): next.add(k); setTypes(next) }
  const items = data.offices.filter(o=>{
    const okT = types.size===0 || types.has(o.type)
    const hay = [o.name,o.type,o.address,o.county].filter(Boolean).join(' ').toLowerCase()
    const okQ = hay.includes(q.toLowerCase())
    return okT && okQ
  })
  return (<div className="page">
    <div className="page-title">Locations</div>
    <div className="collapsible"><div className="collapsible-header">
      <span>Filters</span><button className="collapse-btn" onClick={()=>setOpen(s=>!s)}>{open?'Collapse':'Expand'}</button>
    </div>{open && <div className="card">
      <div className="controls">
        <input placeholder="Search name, address…" value={q} onChange={e=>setQ(e.target.value)} />
        {allTypes.map(t=>{ const on=types.has(t); return <button key={t} className={'filter-pill '+(on?'on':'')} onClick={()=>toggle(t)}>{t}</button> })}
      </div>
    </div>}</div>
    <div className="grid3">{items.map((o,i)=>(<div className="card" key={i}>
      <div style={{fontWeight:700}}>{o.name}</div>
      <div className="badge" style={{marginTop:6}}>{o.type}</div>
      {o.address && <div style={{marginTop:8}}>{o.address}</div>}
      {o.hours && <div style={{marginTop:4, color:'#6b7280'}}>{o.hours}</div>}
      {o.website && <div style={{marginTop:8}}><a href={o.website} target="_blank" rel="noreferrer">Location page</a></div>}
    </div>))}{items.length===0 && <div className="card">No locations yet.</div>}</div>
  </div>)
}