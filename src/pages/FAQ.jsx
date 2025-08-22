import React from 'react'
import CollapsibleCard from '../ui/CollapsibleCard.jsx'

const Anchor = ({id, children}) => <a href={`#${id}`} className='underline mr-3'>{children}</a>

export default function FAQ(){
  const [items,setItems]=React.useState([])
  React.useEffect(()=>{ fetch('/data/faqs.json').then(r=>r.json()).then(j=> setItems(j.items||[])) },[])

  const allTags = Array.from(new Set(items.flatMap(i=>i.tags||[]))).sort()

  return (<div className='space-y-4'>
    <div className='sticky-subnav bg-white border rounded-xl p-3 flex flex-wrap items-center gap-2'>
      <div className='font-semibold mr-2'>Jump to:</div>
      {items.map(i=> <Anchor key={i.id} id={i.id}>{i.title.split(' ')[0]}</Anchor>)}
      <div className='ml-auto hidden md:block'>
        <div className='font-semibold mb-1'>Tag cloud</div>
        <div className='tagcloud'>{allTags.map(t=> <a key={t} href={`#tag-${t}`} className='mr-2'>{t}</a>)}</div>
      </div>
    </div>

    <div className='grid md:grid-cols-2 gap-4'>
      {items.map(i=> (
        <CollapsibleCard key={i.id} title={i.title} defaultOpen={true}>
          <div id={i.id} className='space-y-3'>
            {i.links && i.links.length>0 && (
              <div>
                <div className='font-semibold mb-1'>Links</div>
                <ul className='list-disc ml-5'>
                  {i.links.map((l,idx)=>(<li key={idx}><a className='underline' href={l.url} target='_blank' rel='noreferrer'>{l.label}</a></li>))}
                </ul>
              </div>
            )}
            <div>
              <div className='font-semibold mb-1'>Steps</div>
              <div className='overflow-auto rounded-xl border bg-white table-zebra'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 border-b'>
                    <tr><th className='px-3 py-2 text-left'>#</th><th className='px-3 py-2 text-left'>Action</th></tr>
                  </thead>
                  <tbody>
                    {(i.steps||[]).map((s,idx)=>(<tr key={idx} className='border-b last:border-0'><td className='px-3 py-2'>{idx+1}</td><td className='px-3 py-2'>{s}</td></tr>))}
                  </tbody>
                </table>
              </div>
            </div>
            {i.note && <div className='text-sm text-red-700'>{i.note}</div>}
            {(i.tags||[]).length>0 && <div><div className='font-semibold mb-1'>Tags</div><div>{i.tags.map(t=> <span key={t} id={`tag-${t}`} className='tag'>{t}</span>)}</div></div>}
          </div>
        </CollapsibleCard>
      ))}
    </div>
  </div>)
}