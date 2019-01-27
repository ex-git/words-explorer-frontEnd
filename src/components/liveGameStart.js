import React from 'react'
import {connect} from 'react-redux'
import {updateGame} from '../actions'
 
export function liveGameStart(props) {
    return (
        <div>
                <section>
                    <h2>Total {props.game.questions.length} questions, any one can start the game once you have all your friends joined</h2>
                    <div>
                        {props.game.players.includes(props.userInfo.name) ? <button onClick={e=>props.dispatch(updateGame('playing'))}>Start</button> : <button disabled>Waiting For Server</button>}
                    </div>
                </section>
        </div>
    )
}


const mapStateToProps = state => ({
    game: state.wordsExplorerReducer.game,
    userInfo: state.wordsExplorerReducer.userInfo
})

export default connect(mapStateToProps)(liveGameStart)