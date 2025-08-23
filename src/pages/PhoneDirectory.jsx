import React from 'react'
const ORDER=['Providers','MA','Front Desk','Spa']
export default function PhoneDirectory(){
  const [items,setItems]=React.useState([]); const [q,setQ]=React.useState('')
  const [loc,setLoc]=React.useState(new Set()); const [dept,setDept]=React.useState(new Set())
  const [sort,setSort]=React.useState({col:null,asc:true})
  React.useEffect(()=>{ fetch('/data/phone.json').then(r=>r.json()).then(j=> setItems(j.items||[])) },[])
  const locations=Array.from(new Set(items.map(r=>r.location).filter(Boolean))).sort()
  const depts=Array.from(new Set(items.map(r=>r.dept).filter(Boolean))).sort((a,b)=> (ORDER.indexOf(a)>=0?ORDER.indexOf(a):99) - (ORDER.indexOf(b)>=0?ORDER.indexOf(b):99) || a.localeCompare(b))
  const toggle=(s,v)=>{const n=new Set(s); n.has(v)?n.delete(v):n.add(v); return n}
  let rows=items
  if(loc.size) rows=rows.filter(r=>loc.has(r.location))
  if(dept.size) rows=rows.filter(r=>dept.has(r.dept))
  if(q) rows=rows.filter(r=>(r.name+' '+r.ext+' '+r.location+' '+r.dept).toLowerCase().includes(q.toLowerCase()))
  rows=[...rows].sort((a,b)=> (ORDER.indexOf(a.dept)>=0?ORDER.indexOf(a.dept):99) - (ORDER.indexOf(b.dept)>=0?ORDER.indexOf(b.dept):99) || a.name.localeCompare(b.name))
  if(sort.col){ rows=rows.sort((a,b)=> (''+(a[sort.col]||'')).localeCompare((''+(b[sort.col]||''))) * (sort.asc?1:-1)) }
  const Header=({c,l})=>(<th onClick={()=>setSort({col:c,asc:sort.col===c?!sort.asc:true})} style={{cursor:'pointer',textAlign:'left',padding:'8px 12px'}}>{l}{sort.col===c?(sort.asc?' ▲':' ▼'):''}</th>)
  const Pill=({v,active,onClick})=>(<button className={'pill '+(active?'on':'')} onClick={onClick}>{v}</button>)
  return (<div style={{display:'grid',gap:16}}>
    <h1 className='only-print' style={{fontSize:20,fontWeight:700}}>PMG Phone Directory</h1>
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600}}>Filters</div>
      <div>Location: {locations.map(v=>(<Pill key={v} v={v} active={loc.has(v)} onClick={()=>setLoc(toggle(loc,v))}/>))}</div>
      <div>Dept: {depts.map(v=>(<Pill key={v} v={v} active={dept.has(v)} onClick={()=>setDept(toggle(dept,v))}/>))}</div>
      <input placeholder='Search name, ext, dept, location' value={q} onChange={e=>setQ(e.target.value)} style={{marginTop:8,width:'100%',padding:8,borderRadius:10,border:'1px solid #ddd'}}/>
    </div>
    <div className='no-print' style={{textAlign:'right'}}><button onClick={()=>window.print()}>Print / Export PDF</button></div>
    <div style={{overflow:'auto',background:'#fff',border:'1px solid #eee',borderRadius:12}}>
      <table style={{width:'100%',fontSize:14}} className='table-zebra'>
        <thead style={{background:'#f5f5f5',borderBottom:'1px solid #eee'}}><tr><Header c='name' l='Name'/><Header c='ext' l='Ext'/><Header c='location' l='Location'/><Header c='dept' l='Dept'/></tr></thead>
        <tbody>{rows.map((r,i)=>(<tr key={i}><td style={{padding:'8px 12px'}}>{r.name}</td><td style={{padding:'8px 12px'}}>{r.ext}</td><td style={{padding:'8px 12px'}}>{r.location}</td><td style={{padding:'8px 12px'}}>{r.dept}</td></tr>))}</tbody>
      </table>
    </div>
    <div className='no-print' style={{background:'#fff',border:'1px solid #eee',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600}}>Directory Editor</div>
      <a href='/data/phone.json' download>Download JSON</a>
    </div>
  </div>)
}