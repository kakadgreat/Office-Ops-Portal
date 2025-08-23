import React from 'react'

export default function Offices(){
  const [showFilters, setShowFilters] = React.useState(true);
  const [sites, setSites] = React.useState([]);
  const [service, setService] = React.useState(new Set());
  const [query, setQuery] = React.useState('');

  React.useEffect(()=>{
    fetch('/data/offices.json').then(r=>r.json()).then(j=> setSites(j.items||j || []));
  },[]);

  const toggle = (k) => { const n=new Set(service); n.has(k)?n.delete(k):n.add(k); setService(n); };

  const filtered = (sites||[]).filter(s=>{
    const svc=(s.service||'').toLowerCase();
    const name=(s.name||'').toLowerCase();
    const addr=(s.address||'').toLowerCase();
    const q=query.toLowerCase();
    let ok=true;
    if (service.size>0){
      ok = ok && (
        (service.has('Primary Care') && svc.includes('primary')) ||
        (service.has('Pediatrics') && svc.includes('pedi')) ||
        (service.has('MedSpa') && svc.includes('spa'))
      );
    }
    if (q) ok = ok && (name.includes(q) || addr.includes(q));
    return ok;
  });

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Locations</div>

      <div className="collapsible no-print">
        <div className="collapsible-header">
          <span>Filters</span>
          <button className="collapse-btn" onClick={()=>setShowFilters(s=>!s)}>
            {showFilters ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {showFilters && (
          <div className="collapsible-content">
            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:8}}>
              {['Primary Care','Pediatrics','MedSpa'].map(k=>{
                const on=service.has(k);
                return <button key={k} className={'pill '+(on?'on':'off')} onClick={()=>toggle(k)}>{k}</button>
              })}
            </div>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by location or address"
              style={{width:'100%', maxWidth:420, border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 10px'}} />
          </div>
        )}
      </div>

      {filtered.map((s, i)=>(
        <div key={i} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8}}>
            <div style={{fontWeight:700, fontSize:16}}>{s.name}</div>
            {s.link && <a href={s.link} target="_blank" rel="noreferrer">Open location page</a>}
          </div>
          <table className="table-zebra" style={{width:'100%', fontSize:14}}>
            <tbody>
              {s.address && <tr><td style={{width:140, fontWeight:600}}>Address</td><td>{s.address}</td></tr>}
              {s.hours && <tr><td style={{width:140, fontWeight:600}}>Hours</td><td>{s.hours}</td></tr>}
              {s.phone && <tr><td style={{width:140, fontWeight:600}}>Phone</td><td>{s.phone}</td></tr>}
              {s.notes && <tr><td style={{width:140, fontWeight:600}}>Notes</td><td>{s.notes}</td></tr>}
            </tbody>
          </table>
        </div>
      ))}
      {filtered.length===0 && <div style={{color:'#666'}}>No locations match your filters.</div>}
    </div>
  );
}
