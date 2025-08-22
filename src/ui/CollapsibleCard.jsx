import React from 'react'
export default function CollapsibleCard({ title, defaultOpen=true, children }){
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className='bg-white rounded-2xl shadow-sm border'>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='text-sm font-semibold'>{title}</div>
        <button onClick={()=>setOpen(o=>!o)} className='text-xs border rounded px-2 py-1'>{open?'Collapse':'Expand'}</button>
      </div>
      {open && <div className='px-4 pb-4 text-sm'>{children}</div>}
    </div>
  )
}