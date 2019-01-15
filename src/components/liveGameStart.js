import React from 'react'
import {connect} from 'react-redux'
import {updateGame} from '../actions'
// import LiveGameForm from './liveGameForm'
 
export function liveGameStart(props) {
    return (
        <div>
                <section>
                    <h2>Total {props.game.questions.length+1} questions, any one can start the game once you have all your friends joined</h2>
                    <div>
                        <button onClick={e=>props.dispatch(updateGame('playing'))}>Start</button>
                    </div>
                </section>
        </div>
    )
}


const mapStateToProps = state => ({
    game: state.game
})

export default connect(mapStateToProps)(liveGameStart)