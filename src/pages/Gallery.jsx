import React from 'react'
export default function Gallery(){
  const [data,setData]=React.useState({items:[]})
  React.useEffect(()=>{ fetch('/data/social_gallery.json').then(r=>r.json()).then(setData).catch(()=>setData({items:[]})) },[])
  return (<div className="page">
    <div className="page-title">Media Gallery</div>
    <div className="grid3">{data.items.map((it,i)=>(
      <a key={i} className="card" href={it.href||'#'} target="_blank" rel="noreferrer">
        <img src={it.thumb||it.img} alt={it.caption||'media'} style={{width:'100%', borderRadius:8, border:'1px solid #e5e7eb'}}
             onError={(e)=>{e.currentTarget.src='/assets/gallery/placeholder.svg'}}/>
        <div style={{marginTop:8}}>{it.caption}</div>
      </a>
    ))}{data.items.length===0 && <div className="card">No media yet.</div>}</div>
  </div>)
}