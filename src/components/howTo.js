import React from 'react'
import {Link} from 'react-router-dom'
import './howTo.css'
import {connect} from 'react-redux'

export function howTo(props) {
    //if not logged in, show signup page, otherwise, show create game page
    if(props.userInfo.auth && props.userInfo.auth ==='yes') {
        return (
            <section className='howTo'>
                <p>
                    Create new game with the words you like to explorer.
                    <br></br>
                    Compete with your friends and be one of the top words explorer!
                </p>
                <Link to='/createGame'>
                    Get Started
                </Link>
            </section>
          )
    }
    else {
        return (
            <section className='howTo'>
                <p>
                    You can join a game or create an account and build the game yourself.
                    <br></br>
                    Game ID is the unique and it is used to join game
                    <br></br>
                    Compete with your friends and be one of the top words explorer!
                </p>
                <Link to='/signup'>
                    Get Started
                </Link>
            </section>
          )
    }
  
}

const mapStateToProps = state => ({
    userInfo: state.wordsExplorerReducer.userInfo
})

export default connect(mapStateToProps)(howTo)