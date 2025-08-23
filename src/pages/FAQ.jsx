import React from 'react'

function FAQItem({ item }){
  const [open, setOpen] = React.useState(true);
  return (
    <div id={item.id} className="collapsible">
      <div className="collapsible-header">
        <span>{item.title}</span>
        <button className="collapse-btn" onClick={()=>setOpen(o=>!o)}>{open ? 'Collapse' : 'Expand'}</button>
      </div>
      {open && (
        <div className="collapsible-content">
          {(item.tags||[]).length>0 && (
            <div style={{marginBottom:8}}>
              <div style={{fontWeight:600}}>Tags</div>
              <div>{item.tags.map(t=> <span key={t} className='pill' style={{marginRight:6}}>{t}</span>)}</div>
            </div>
          )}
          {item.links && item.links.length>0 && (
            <div style={{marginBottom:8}}>
              <div style={{fontWeight:600}}>Links</div>
              <ul>{item.links.map((l,idx)=> <li key={idx}><a href={l.href} target="_blank" rel="noreferrer">{l.label||l.href}</a></li>)}</ul>
            </div>
          )}
          {item.steps && item.steps.length>0 && (
            <div>
              <div style={{fontWeight:600}}>Steps</div>
              <ol style={{paddingLeft:18}}>{item.steps.map((s,i)=> <li key={i}>{s}</li>)}</ol>
            </div>
          )}
          {item.note && <div style={{color:'#b91c1c',marginTop:8}}>{item.note}</div>}
        </div>
      )}
    </div>
  );
}

export default function FAQ(){
  const [items, setItems] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(()=>{
    fetch('/data/faqs.json').then(r=>r.json()).then(j=> setItems(j.items || []));
  }, []);

  const filtered = items.filter(i=> {
    const q=query.toLowerCase();
    const hay=[i.title, ...(i.tags||[]), ...(i.steps||[])].join(' ').toLowerCase();
    return hay.includes(q);
  });

  return (
    <div className="page" style={{display:'grid', gap:16}}>
      <div className="page-title">FAQ</div>
      <div className="collapsible no-print">
        <div className="collapsible-header"><span>Search & Tags</span></div>
        <div className="collapsible-content">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search FAQs..." style={{width:'100%', maxWidth:420, border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 10px'}}/>
        </div>
      </div>
      <div style={{display:'grid', gap:12}}>
        {filtered.map(i => <FAQItem key={i.id} item={i} />)}
        {filtered.length===0 && <div style={{color:'#666'}}>No FAQs match your search.</div>}
      </div>
    </div>
  );
}
