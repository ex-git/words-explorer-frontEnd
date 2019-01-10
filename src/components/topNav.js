import React from 'react'
import {Link} from 'react-router-dom'
export default function topNav(props) {
  const navItems = props.links.map((link, idx)=>
    <li key={idx}>
      <Link to={link.url}>
        {link.name}
      </Link>
    </li>
  )
  return (
    <nav role="navigation" className="mainNav">
      <ul>
        {navItems}
      </ul>
    </nav>
  )
}
