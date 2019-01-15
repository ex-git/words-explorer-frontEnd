import React from 'react'
import {connect} from 'react-redux'
import {submitAnswer, updateStatus} from '../actions'

export class liveGameForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        let score = this.props.game.questions[this.props.game.currentQuestion].correctAnswer === this.input.value ? 1: 0
        if(this.props.game.timeleft>0) {this.props.dispatch(submitAnswer(score))
        }        
    }
    render () {
        if(this.props.game.timeleft=== '-') {
            return <div>
                {this.props.game.status}
            </div>
        }
        else if (this.props.game.answerReceived[this.props.game.currentQuestion] && this.props.game.answerReceived[this.props.game.currentQuestion].find(answer=>answer[this.props.user])) {
            return <div>
                `You answer has been submitted, waiting for other players to complete`
            </div>
        }
        else {
            return <div>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <label htmlFor="answer">A word start with "{this.props.game.questions[this.props.game.currentQuestion].correctAnswer[0]}"</label>
                    <input id="answer" ref={input => (this.input = input)}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        }
    }
}

const mapStateToProps = state => ({
    user: state.user,
    game: state.game
})

export default connect(mapStateToProps)(liveGameForm)

