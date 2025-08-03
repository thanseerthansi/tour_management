import React from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '../constants/Path'

export default function Header() {
  return (
  
       <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={PATH.HOME} className="text-2xl font-bold">Tour_Web</Link>
        <nav>
          <ul className="flex space-x-6">
            {/* <li><Link to={PATH.HOME} className="hover:text-blue-200 ">Home</Link></li>
            <li><Link to="/packages" className="hover:text-blue-200">Packages</Link></li>
            <li><Link to="/contact" className="hover:text-blue-200">Contact</Link></li> */}
          </ul>
        </nav>
      </div>
    </header>
   
  )
}
