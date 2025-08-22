import React from 'react'
export default function FAQ(){
  const [items,setItems]=React.useState([])
  React.useEffect(()=>{ fetch('/data/faqs.json').then(r=>r.json()).then(j=> setItems(j.items||[])) },[])
  const tags=Array.from(new Set(items.flatMap(i=>i.tags||[]))).sort()
  return (<div style={{display:'grid',gap:16}}>
    <div style={{position:'sticky',top:56,background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12,zIndex:2}}>
      <b>Jump to: </b>{items.map(i=> <a key={i.id} href={'#'+i.id} className='pill on' style={{marginRight:6}}>{i.short || i.title}</a>)}
    </div>
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontWeight:600}}>Tag Cloud</div><button id='tgBtn' onClick={()=>{ const b=document.getElementById('tgBody'); if(b) b.style.display=b.style.display==='none'?'block':'none' }}>Expand/Collapse</button></div>
      <div id='tgBody' style={{display:'none'}}>{tags.map(t=> <span key={t} style={{display:'inline-block',padding:4,margin:4,border:'1px solid #c7d2fe',borderRadius:9999,background:'#eef2ff'}}>{t}</span>)}</div>
    </div>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(2,1fr)'}}>
      {items.map(i=>(<div key={i.id} id={i.id} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600,marginBottom:6}}>{i.title}</div>
        {i.links && <div><div style={{fontWeight:600}}>Links</div><ul>{i.links.map((l,idx)=>(<li key={idx}><a href={l.url} target='_blank' rel='noreferrer'>{l.label}</a></li>))}</ul></div>}
        <div><div style={{fontWeight:600}}>Steps</div><ol>{(i.steps||[]).map((s,idx)=>(<li key={idx}>{s}</li>))}</ol></div>
        {i.note && <div style={{color:'#b91c1c'}}>{i.note}</div>}
        {i.images && <div>{i.images.map((im,idx)=>(<figure key={idx}><img src={im.src} style={{maxWidth:'100%'}}/><figcaption style={{fontSize:12,color:'#666'}}>{im.caption}</figcaption></figure>))}</div>}
        {(i.tags||[]).length>0 && <div><div style={{fontWeight:600}}>Tags</div><div>{i.tags.map(t=> <span key={t} style={{display:'inline-block',padding:4,margin:4,border:'1px solid #c7d2fe',borderRadius:9999,background:'#eef2ff'}}>{t}</span>)}</div></div>}
      </div>))}
    </div>
  </div>)
}