import React from 'react'
import {connect} from 'react-redux'
import {updateGame} from '../actions'
// import LiveGameForm from './liveGameForm'


export function liveGameCompleted(props) {
    return (
        <div>
                <section>
                    <h2>Score: {props.game.players[props.user].totalScore} {props.game.players[props.user].totalScore <2 ? 'point' : 'points'} + {props.game.players[props.user].bonus} bonus {props.game.players[props.user].totalScore <2 ? 'point' : 'points'}</h2>
                    <div>
                        <h3>Result Statistic</h3>
                        <p>Total {props.game.questions.length} {props.game.questions.length <2 ? 'question': 'questions'}</p>
                        <p>You answered {props.game.players[props.user].totalAnswered} {props.game.questions.length <2 ? 'question': 'questions'} and {props.game.players[props.user].totalScore} {props.game.players[props.user].totalScore <2 ? 'answer is' : 'answers are'} correct
                        <br></br>{props.game.players[props.user].bonus} {props.game.players[props.user].bonus <2 ? 'correct answer' : 'correct answeres'} submitted faster than all other players
                        <br></br>Your correct answer rate is {(props.game.players[props.user].totalScore/props.game.questions.length*100).toFixed(2)}%</p>
                    </div>
                    <div>
                        <button>Exist</button>
                    </div>
                </section>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.user,
    game: state.game
})

export default connect(mapStateToProps)(liveGameCompleted)