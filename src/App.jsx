import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Offices from './pages/Offices.jsx'
import Facilities from './pages/Facilities.jsx'
import PhoneDirectory from './pages/PhoneDirectory.jsx'
import PhoneDirectoryEdit from './pages/PhoneDirectoryEdit.jsx'
import FAQ from './pages/FAQ.jsx'
const NavItem=({to,label,extra=''})=>(<NavLink to={to} className='pill' style={{textDecoration:'none',marginRight:8,background:to==='/'?'#ecfdf5':'#fff'}}>{label}</NavLink>)
export default function App(){
  return (<div>
    <header style={{position:'sticky',top:0,background:'#fff',borderBottom:'1px solid #eee',padding:12,zIndex:5}}>
      <div style={{maxWidth:1000,margin:'0 auto',display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{fontWeight:700}}>PMG Ops Portal</div>
        <nav className='topnav' style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <NavItem to='/' label='Dashboard'/>
          <NavItem to='/offices' label='Locations'/>
          <NavItem to='/facilities' label='Facilities Rolodex'/>
          <NavItem to='/phone' label='Phone Directory'/>
          <NavItem to='/faq' label='FAQ'/>
        </nav>
      </div>
    </header>
    <main style={{maxWidth:1000,margin:'0 auto',padding:16}}>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path='/offices' element={<Offices/>}/>
        <Route path='/facilities' element={<Facilities/>}/>
        <Route path='/phone' element={<PhoneDirectory/>}/>
        <Route path='/phone/edit' element={<PhoneDirectoryEdit/>}/>
        <Route path='/faq' element={<FAQ/>}/>
      </Routes>
    </main>
  </div>)
}