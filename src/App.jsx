import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Offices from './pages/Offices.jsx'
import Protocols from './pages/Protocols.jsx'
import Departments from './pages/Departments.jsx'
import Events from './pages/Events.jsx'
import Contacts from './pages/Contacts.jsx'
import Advertising from './pages/Advertising.jsx'
import Vendors from './pages/Vendors.jsx'
import Tools from './pages/Tools.jsx'
import Calendars from './pages/Calendars.jsx'
import ITHelp from './pages/ITHelp.jsx'
import PhoneDirectory from './pages/PhoneDirectory.jsx'
import { Search } from 'lucide-react'

const NavItem = ({ to, label }) => (<NavLink to={to} className={({ isActive }) => `px-3 py-2 rounded-xl hover:bg-gray-100 ${isActive ? 'bg-gray-200' : ''}`}>{label}</NavLink>)

export default function App(){
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState(null)
  React.useEffect(()=>{
    async function loadAll(){
      const paths = ['/data/offices.json','/data/meetings.json','/data/protocols.json','/data/departments.json','/data/events.json','/data/contacts.json','/data/advertising.json','/data/vendors.json','/data/tools.json','/data/calendars.json','/data/ithelp.json','/data/phone.json']
      const all = await Promise.all(paths.map(p=>fetch(p).then(r=>r.json())))
      setData({offices:all[0], meetings:all[1], protocols:all[2], departments:all[3], events:all[4], contacts:all[5], advertising:all[6], vendors:all[7], tools:all[8], calendars:all[9], ithelp:all[10], phone:all[11]})
    }
    loadAll()
  },[])
  return (<div className='min-h-screen'>
    <header className='sticky top-0 z-10 bg-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center gap-4'>
        <div className='text-xl font-semibold'>PMG Ops Portal</div>
        <nav className='flex flex-wrap gap-2 text-sm'>
          <NavItem to='/' label='Dashboard'/>
          <NavItem to='/offices' label='Offices'/>
          <NavItem to='/protocols' label='Protocols'/>
          <NavItem to='/departments' label='Departments/Areas'/>
          <NavItem to='/events' label='Events'/>
          <NavItem to='/calendars' label='Calendars'/>
          <NavItem to='/advertising' label='Advertising'/>
          <NavItem to='/contacts' label='Contacts'/>
          <NavItem to='/vendors' label='Vendors'/>
          <NavItem to='/tools' label='Tools & Logins'/>
          <NavItem to='/it-help' label='IT Help'/>
          <NavItem to='/phone' label='Phone Directory'/>
        </nav>
        <div className='ml-auto relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 opacity-60'/>
          <input className='pl-8 pr-3 py-2 border rounded-xl bg-gray-50 focus:bg-white' placeholder='Search (name, place, topic)' value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
      </div>
    </header>
    <main className='max-w-6xl mx-auto px-4 py-6'>
      <Routes>
        <Route index element={<Dashboard data={data} query={query}/>}/>
        <Route path='/offices' element={<Offices data={data} query={query}/>}/>
        <Route path='/protocols' element={<Protocols data={data} query={query}/>}/>
        <Route path='/departments' element={<Departments data={data} query={query}/>}/>
        <Route path='/events' element={<Events data={data} query={query}/>}/>
        <Route path='/calendars' element={<Calendars data={data} query={query}/>}/>
        <Route path='/advertising' element={<Advertising data={data} query={query}/>}/>
        <Route path='/contacts' element={<Contacts data={data} query={query}/>}/>
        <Route path='/vendors' element={<Vendors data={data} query={query}/>}/>
        <Route path='/tools' element={<Tools data={data} query={query}/>}/>
        <Route path='/it-help' element={<ITHelp data={data} query={query}/>}/>
        <Route path='/phone' element={<PhoneDirectory data={data} query={query}/>}/>
      </Routes>
    </main>
    <footer className='border-t'><div className='max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500'>Internal use only</div></footer>
  </div>)
}