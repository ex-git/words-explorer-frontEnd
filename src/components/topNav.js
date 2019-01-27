import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut, updateLink, authUser} from '../actions'
import './topNav.css'

export function topNav(props) {
  const navItems = props.links.filter(link=> link.status === 1).map((link, idx)=>
    {if(link.url=== '/logout') {
      return (<li key={idx} onClick={e=> {
          props.dispatch(logOut())
          props.dispatch(authUser({}))
          props.dispatch(updateLink('unAuth'))
          return props.history.push('/')}
      }>
            
              <Link to={link.url}>
                {link.name}
              </Link>
            </li>)
    }
    else {
      return (<li key={idx}>
      <Link to={link.url}>
        {link.name}
      </Link>
    </li>)
    }}
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
  links: state.wordsExplorerReducer.links
})

export default withRouter(connect(mapStateToProps)(topNav))