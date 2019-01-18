import React from 'react'
import {connect} from 'react-redux'
import {updateTimeOut, updateQuestionIndex, updateGame, updateCountdown, calculateScore} from '../actions'

export class liveGameQuestionResult extends React.Component {
    componentDidMount() {
        let x = setInterval(function(){
            if (this.props.countDown > 0) {
                this.props.dispatch(updateCountdown(this.props.countDown-1))
            }
            else {
                this.props.dispatch(updateTimeOut(0))
                clearInterval(x)
            }
        }.bind(this), 1000)
        setTimeout(function(){
            if(this.props.game.currentQuestion === this.props.game.questions.length-1) {
                this.props.dispatch(calculateScore())
                this.props.dispatch(updateGame('completed'))
            }
            else {
                this.props.dispatch(updateQuestionIndex(this.props.game.currentQuestion+1))
                this.props.dispatch(updateGame('playing'))
            }
        }.bind(this),4000)
    }
    render () {
        let nextQuestion = this.props.game.currentQuestion === this.props.game.questions.length-1? `This is the last question, score is coming up in ${this.props.countDown}s` : `Next question coming up in ${this.props.countDown}s`
        return (
            <div>
                    <section>
                    <h2>Question {this.props.game.currentQuestion+1}</h2>
                    <div>
                        Correct answer is {this.props.game.questions[this.props.game.currentQuestion].correctAnswer}
                    </div>
                    <div>
                        {nextQuestion}
                    </div>
                </section>
            </div>
        )
    }
    
}


const mapStateToProps = state => ({
    user: state.user,
    game: state.game,
    countDown: state.countDown
})

export default connect(mapStateToProps)(liveGameQuestionResult)