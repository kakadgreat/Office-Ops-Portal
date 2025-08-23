import React from 'react'
export default function Rolodex(){
  const [data,setData]=React.useState({vendors:[], pointsOfContact:[]})
  const [q,setQ]=React.useState('')
  const [open,setOpen]=React.useState(true)
  React.useEffect(()=>{ fetch('/data/rolodex.json').then(r=>r.json()).then(setData).catch(()=>setData({vendors:[], pointsOfContact:[]})) },[])
  const v = data.vendors.filter(x=>{
    const hay = [x.office,x.category,x.name,x.contact,x.phone,x.email,x.notes].filter(Boolean).join(' ').toLowerCase()
    return hay.includes(q.toLowerCase())
  })
  return (<div className="page">
    <div className="page-title">Facilities Rolodex</div>
    <div className="collapsible"><div className="collapsible-header">
      <span>Filters</span><button className="collapse-btn" onClick={()=>setOpen(s=>!s)}>{open?'Collapse':'Expand'}</button>
    </div>{open && <div className="card"><input placeholder="Search vendor, phone, category…" value={q} onChange={e=>setQ(e.target.value)} /></div>}</div>
    <div className="card">
      <table className="table"><thead><tr><th>Office</th><th>Category</th><th>Name</th><th>Contact</th><th>Phone</th><th>Notes</th></tr></thead>
      <tbody>{v.map((r,i)=>(<tr key={i}><td>{r.office}</td><td>{r.category}</td><td>{r.name}</td><td>{r.contact}</td><td>{r.phone}</td><td>{r.notes}</td></tr>))}
      {v.length===0 && <tr><td colSpan={6} style={{color:'#6b7280'}}>No entries yet.</td></tr>}</tbody></table>
    </div>
  </div>)
}