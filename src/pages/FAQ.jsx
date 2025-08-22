
import React from 'react'
export default function FAQ(){
  const [items,setItems]=React.useState([])
  const [tagSel,setTagSel]=React.useState(new Set())
  const [navOpen,setNavOpen]=React.useState(true)
  React.useEffect(()=>{ fetch('/data/faqs.json').then(r=>r.json()).then(j=> setItems(j.items||[])) },[])
  const allTags = Array.from(new Set(items.flatMap(i=>i.tags||[]))).sort()
  const toggleTag=(t)=>{ const n=new Set(tagSel); n.has(t)?n.delete(t):n.add(t); setTagSel(n) }
  const filtered = (tagSel.size===0)?items:items.filter(i=> (i.tags||[]).some(t=> tagSel.has(t)))
  return (<div style={{display:'grid',gap:16}}>
    <div className='no-print' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button onClick={()=>setNavOpen(o=>!o)} className='pill'>{navOpen?'Hide':'Show'} Jump Pills</button>
        <button onClick={()=>window.print()} className='pill'>Print / Export PDF</button>
      </div>
      <div></div>
    </div>
    {navOpen && <div className='sticky-subnav' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <b>Jump to: </b>{items.map(i=> <a key={i.id} href={'#'+i.id} className='pill on' style={{marginRight:6}}>{i.short || i.title}</a>)}
    </div>}
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600,marginBottom:6}}>Tag Cloud (click to filter)</div>
      <div>{allTags.map(t=> <button key={t} onClick={()=>toggleTag(t)} className={'pill '+(tagSel.has(t)?'on':'off')} style={{marginRight:6}}>{t}</button>)}</div>
      {tagSel.size>0 && <div style={{marginTop:6,fontSize:12,color:'#666'}}>Filtering by: {[...tagSel].join(', ')}</div>}
    </div>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(2,1fr)'}}>
      {filtered.map(i=>(
        <div key={i.id} id={i.id} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
          <div style={{fontWeight:600,marginBottom:6}}>{i.title}</div>
          {i.links && <div><div style={{fontWeight:600}}>Links</div><ul>{i.links.map((l,idx)=>(<li key={idx}><a href={l.url} target='_blank' rel='noreferrer'>{l.label}</a></li>))}</ul></div>}
          <div><div style={{fontWeight:600}}>Steps</div>
            <div className='collapsible-content'>
              <table style={{width:'100%',fontSize:14}} className='table-zebra'>
                <thead style={{background:'#f5f5f5',borderBottom:'1px solid #eee'}}><tr><th style={{textAlign:'left',padding:'8px 12px'}}>#</th><th style={{textAlign:'left',padding:'8px 12px'}}>Action</th></tr></thead>
                <tbody>{(i.steps||[]).map((s,idx)=>(<tr key={idx}><td style={{padding:'8px 12px'}}>{idx+1}</td><td style={{padding:'8px 12px'}}>{s}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
          {i.note && <div style={{color:'#b91c1c',marginTop:8}}>{i.note}</div>}
          {i.images && <div style={{display:'grid',gap:8,gridTemplateColumns:'repeat(2,1fr)',marginTop:8}}>{i.images.map((im,idx)=>(<figure key={idx}><img src={im.src} style={{maxWidth:'100%',borderRadius:8,border:'1px solid #ddd'}}/><figcaption style={{fontSize:12,color:'#666'}}>{im.caption}</figcaption></figure>))}</div>}
          {(i.tags||[]).length>0 && <div style={{marginTop:8}}><div style={{fontWeight:600}}>Tags</div><div>{i.tags.map(t=> <span key={t} className='pill' style={{marginRight:6}}>{t}</span>)}</div></div>}
        </div>
      ))}
    </div>
  </div>)
}
