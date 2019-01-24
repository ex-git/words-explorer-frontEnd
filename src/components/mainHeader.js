import React from 'react'
import TopNav from './topNav'
import {Link} from 'react-router-dom'

import {REFRESH_ENDPOINT} from './config'
import {authUser, updateLink} from '../actions'
import {connect } from 'react-redux';
export class mainHeader extends React.Component {
  componentWillMount() {
    fetch(REFRESH_ENDPOINT, {
        credentials: 'include',
        method: 'GET'
    })
    .then(res => {
        if (res.ok) {
          return res.json()
        }
        this.props.dispatch(authUser({}))
        this.props.dispatch(updateLink('unAuth'))
    })
    .then(resJSON=>{
      const user = {
        name: resJSON.validUser.userName,
        auth: 'yes'
      }
      this.props.dispatch(authUser(user))
      this.props.dispatch(updateLink('auth'))
    })
    .catch(err => 
        console.log(err)
    )
}
  render() {
    return (
      <header className="mainHead">
          <h1>
              <Link to='/'>Words Explorer</Link>
          </h1>
          <TopNav />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.wordsExplorerReducer.userInfo,
})
export default connect(mapStateToProps)(mainHeader)
