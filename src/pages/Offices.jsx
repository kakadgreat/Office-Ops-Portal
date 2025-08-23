import React from 'react'
export default function Offices(){
  const [showFilters,setShowFilters]=React.useState(true);
  const [data,setData]=React.useState({locations:[]})
  const [types,setTypes]=React.useState(new Set())
  React.useEffect(()=>{ fetch('/data/offices.json').then(r=>r.json()).then(setData) },[])
  const toggleType=(t)=>{ const n=new Set(types); n.has(t)?n.delete(t):n.add(t); setTypes(n) }
  let items=(data.locations||[]); if(types.size) items=items.filter(o=>types.has(o.service))
  const Pill=({t})=>(<button className={'pill '+(types.has(t)?'on':'')} onClick={()=>toggleType(t)}>{t}</button>)
  return (<div style={{display:'grid',gap:16}}>
  <div className='page-title'>Locations</div>
  <div className='collapsible no-print'>
    <div className='collapsible-header'>
      <span>Filters</span>
      <button className='collapse-btn' onClick={()=>setShowFilters(s=>!s)}>{showFilters?'Collapse':'Expand'}</button>
    </div>
    {showFilters && (<div className='collapsible-content'>
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600,marginBottom:6}}>Filters</div>
      <Pill t='Primary Care'/> <Pill t='Pediatrics'/> <Pill t='MedSpa'/>
    </div>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(2,1fr)'}}>
      {items.map((o,i)=>(<div key={i} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600,marginBottom:6}}>{o.name}</div>
        {o.service&&<div><b>Type:</b> {o.service}</div>}
        {o.address&&<div><b>Address:</b> {o.address}</div>}
        {o.url&&<div><a href={o.url} target='_blank' rel='noreferrer'>Location page</a></div>}
        {(o.providers||[]).length>0 && <div><b>Providers:</b><ul>{o.providers.map((p,idx)=>(<li key={idx}>{p.name}{p.role?' — '+p.role:''}</li>))}</ul></div>}
      </div>))}
    </div>
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600,marginBottom:6}}>Location Editor</div>
      <a href='#' onClick={(e)=>{e.preventDefault(); const a=document.createElement('a'); a.href='/data/offices.json'; a.download='offices.json'; a.click();}}>Download JSON</a>
    </div>
  </div>)
}