import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Offices from './pages/Offices.jsx'
import Facilities from './pages/Facilities.jsx'
import PhoneDirectory from './pages/PhoneDirectory.jsx'
import PhoneDirectoryEdit from './pages/PhoneDirectoryEdit.jsx'
import FAQ from './pages/FAQ.jsx'
import Banner from './ui/Banner.jsx'

const NavItem=({to,label})=>(<NavLink to={to} className={({isActive})=>`px-3 py-2 rounded-xl hover:bg-gray-100 ${isActive?'bg-gray-200':''}`}>{label}</NavLink>)

export default function App(){
  const [data,setData]=React.useState(null)
  React.useEffect(()=>{(async()=>{
    const paths=['/data/offices.json','/data/phone.json','/data/facilities.json','/data/events.json','/data/links.json','/data/faqs.json']
    const all=await Promise.all(paths.map(p=>fetch(p).then(r=>r.json()).catch(()=>({}))))
    setData({offices:all[0], phone:all[1], facilities:all[2], events:all[3], ll:all[4], faqs:all[5]})
  })()},[])
  return (<div className='min-h-screen'>
    <Banner/>
    <header className='sticky top-0 z-10 bg-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-2 flex items-center gap-3'>
        <div className='text-lg sm:text-xl font-semibold'>PMG Ops Portal</div>
        <nav className='flex flex-wrap gap-2 text-sm'>
          <NavItem to='/' label='Dashboard'/>
          <NavItem to='/offices' label='Locations'/>
          <NavItem to='/facilities' label='Facilities Rolodex'/>
          <NavItem to='/phone' label='Phone Directory'/>
          <NavItem to='/faq' label='FAQ'/>
        </nav>
      </div>
    </header>
    <main className='max-w-6xl mx-auto px-4 py-4 sm:py-6'>
      <Routes>
        <Route index element={<Dashboard data={data}/>}/>
        <Route path='/offices' element={<Offices data={data}/>}/>
        <Route path='/facilities' element={<Facilities data={data}/>}/>
        <Route path='/phone' element={<PhoneDirectory data={data}/>}/>
        <Route path='/phone/edit' element={<PhoneDirectoryEdit/>}/>
        <Route path='/faq' element={<FAQ/>}/>
      </Routes>
    </main>
    <footer className='border-t'><div className='max-w-6xl mx-auto px-4 py-4 text-xs sm:text-sm text-gray-500'>PMG Ops Portal</div></footer>
  </div>)
}