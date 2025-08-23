import React from 'react'

const orderRank = (role)=>{
  const map = { 'Provider':0, 'MA':1, 'Front Desk':2, 'Spa':3 }
  return map[role] ?? 4
}

export default function Directory(){
  const [rows, setRows] = React.useState([])
  const [q, setQ] = React.useState('')
  const [loc, setLoc] = React.useState(new Set())
  const [dept, setDept] = React.useState(new Set())
  const [showFilters, setShowFilters] = React.useState(true)

  React.useEffect(()=>{
    fetch('/data/directory.json').then(r=>r.json()).then(j=> setRows(j.items||[])).catch(()=>setRows([]))
  }, [])

  const uniq = (arr)=> Array.from(new Set(arr)).sort((a,b)=> a.localeCompare(b))

  const locs  = uniq(rows.map(r=> r.location).filter(Boolean))
  const depts = uniq(rows.map(r=> r.dept).filter(Boolean))

  const toggle=(set, key)=>{
    const next=new Set(set)
    next.has(key)? next.delete(key): next.add(key)
    return next
  }

  const filtered = rows
    .filter(r=>{
      const hay = [r.name, r.role, r.dept, r.location, r.ext, r.phone, r.email].filter(Boolean).join(' ').toLowerCase()
      const okQ = hay.includes(q.toLowerCase())
      const okLoc = loc.size===0 || loc.has(r.location)
      const okDept = dept.size===0 || dept.has(r.dept)
      return okQ && okLoc && okDept
    })
    .sort((a,b)=> orderRank(a.role)-orderRank(b.role) || (a.name||'').localeCompare(b.name||''))

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Phone Directory</div>

      <div className="collapsible no-print" style={{position:'sticky', top:64, zIndex:5}}>
        <div className="collapsible-header">
          <span>Filters</span>
          <button className="collapse-btn" onClick={()=>setShowFilters(s=>!s)}>{showFilters?'Collapse':'Expand'}</button>
        </div>
        {showFilters && (
          <div className="collapsible-content">
            <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:8}}>
              <input style={{maxWidth:380}} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, role, location, ext..." />
              <div style={{fontWeight:600, alignSelf:'center'}}>Location:</div>
              {locs.map(k=>{
                const on=loc.has(k); return <button key={k} className={'pill '+(on?'on':'off')} onClick={()=>setLoc(toggle(loc,k))}>{k}</button>
              })}
            </div>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <div style={{fontWeight:600, alignSelf:'center'}}>Department:</div>
              {depts.map(k=>{
                const on=dept.has(k); return <button key={k} className={'pill '+(on?'on':'off')} onClick={()=>setDept(toggle(dept,k))}>{k}</button>
              })}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Role</th><th>Dept</th><th>Location</th><th>Ext</th><th>Email</th></tr>
          </thead>
          <tbody>
            {filtered.map((r,i)=>(
              <tr key={i} style={{background: i%2 ? '#fafafa':'#fff'}}>
                <td>{r.name}</td>
                <td>{r.role}</td>
                <td>{r.dept}</td>
                <td>{r.location}</td>
                <td>{r.ext}</td>
                <td>{r.email? <a href={'mailto:'+r.email}>{r.email}</a> : ''}</td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={6} style={{color:'#666'}}>No matches.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
