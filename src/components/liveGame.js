import React from 'react'
import {connect} from 'react-redux'
import LiveGameSection from './liveGameSection'
import LiveGameStart from './liveGameStart'
import LiveGameCompleted from './liveGameCompleted'
import LiveGameQuestionResult from './liveGameQuestionResult'

import {Redirect} from 'react-router-dom'

export function liveGame(props) {
    if (!(Object.keys(props.game.players).length)) {
        return <Redirect exact to="/" />
    }
    if (props.game.gameStatus==='open') {
        let players = Object.keys(props.game.players).map((player,idx)=>
            <li key={idx}>{player}</li>
        )
        return (
            <div>
                <LiveGameStart />
                <section>
                    <div>
                        <p>Total player <span>{Object.keys(props.game.players).length}</span></p>
                        <ul>
                            {players}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
    else if (props.game.gameStatus==='pause') {
        return (
            <div>
                <LiveGameQuestionResult />
                <section>
                    <div>
                        <p>Total player <span>{Object.keys(props.game.players).length}</span></p>
                        <p>Submitted <span>{props.game.answerReceived[props.game.currentQuestion]? props.game.answerReceived[props.game.currentQuestion].length : 0}</span></p>
                    </div>
                </section>
            </div>
        )
    }
    else if (props.game.gameStatus==='playing') {
        return (
            <div>
                <LiveGameSection />
                <section>
                    <div>
                        <p>Total player <span>{Object.keys(props.game.players).length}</span></p>
                        <p>Submitted <span>{props.game.answerReceived[props.game.currentQuestion]? props.game.answerReceived[props.game.currentQuestion].length : 0}</span></p>
                    </div>
                </section>
            </div>
        )
    }
    else if (props.game.gameStatus==='completed') {
        return (
            <div>
                <LiveGameCompleted />
            </div>
        )
    }
    else {
        console.log(props.game)
        return (
            'nothing'
        )
    }
    
}

const mapStateToProps = state => ({
    game: state.game,
    user: state.user
})

export default connect(mapStateToProps)(liveGame)