import React from 'react'
export default function Facilities(){
  const [cats,setCats]=React.useState([])
  React.useEffect(()=>{ fetch('/data/facilities.json').then(r=>r.json()).then(j=> setCats(j.categories||[])) },[])
  return (<div style={{display:'grid',gap:16}}>
    <div className='no-print' style={{textAlign:'right'}}><button onClick={()=>window.print()}>Print / Export PDF</button></div>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(2,1fr)'}}>
      {cats.map((c,i)=>(<div key={i} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600,marginBottom:6}}>{c.category}</div>
        {(c.vendors||[]).map((v,idx)=>(<div key={idx} style={{border:'1px solid #eee',borderRadius:10,padding:8,marginBottom:8}}>
          <div style={{fontWeight:600}}>{v.name}</div>
          {v.phone && <div><b>Phone:</b> {v.phone}</div>}
          {v.email && <div><b>Email:</b> {v.email}</div>}
          {v.notes && <div style={{color:'#555'}}>{v.notes}</div>}
        </div>))}
      </div>))}
    </div>
  </div>)
}