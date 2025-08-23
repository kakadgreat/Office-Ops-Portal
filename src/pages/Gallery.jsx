import React from 'react'

export default function Gallery(){
  const [items, setItems] = React.useState([]);

  React.useEffect(()=>{
    fetch('/data/social_gallery.json')
      .then(r=>r.json())
      .then(j=> setItems(j.items || []))
      .catch(()=> setItems([]));
  }, []);

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">Media Gallery</div>
      <div className="card">
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
          {items.map((it, idx)=>(
            <a key={idx} href={it.href || '#'} target="_blank" rel="noreferrer" className="wrap-link" style={{display:'block'}}>
              <img src={it.img} alt={it.caption || 'media'} style={{width:'100%', borderRadius:8, border:'1px solid #e5e7eb'}}/>
              {it.caption && <div style={{fontSize:12, marginTop:6, color:'#555'}}>{it.caption}</div>}
            </a>
          ))}
          {items.length===0 && <div style={{color:'#666'}}>No items found.</div>}
        </div>
      </div>
    </div>
  );
}
