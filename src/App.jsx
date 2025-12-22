import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About , Projects, Contact, Home } from './pages'
import { Navbar } from './components/Navbar'
// import { Project } from './Pages/Projects'
// import { Contact } from './Pages/Contact'
// import { Home } from './Pages/Home'

export const App = () => {
  return (
 <main className='bg-slate-300/20'>
    <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </Router>
 </main>
  )
}
