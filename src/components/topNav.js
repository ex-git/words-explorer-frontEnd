import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export function topNav(props) {
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

const mapStateToProps = state => ({
  links: state.links
})

export default connect(mapStateToProps)(topNav)