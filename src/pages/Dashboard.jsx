import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [events, setEvents] = React.useState([])
  const [links, setLinks] = React.useState({ quick:[], byRole:{} })
  const [hires, setHires] = React.useState([])

  React.useEffect(()=>{
    fetch('/data/events.json').then(r=>r.json()).then(j=> setEvents(j.items||[])).catch(()=>setEvents([]))
    fetch('/data/links.json').then(r=>r.json()).then(j=> setLinks(j||{quick:[],byRole:{}})).catch(()=>setLinks({quick:[],byRole:{}}))
    fetch('/data/new_staff.json').then(r=>r.json()).then(j=> setHires(j.items||[])).catch(()=>setHires([]))
  },[])

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Dashboard</div>

      <div className="grid-2">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Events (from internal guide)</div>
          <ul style={{margin:0, paddingLeft:18}}>
            {events.map((e,i)=>(
              <li key={i}><strong>{e.title}</strong>{e.detail? ' — '+e.detail:''}</li>
            ))}
            {events.length===0 && <li>No events listed.</li>}
          </ul>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Quick Forms</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <Link to="/form/facility-issue" className="pill">Report a facility issue</Link>
            <Link to="/form/order-supplies" className="pill">Order supplies</Link>
            <Link to="/form/time-off" className="pill">Request time off</Link>
          </div>
          <div style={{marginTop:12}}>
            <Link to="/gallery" className="pill">Open Media Gallery</Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Key Links by Role (shown for all)</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
          {Object.entries(links.byRole||{}).map(([role, items])=>(
            <div key={role}>
              <div style={{fontWeight:700, marginBottom:6}}>{role}</div>
              <ul style={{margin:0, paddingLeft:18}}>
                {items.map((l,idx)=>(<li key={idx}><a className="wrap-link" href={l.href} target="_blank" rel="noreferrer">{l.label||l.href}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>New Staff Welcome</div>
        <ul style={{margin:0, paddingLeft:18}}>
          {hires.map((p,i)=>(
            <li key={i}><strong>{p.name}</strong> — {p.role}{p.profile && <> — <a href={p.profile} target="_blank" rel="noreferrer">profile</a></>} {p.location? ` — ${p.location}`:''}</li>
          ))}
          {hires.length===0 && <li>No recent hires.</li>}
        </ul>
      </div>

      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Contact IT</div>
        <div><strong>Inacomp</strong> — 770-255-1022</div>
        <div style={{fontSize:13, color:'#555'}}>Windows/email password reset, computer/printer issues</div>
        <div style={{marginTop:8}}><strong>Epic Help Desk</strong> — 404-605-3000 <span style={{fontSize:13, color:'#555'}}>(tell them we are part of Epic Community Connect)</span></div>
        <div style={{fontSize:13, color:'#555'}}>Epic password reset, Epic issues</div>
      </div>
    </div>
  )
}
