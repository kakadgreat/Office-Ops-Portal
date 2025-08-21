import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Offices from './pages/Offices.jsx'
import Departments from './pages/Departments.jsx'
import Events from './pages/Events.jsx'
import ITHelp from './pages/ITHelp.jsx'
import PhoneDirectory from './pages/PhoneDirectory.jsx'
import PhoneDirectoryEdit from './pages/PhoneDirectoryEdit.jsx'
import { Search } from 'lucide-react'

const NavItem = ({ to, label }) => (<NavLink to={to} className={({ isActive }) => `px-3 py-2 rounded-xl hover:bg-gray-100 ${isActive ? 'bg-gray-200' : ''}`}>{label}</NavLink>)

export default function App(){
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState(null)
  React.useEffect(()=>{
    async function loadAll(){
      const paths = ['/data/offices.json','/data/meetings.json','/data/departments.json','/data/events.json','/data/ithelp.json','/data/phone.json','/data/highlights.json']
      const all = await Promise.all(paths.map(p=>fetch(p).then(r=>r.json().catch(()=>({})))))
      setData({offices:all[0], meetings:all[1], departments:all[2], events:all[3], ithelp:all[4], phone:all[5], highlights:all[6]})
    }
    loadAll()
  },[])
  return (<div className='min-h-screen'>
    <header className='sticky top-0 z-10 bg-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-2 flex items-center gap-3'>
        <div className='text-lg sm:text-xl font-semibold'>PMG Ops Portal</div>
        <nav className='flex flex-wrap gap-2 text-sm'>
          <NavItem to='/' label='Dashboard'/>
          <NavItem to='/offices' label='Locations'/>
          <NavItem to='/events' label='Events'/>
          <NavItem to='/departments' label='Departments'/>
          <NavItem to='/phone' label='Phone Directory'/>
          <NavItem to='/it-help' label='IT Help'/>
        </nav>
        <div className='ml-auto relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 opacity-60'/>
          <input className='pl-8 pr-3 py-2 border rounded-xl bg-gray-50 focus:bg-white text-sm' placeholder='Search (name, place, topic)' value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
      </div>
    </header>
    <main className='max-w-6xl mx-auto px-4 py-4 sm:py-6'>
      <Routes>
        <Route index element={<Dashboard data={data} query={query}/>}/>
        <Route path='/offices' element={<Offices data={data} query={query}/>}/>
        <Route path='/events' element={<Events data={data} query={query}/>}/>
        <Route path='/departments' element={<Departments data={data} query={query}/>}/>
        <Route path='/phone' element={<PhoneDirectory data={data} query={query}/>}/>
        <Route path='/phone/edit' element={<PhoneDirectoryEdit/>}/>
        <Route path='/it-help' element={<ITHelp data={data} query={query}/>}/>
      </Routes>
    </main>
    <footer className='border-t'><div className='max-w-6xl mx-auto px-4 py-4 text-xs sm:text-sm text-gray-500'>PMG Ops Portal</div></footer>
  </div>)
}