import React from 'react'
import {connect} from 'react-redux'
import {submitAnswer} from '../actions'


export class liveGameForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        let score = this.props.game.questions[this.props.localCounter.currentQuestion].correctAnswer === this.answer.value ? 1: 0
        if(this.props.countDown>0) {
            this.props.dispatch(submitAnswer(score))
        }        
    }
    render() {
        if (this.props.game.answersReceived[this.props.localCounter.currentQuestion] && this.props.game.answersReceived[this.props.localCounter.currentQuestion].find(answer=>answer[this.props.userInfo.name])) {
            return <div>
                You answer has been submitted, waiting for other players to complete
            </div>
        }
        else {
            return <div className='liveGameAnswer'>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <label htmlFor="answer">A word start with "{this.props.game.questions[this.props.localCounter.currentQuestion].correctAnswer[0]}"</label>
                    <input id="answer" ref={input => this.answer = input}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        }
    }
}

const mapStateToProps = state => ({
    userInfo: state.wordsExplorerReducer.userInfo,
    game: state.wordsExplorerReducer.game,
    countDown: state.wordsExplorerReducer.countDown,
    localCounter: state.wordsExplorerReducer.localCounter
})

export default connect(mapStateToProps)(liveGameForm)

