import React from 'react'

import IntroSection from './introSection'
import HowTo from './howTo'
import OpenGame from './openGame'
import Ranking from './ranking'
import JoinGame from './joinGame'
import {connect} from 'react-redux'

export function mainPage(props) {
  if(props.userInfo.auth !== undefined && props.userInfo.auth=== 'yes') {
    return <div className="mainPage"> 
            <HowTo />
            <JoinGame />
            <OpenGame />
            <Ranking />
          </div>
  }
  else {
    return (
      <div className="mainPage"> 
          <IntroSection />
          <HowTo />
          <Ranking />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.wordsExplorerReducer.userInfo
})

export default connect(mapStateToProps)(mainPage)