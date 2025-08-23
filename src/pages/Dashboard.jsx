import React from 'react'
const Card = ({title, children}) => (<div className="card"><h3>{title}</h3>{children}</div>)
export default function Dashboard(){
  const [events,setEvents]=React.useState([])
  const [links,setLinks]=React.useState({groups:[]})
  const [it,setIT]=React.useState({cards:[]})
  React.useEffect(()=>{
    fetch('/data/events.json').then(r=>r.json()).then(setEvents).catch(()=>setEvents([]))
    fetch('/data/quicklinks.json').then(r=>r.json()).then(setLinks).catch(()=>setLinks({groups:[]}))
    fetch('/data/it_help.json').then(r=>r.json()).then(setIT).catch(()=>setIT({cards:[]}))
  },[])
  return (<div className="page">
    <div className="page-title">Dashboard</div>
    <Card title="Events (from internal guide)">
      <ul>{events.items?.map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?' — '+e.date:''}{e.time?' — '+e.time:''}</li>))}</ul>
    </Card>
    <Card title="Quick Links">
      <div className="grid3">
        {links.groups?.map((g,gi)=>(<div key={gi} className="card" style={{border:'1px dashed #e5e7eb'}}>
          <h4 style={{marginTop:0}}>{g.audience}</h4>
          <ul>{g.links?.map((l,li)=>(<li key={li}><a href={l.href} target={l.newTab?'_blank':'_self'} rel="noreferrer">{l.label}</a></li>))}</ul>
        </div>))}
      </div>
    </Card>
    <Card title="Contact IT">
      <div className="grid3">{it.cards?.map((c,ci)=>(<div key={ci} className="card" style={{border:'1px dashed #e5e7eb'}}>
        <div style={{fontWeight:700}}>{c.title}</div><div style={{marginTop:4}}>{c.phone}</div>
        {c.notes && <div style={{color:'#6b7280', marginTop:6}}>{c.notes}</div>}
      </div>))}</div>
    </Card>
  </div>)
}