import React from 'react'

export default function Rolodex(){
  const [data, setData] = React.useState({ categories: [] })
  const [q, setQ] = React.useState('')

  React.useEffect(()=>{
    fetch('/data/facilities.json').then(r=>r.json()).then(j=> setData(j||{categories:[]})).catch(()=>setData({categories:[]}))
  },[])

  const filtered = (data.categories||[]).map(cat=>{
    const vendors=(cat.vendors||[]).filter(v=>{
      const hay=[v.name,v.phone,v.email,v.address,v.contact,v.note,v.site].filter(Boolean).join(' ').toLowerCase()
      return hay.includes(q.toLowerCase())
    })
    return {...cat, vendors}
  }).filter(c=>c.vendors.length>0)

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Facilities Rolodex</div>
      <div className="card">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search vendor, contact, phone, etc."/>
      </div>
      <div style={{display:'grid', gap:16}}>
        {filtered.map((cat, idx)=>(
          <div key={idx} className="card">
            <div style={{fontWeight:700, marginBottom:8}}>{cat.category}</div>
            <table className="table">
              <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Notes</th></tr></thead>
              <tbody>
                {cat.vendors.map((v,i)=>(
                  <tr key={i}>
                    <td>
                      <div style={{fontWeight:600}}>{v.name}</div>
                      {v.contact && <div style={{fontSize:12, color:'#666'}}>Contact: {v.contact}</div>}
                      {v.address && <div style={{fontSize:12, color:'#666'}}>{v.address}</div>}
                      {v.site && <div style={{fontSize:12}}><a href={v.site} target="_blank" rel="noreferrer">{v.site}</a></div>}
                    </td>
                    <td>{v.phone||''}</td>
                    <td>{v.email ? <a href={`mailto:${v.email}`}>{v.email}</a> : ''}</td>
                    <td>{v.note||''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        {filtered.length===0 && <div style={{color:'#666'}}>No vendors match your search.</div>}
      </div>
    </div>
  )
}
