import React from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Offices from './pages/Offices'
import Rolodex from './pages/Rolodex'
import Gallery from './pages/Gallery'
import Directory from './pages/Directory'
import FormFacility from './pages/forms/FormFacility'
import FormSupplies from './pages/forms/FormSupplies'
import FormTimeOff from './pages/forms/FormTimeOff'
import Thanks from './pages/forms/Thanks'

function Nav(){
  const location = useLocation()
  const active = (p)=> location.pathname===p ? 'nav-pill active' : 'nav-pill'
  return (
    <nav className="top">
      <span className="brand">PMG Ops Portal</span>
      <Link to="/" className={active('/')}>Dashboard</Link>
      <Link to="/locations" className={active('/locations')}>Locations</Link>
      <Link to="/rolodex" className={active('/rolodex')}>Facilities Rolodex</Link>
      <Link to="/gallery" className={active('/gallery')}>Gallery</Link>
      <Link to="/directory" className={active('/directory')}>Phone Directory</Link>
    </nav>
  )
}

export default function App(){
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/locations" element={<Offices/>} />
        <Route path="/rolodex" element={<Rolodex/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/directory" element={<Directory/>} />
        <Route path="/form/facility-issue" element={<FormFacility/>} />
        <Route path="/form/order-supplies" element={<FormSupplies/>} />
        <Route path="/form/time-off" element={<FormTimeOff/>} />
        <Route path="/thanks" element={<Thanks/>} />
      </Routes>
    </>
  )
}
