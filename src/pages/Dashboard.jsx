import React from 'react'

const SocialGallery = () => {
  const [items, setItems] = React.useState([]);
  const trackRef = React.useRef(null);
  const pos = React.useRef(0);

  React.useEffect(() => {
    fetch('/data/social_gallery.json')
      .then(r => r.json())
      .then(j => setItems(j.items || []));
  }, []);

  React.useEffect(() => {
    let raf;
    const step = () => {
      pos.current = (pos.current + 0.25) % (items.length * 212); // 200 width + 12 gap
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${pos.current}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    if (items.length > 0) raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  const loop = items.concat(items); // seamless loop

  return (
    <div className='space-y-2'>
      <div className='text-sm font-semibold'>Social Gallery</div>
      <div className='relative overflow-hidden border rounded-2xl bg-white' style={{ height: 180 }}>
        <div ref={trackRef} className='absolute left-0 top-0 h-full will-change-transform' style={{ display:'flex', alignItems:'center', gap:12, padding:8 }}>
          {loop.map((it,i)=> (
            <a key={i} href={it.href || '#'} target='_blank' rel='noreferrer' style={{ display:'inline-block', width:200 }} title={it.caption || 'Open video'}>
              <img src={it.img} alt={it.caption || 'post'} style={{ height:160, width:200, objectFit:'cover', borderRadius:10, border:'1px solid #ddd' }}/>
              {it.caption && <div className='text-xs text-gray-600 mt-1' style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{it.caption}</div>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard(){
  const [events,setEvents]=React.useState([])
  const [links,setLinks]=React.useState({}); const [social,setSocial]=React.useState({})
  const [gallery,setGallery]=React.useState([]); const scroller=React.useRef(null)
  React.useEffect(()=>{
    fetch('/data/events.json').then(r=>r.json()).then(j=>setEvents(j.items||[]))
    fetch('/data/links.json').then(r=>r.json()).then(j=>{setLinks(j.links||{}); setSocial(j.social||{})})
    fetch('/data/social_gallery.json').then(r=>r.json()).then(j=>setGallery(j.items||[]))
  },[])
  React.useEffect(()=>{ const el=scroller.current; if(!el) return; let raf; const step=()=>{ el.scrollLeft+=0.5; if(el.scrollLeft>=el.scrollWidth-el.clientWidth) el.scrollLeft=0; raf=requestAnimationFrame(step) }; raf=requestAnimationFrame(step); return ()=>cancelAnimationFrame(raf)},[gallery.length])
  const LinkList=({title,site,arr=[]})=>(<div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
    <div style={{fontWeight:600,marginBottom:6}}>{title}</div>
    <div style={{marginBottom:8}}><a href={site} target='_blank' rel='noreferrer'>Open {title}</a></div>
    <table className='table-zebra' style={{width:'100%',fontSize:14}}><thead><tr><th>Platform</th><th>URL</th></tr></thead><tbody>
      {(arr&&arr.length?arr:[]).map((u,i)=>(<tr key={i}><td>{u.includes('instagram')?'Instagram':u.includes('tiktok')?'TikTok':u.includes('youtube')?'YouTube':u.includes('facebook')?'Facebook':u.includes('x.com')?'X':'Link'}</td><td style={{wordBreak:'break-word'}}><a href={u} target='_blank' rel='noreferrer'>{u}</a></td></tr>))}
    </tbody></table>
{(!arr||arr.length===0)&&<div style={{fontSize:12,color:'#666',marginTop:6}}>No social links configured.</div>}
  </div>)
  return (<div style={{display:'grid',gap:16}}>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(4,1fr)'}}>
      <div style={{gridColumn:'span 2',background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600,marginBottom:6}}>Events (from internal guide)</div>
        <ul>{events.map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?' — '+e.date:''}</li>))}</ul>
      </div>
      <div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600}}>Quick Links</div>
        <div style={{marginTop:8}}>
          <div style={{fontWeight:600}}>Website</div>
          <ul><li><a href={links.primary} target='_blank' rel='noreferrer'>Primary Care Website</a></li><li><a href={links.spa} target='_blank' rel='noreferrer'>Spa Website</a></li><li><a href={links.peds} target='_blank' rel='noreferrer'>Pediatrics Website</a></li></ul>
          <div style={{fontWeight:600,marginTop:8}}>Schedule & Time Clock</div>
          <ul><li><a href='https://heartlandhcm.com/login' target='_blank' rel='noreferrer'>Heartland HCM Login</a> — View schedules and clock in/out.</li></ul>
        </div>
      </div>
      <div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600}}>Contact IT</div>
        <div><b>Inacomp — 770-255-1022</b><div style={{fontSize:14,color:'#555'}}>Windows & email password reset; computer & printer issues</div></div>
        <div style={{marginTop:8}}><b>Epic Help Desk — 404-605-3000</b> <span style={{fontSize:12,color:'#666'}}>(tell them we are part of Epic Community Connect)</span><div style={{fontSize:14,color:'#555'}}>Epic password reset; Epic issues</div></div>
      </div>
    </div>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(4,1fr)'}}>
      <LinkList title='Primary Care' site={links.primary} arr={social.primary||[]}/>
      <LinkList title='Spa' site={links.spa} arr={social.spa||[]}/>
      <LinkList title='Pediatrics' site={links.peds} arr={social.peds||[]}/>
      <div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
        <div style={{fontWeight:600}}>Pediatric After Hours Advice Line</div>
        <div>(770) 851-9947 — Weekdays 5–10 PM • Weekends 8 AM–10 PM</div>
      </div>
    </div>
    <div>
      <div style={{fontWeight:600,marginBottom:6}}>Social Gallery</div>
      <div ref={scroller} style={{overflowX:'auto',whiteSpace:'nowrap',background:'#fff',border:'1px solid #eee',borderRadius:12,padding:8}}>
        {((gallery&&gallery.length)?gallery:[]).map((it,i)=>(<span key={i} style={{display:'inline-block',marginRight:12}}>
          <img src={it.img} alt={it.caption||'post'} style={{height:160,borderRadius:10,border:'1px solid #ddd'}}/>
          <div style={{fontSize:12,color:'#666',maxWidth:190,overflow:'hidden',textOverflow:'ellipsis'}}>{it.caption}</div>
        </span>))}
      </div>
    </div>
  </div>)
}