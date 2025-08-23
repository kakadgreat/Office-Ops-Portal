import React from 'react'

export default function Dashboard(){
  const [events, setEvents] = React.useState([]);
  const [links, setLinks] = React.useState({quick:[]});

  React.useEffect(()=>{
    fetch('/data/events.json').then(r=>r.json()).then(j=> setEvents(j.items || [])).catch(()=>setEvents([]));
    fetch('/data/links.json').then(r=>r.json()).then(j=> setLinks(j || {quick:[]})).catch(()=>setLinks({quick:[]}));
  },[]);

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Dashboard</div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Events (from internal guide)</div>
          <ul style={{margin:0, paddingLeft:18}}>
            {events.map((e, i)=> <li key={i}><strong>{e.title}</strong>{e.detail? ' — '+e.detail: ''}</li>)}
            {events.length===0 && <li>No events listed.</li>}
          </ul>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Quick Links</div>
          <ul style={{margin:0, paddingLeft:18}}>
            {(links.quick||[]).map((l,i)=> <li key={i}><a href={l.href} target="_blank" rel="noreferrer">{l.label||l.href}</a></li>)}
            {(links.quick||[]).length===0 && <li>No links yet.</li>}
          </ul>
          <div style={{marginTop:12}}>
            <a href="/gallery" className="pill">Open Media Gallery</a>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Contact IT</div>
        <div><strong>Inacomp</strong> — 770-255-1022</div>
        <div style={{fontSize:13, color:'#555'}}>Windows/email password reset, computer/printer issues</div>
        <div style={{marginTop:8}}><strong>Epic Help Desk</strong> — 404-605-3000 <span style={{fontSize:13, color:'#555'}}>(tell them we are part of Epic Community Connect)</span></div>
        <div style={{fontSize:13, color:'#555'}}>Epic password reset, Epic issues</div>
      </div>
    </div>
  );
}
