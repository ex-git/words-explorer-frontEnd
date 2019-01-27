import React from 'react'
import TopNav from './topNav'
import {Link, withRouter} from 'react-router-dom'
import {connect } from 'react-redux';
import './mainHeader.css'

export function mainHeader(){
return (
    <header className="mainHead">
        <h1>
          <Link to='/'>Words Explorer</Link>
        </h1>
    <TopNav />
    </header>
)
}

const mapStateToProps = state => ({
  userInfo: state.wordsExplorerReducer.userInfo,
})
export default withRouter(connect(mapStateToProps)(mainHeader))
