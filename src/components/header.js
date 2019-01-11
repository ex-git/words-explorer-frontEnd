import React from 'react'
import TopNav from './topNav'
import {Link} from 'react-router-dom'

export default function header() {
  return (
    <header className="mainHead">
        <h1>
            <Link to='/'>Words Explorer</Link>
        </h1>
        <TopNav />
    </header>
  )
}

