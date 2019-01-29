import React from 'react'
import {connect} from 'react-redux'
import {updateGame} from '../actions'
 
export function liveGameStart(props) {
    return (
        <section className='preGame'>
            <h2>Total {props.game.questions.length} questions, any one can start the game once all ready!</h2>
            <p>Do not refresh browser or you will be kicked out by the server</p>
            <div>
                {props.game.players.includes(props.userInfo.name) ? <button onClick={e=>props.dispatch(updateGame('playing'))}>Start</button> : <button disabled>Waiting For Server</button>}
            </div>
        </section>
    )
}


const mapStateToProps = state => ({
    game: state.wordsExplorerReducer.game,
    userInfo: state.wordsExplorerReducer.userInfo
})

export default connect(mapStateToProps)(liveGameStart)