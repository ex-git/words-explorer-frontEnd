import React from 'react'
import {connect} from 'react-redux'
import {updateGame, exitGame} from '../actions'
import {Redirect} from 'react-router-dom'
export function liveGameCompleted(props) {
    let exit = (e) => {
        e.preventDefault()
        props.dispatch(exitGame())
        return <Redirect exact to="/" />
    }
    return (
        <div>
                <section>
                    <h2>Score: {props.game.players[props.user.name].totalScore} {props.game.players[props.user.name].totalScore <2 ? 'point' : 'points'} + {props.game.players[props.user.name].bonus} bonus {props.game.players[props.user.name].totalScore <2 ? 'point' : 'points'}</h2>
                    <div>
                        <h3>Result Statistic</h3>
                        <p>Total {props.game.questions.length} {props.game.questions.length <2 ? 'question': 'questions'}</p>
                        <p>You answered {props.game.players[props.user.name].totalAnswered} {props.game.questions.length <2 ? 'question': 'questions'} and {props.game.players[props.user.name].totalScore} {props.game.players[props.user.name].totalScore <2 ? 'answer is' : 'answers are'} correct
                        <br></br>{props.game.players[props.user.name].bonus} {props.game.players[props.user.name].bonus <2 ? 'correct answer' : 'correct answeres'} submitted {props.game.players[props.user.name].bonus <2 ? 'was' : 'were'} faster than all other players
                        <br></br>Your correct answer rate is {(props.game.players[props.user.name].totalScore/props.game.questions.length*100).toFixed(2)}%</p>
                    </div>
                    <div>
                        <button onClick={e=>exit(e)}>Exist</button>
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