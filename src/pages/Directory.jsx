import React from 'react'
const order = (role)=> ({Provider:0, MA:1, 'Front Desk':2, Spa:3})[role] ?? 4
export default function Directory(){
  const [data,setData]=React.useState({items:[]})
  const [q,setQ]=React.useState('')
  const [loc,setLoc]=React.useState(new Set())
  const [dept,setDept]=React.useState(new Set())
  const [open,setOpen]=React.useState(true)
  React.useEffect(()=>{ fetch('/data/phone.json').then(r=>r.json()).then(setData).catch(()=>setData({items:[]})) },[])
  const uniq = (k)=> Array.from(new Set(data.items.map(x=>x[k]).filter(Boolean))).sort()
  const locs = uniq('location'); const depts= uniq('dept')
  const toggle=(set,key)=>{ const next=new Set(set); next.has(key)? next.delete(key): next.add(key); return next }
  const rows = data.items.filter(r=>{
      const hay=[r.name,r.location,r.dept,r.ext].filter(Boolean).join(' ').toLowerCase()
      const okQ = hay.includes(q.toLowerCase()); const okL = loc.size===0 || loc.has(r.location); const okD = dept.size===0 || dept.has(r.dept)
      return okQ && okL && okD
    }).sort((a,b)=> order(a.role)-order(b.role) || (a.name||'').localeCompare(b.name||''))
  return (<div className="page">
    <div className="page-title">Phone Directory</div>
    <div className="collapsible no-print" style={{position:'sticky', top:64}}><div className="collapsible-header">
      <span>Filters</span><button className="collapse-btn" onClick={()=>setOpen(s=>!s)}>{open?'Collapse':'Expand'}</button>
    </div>{open && <div className="card">
      <div className="controls">
        <input placeholder="Search name, location, dept, ext…" value={q} onChange={e=>setQ(e.target.value)} />
        <div style={{fontWeight:600, alignSelf:'center'}}>Location:</div>
        <div className="pills">{locs.map(l=>{ const on=loc.has(l); return <button key={l} className={'filter-pill '+(on?'on':'')} onClick={()=>setLoc(toggle(loc,l))}>{l}</button> })}</div>
        <div style={{fontWeight:600, alignSelf:'center'}}>Department:</div>
        <div className="pills">{depts.map(d=>{ const on=dept.has(d); return <button key={d} className={'filter-pill '+(on?'on':'')} onClick={()=>setDept(toggle(dept,d))}>{d}</button> })}</div>
      </div>
    </div>}</div>
    <div className="card">
      <table className="table"><thead><tr><th>Name</th><th>Role</th><th>Dept</th><th>Location</th><th>Ext</th></tr></thead>
      <tbody>{rows.map((r,i)=>(<tr key={i} style={{background: i%2?'#fafafa':'#fff'}}><td>{r.name}</td><td>{r.role}</td><td>{r.dept}</td><td>{r.location}</td><td>{r.ext}</td></tr>))}
      {rows.length===0 && <tr><td colSpan={5} style={{color:'#6b7280'}}>No matches or directory not loaded.</td></tr>}</tbody></table>
    </div>
  </div>)
}