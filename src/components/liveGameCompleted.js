import React from 'react'
import {connect} from 'react-redux'
import {exitGame} from '../actions'
import {withRouter} from 'react-router-dom'
export function liveGameCompleted(props) {
    let exit = (e) => {
        e.preventDefault()
        props.dispatch(exitGame(props.match.params.gameId))
        props.history.push('/')
    }
    return (
        <div>
                <section>
                    <h2>Score: {props.gameResult.totalScore} {props.gameResult.totalScore <2 ? 'point' : 'points'} + {props.gameResult.bonus} bonus {props.gameResult.totalScore <2 ? 'point' : 'points'}</h2>
                    <div>
                        <h3>Result Statistic</h3>
                        <p>Total {props.gameResult.totalQuestion} {props.gameResult.totalQuestion <2 ? 'question': 'questions'}</p>
                        <p>You answered {props.gameResult.totalAnswered} {props.gameResult.totalQuestion <2 ? 'question': 'questions'} and {props.gameResult.totalScore} {props.gameResult.totalScore <2 ? 'answer is' : 'answers are'} correct
                        <br></br>{props.gameResult.bonus} {props.gameResult.bonus <2 ? 'correct answer' : 'correct answeres'} submitted {props.gameResult.bonus <2 ? 'was' : 'were'} faster than all other players
                        <br></br>Your correct answer rate is {(props.gameResult.totalScore/props.gameResult.totalQuestion*100).toFixed(2)}%</p>
                    </div>
                    <div>
                        <button onClick={e=>exit(e)}>Exist</button>
                    </div>
                </section>
        </div>
    )
}


const mapStateToProps = state => ({
    userInfo: state.wordsExplorerReducer.userInfo,
    gameResult: state.wordsExplorerReducer.gameResult
})

export default withRouter(connect(mapStateToProps)(liveGameCompleted))