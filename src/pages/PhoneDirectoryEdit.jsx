import React from 'react'
export default function PhoneDirectoryEdit(){ 
  const [items,setItems]=React.useState([]); const [form,setForm]=React.useState({name:'',ext:'',location:'',dept:''})
  React.useEffect(()=>{ fetch('/data/phone.json').then(r=>r.json()).then(j=> setItems(j.items||[])) },[])
  const add=()=>{ if(!form.name||!form.ext) return alert('Name and Ext required'); setItems(prev=>[...prev,form]); setForm({name:'',ext:'',location:'',dept:''}) }
  const remove=(idx)=> setItems(prev=>prev.filter((_,i)=>i!==idx))
  const download=()=>{ const blob=new Blob([JSON.stringify({items},null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='phone.json'; a.click(); URL.revokeObjectURL(url) }
  return (<div><h1>Phone Directory Editor</h1>
    <div><input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/> <input placeholder='Ext' value={form.ext} onChange={e=>setForm({...form, ext:e.target.value})}/> <input placeholder='Location' value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/> <input placeholder='Dept' value={form.dept} onChange={e=>setForm({...form, dept:e.target.value})}/> <button onClick={add}>Add</button> <button onClick={download}>Download JSON</button></div>
    <table><thead><tr><th>Name</th><th>Ext</th><th>Location</th><th>Dept</th><th></th></tr></thead><tbody>{items.map((r,i)=>(<tr key={i}><td>{r.name}</td><td>{r.ext}</td><td>{r.location}</td><td>{r.dept}</td><td><button onClick={()=>remove(i)}>Remove</button></td></tr>))}</tbody></table>
  </div>) }