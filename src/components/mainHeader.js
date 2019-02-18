import React from 'react'
import TopNav from './topNav'
import {Link, withRouter} from 'react-router-dom'
import {connect } from 'react-redux';
import './mainHeader.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export function mainHeader(){
return (
    <header className="mainHead">
        <h1>
          <FontAwesomeIcon icon={faGraduationCap} /><Link to='/'>Words Explorer</Link>
        </h1>
    <TopNav />
    </header>
)
}

const mapStateToProps = state => ({
  userInfo: state.wordsExplorerReducer.userInfo,
})
export default withRouter(connect(mapStateToProps)(mainHeader))
