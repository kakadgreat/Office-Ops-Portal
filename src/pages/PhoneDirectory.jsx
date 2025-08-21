import React from 'react'
import Card from '../ui/Card.jsx'
function sortBy(col, asc){ return (a,b)=> (''+(a[col]??'')).localeCompare((''+(b[col]??'')), undefined, {numeric:true,sensitivity:'base'}) * (asc?1:-1) }
export default function PhoneDirectory({ data, query }){
  if(!data) return <div>Loading...</div>
  const [loc, setLoc] = React.useState('All')
  const [dept, setDept] = React.useState('All')
  const [sort, setSort] = React.useState({col:'name', asc:true})
  const all = data.phone.items || []
  const locations = ['All', ...Array.from(new Set(all.map(r=>r.location))).sort()]
  const depts = ['All', ...Array.from(new Set(all.map(r=>r.dept))).sort()]
  let items = all
  if(loc!=='All') items = items.filter(r=>r.location===loc)
  if(dept!=='All') items = items.filter(r=>r.dept===dept)
  const q = (query||'').toLowerCase()
  if(q) items = items.filter(r => [r.name, r.ext, r.location, r.dept].join(' ').toLowerCase().includes(q))
  items = [...items].sort(sortBy(sort.col, sort.asc))
  const Pill = ({value, current, onClick}) => <button onClick={()=>onClick(value)} className={`px-3 py-1 rounded-full border text-sm ${current===value?'bg-gray-200':'bg-white hover:bg-gray-100'}`}>{value}</button>
  const header = (label, col) => <th onClick={()=>setSort({col, asc: sort.col===col ? !sort.asc : true})} className='px-3 py-2 cursor-pointer text-left select-none'>{label}{sort.col===col ? (sort.asc ? ' ▲' : ' ▼') : ''}</th>
  return (<div className='space-y-4'><Card title='Filters'><div className='flex flex-wrap gap-2 items-center'><div className='font-semibold mr-2'>Location:</div>{locations.map(v=> <Pill key={v} value={v} current={loc} onClick={setLoc}/>)}</div><div className='flex flex-wrap gap-2 items-center mt-3'><div className='font-semibold mr-2'>Dept:</div>{depts.map(v=> <Pill key={v} value={v} current={dept} onClick={setDept}/>)}</div></Card><div className='overflow-auto rounded-xl border bg-white'><table className='w-full text-sm'><thead className='bg-gray-50 border-b'><tr>{header('Name','name')}{header('Ext','ext')}{header('Location','location')}{header('Dept','dept')}</tr></thead><tbody>{items.map((r,i)=>(<tr key={i} className='border-b last:border-0'><td className='px-3 py-2'>{r.name}</td><td className='px-3 py-2'>{r.ext}</td><td className='px-3 py-2'>{r.location}</td><td className='px-3 py-2'>{r.dept}</td></tr>))}</tbody></table></div></div>) }