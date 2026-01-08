import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header className="header">
        <NavLink to="/" className="h-10 w-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"><p className='blue-gradient_text'>HP</p></NavLink>

        <nav className="flex text-lg gap-7 font-medium">
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-blue-500': 'text-black'}><p>About</p></NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? 'text-blue-500': 'text-black'}><p>Projects</p></NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-blue-500': 'text-black'}><p>Contact</p></NavLink>
        </nav>

    </header>
  )
}


export default Navbar;