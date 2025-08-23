import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Offices from './pages/Offices.jsx'
import Rolodex from './pages/Rolodex.jsx'
import Directory from './pages/Directory.jsx'
import Gallery from './pages/Gallery.jsx'
export default function App(){
  const loc = useLocation()
  const active = (p)=> 'pill'+(loc.pathname===p?' active':'')
  return (<div>
    <div className="nav"><div className="nav-inner container">
      <div className="brand">PMG Ops Portal</div>
      <Link className={active('/')} to="/">Dashboard</Link>
      <Link className={active('/locations')} to="/locations">Locations</Link>
      <Link className={active('/rolodex')} to="/rolodex">Facilities Rolodex</Link>
      <Link className={active('/directory')} to="/directory">Phone Directory</Link>
      <Link className={active('/gallery')} to="/gallery">Gallery</Link>
    </div></div>
    <div className="container">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/locations" element={<Offices/>} />
        <Route path="/rolodex" element={<Rolodex/>} />
        <Route path="/directory" element={<Directory/>} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </div>
  </div>)
}