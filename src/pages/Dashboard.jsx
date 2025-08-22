import React from 'react'

// Marquee gallery that stays within its container and links to each video
const SocialGallery = () => {
  const [items, setItems] = React.useState([]);
  const trackRef = React.useRef(null);
  const posRef = React.useRef(0);

  React.useEffect(() => {
    fetch('/data/social_gallery.json')
      .then(r => r.json())
      .then(j => setItems(Array.isArray(j.items) ? j.items : []));
  }, []);

  React.useEffect(() => {
    if (!items.length) return;
    let rafId;
    const step = () => {
      posRef.current = (posRef.current + 0.25) % (items.length * 206); // 196 width + 10 gap
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [items.length]);

  const loop = items.concat(items);

  return (
    <div style={{marginTop:16}}>
      <div style={{fontWeight:600, marginBottom:6}}>Social Gallery</div>
      <div className='relative overflow-hidden border rounded-2xl bg-white' style={{ height: 180 }}>
        <div
          ref={trackRef}
          className='absolute left-0 top-0 h-full will-change-transform'
          style={{ display:'flex', alignItems:'center', gap:10, padding:8 }}
        >
          {loop.map((it, i) => (
            <a
              key={i}
              href={it.href || '#'}
              target='_blank'
              rel='noreferrer'
              style={{ display:'inline-block', width:196 }}
              title={it.caption || 'Open video'}
            >
              <img
                src={it.img}
                alt={it.caption || 'post'} 
                style={{ height:160, width:196, objectFit:'cover', borderRadius:10, border:'1px solid #ddd' }}
              />
              {it.caption && (
                <div style={{fontSize:12, color:'#666', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:4}}>
                  {it.caption}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard(){
  const [events,setEvents]=React.useState([])
  const [links,setLinks]=React.useState({}); 
  const [social,setSocial]=React.useState({})

  React.useEffect(()=>{
    fetch('/data/events.json').then(r=>r.json()).then(j=>setEvents(j.items||[]))
    fetch('/data/links.json').then(r=>r.json()).then(j=>{setLinks(j.links||{}); setSocial(j.social||{})})
  },[])

  const LinkList=({title,site,arr=[]})=>(
    <div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600,marginBottom:6}}>{title}</div>
      <div style={{marginBottom:8}}><a href={site} target='_blank' rel='noreferrer'>Open {title}</a></div>
      <table className='table-zebra' style={{width:'100%',fontSize:14}}>
        <thead>
          <tr><th style={{textAlign:'left'}}>Platform</th><th style={{textAlign:'left'}}>URL</th></tr>
        </thead>
        <tbody>
          {(arr||[]).map((u,i)=>(
            <tr key={i}>
              <td>{u.includes('instagram')?'Instagram':u.includes('tiktok')?'TikTok':u.includes('youtube')?'YouTube':u.includes('facebook')?'Facebook':u.includes('x.com')?'X':'Link'}</td>
              <td className='wrap-link'><a href={u} target='_blank' rel='noreferrer'>{u}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!arr||arr.length===0)&&<div style={{fontSize:12,color:'#666',marginTop:6}}>No social links configured.</div>}
    </div>
  )

  return (
    <div style={{display:'grid',gap:16}}>
      <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(4,1fr)'}}>
        <div style={{gridColumn:'span 2',background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
          <div style={{fontWeight:600,marginBottom:6}}>Events (from internal guide)</div>
          <ul>{events.map((e,i)=>(<li key={i}><b>{e.title}</b>{e.date?' — '+e.date:''}</li>))}</ul>
        </div>
        <div style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
          <div style={{fontWeight:600}}>Quick Links</div>
          <div style={{marginTop:8}}>
            <div style={{fontWeight:600}}>Website</div>
            <ul>
              <li><a href={links.primary} target='_blank' rel='noreferrer'>Primary Care Website</a></li>
              <li><a href={links.spa} target='_blank' rel='noreferrer'>Spa Website</a></li>
              <li><a href={links.peds} target='_blank' rel='noreferrer'>Pediatrics Website</a></li>
            </ul>
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
      <SocialGallery/>
    </div>
  )
}
