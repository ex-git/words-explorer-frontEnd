import React from 'react'
import {connect} from 'react-redux'
import {updateTimeOut, updateQuestionIndex, updateGame, updateCountdown, calculateScore} from '../actions'

export class liveGameQuestionResult extends React.Component {
    componentDidMount() {
        this.props.dispatch(updateCountdown(3))
        this.timmer = setInterval(function(){
            if (this.props.countDown > 0) {
                this.props.dispatch(updateCountdown(this.props.countDown-1))
            }
            else {
                clearInterval(this.timmer)
                this.props.dispatch(updateTimeOut(0))
            }
        }.bind(this), 1000)
        setTimeout(function(){
            if(this.props.localCounter.currentQuestion === this.props.game.questions.length-1) {
                this.props.dispatch(calculateScore())
                this.props.dispatch(updateGame('completed'))
            }
            else {
                this.props.dispatch(updateGame('playing'))
                this.props.dispatch(updateQuestionIndex(this.props.localCounter.currentQuestion+1))
            }
        }.bind(this),4000)
    }
    componentWillUnmount(){
        clearInterval(this.timmer)
    }
    render () {
        let nextQuestion = this.props.localCounter.currentQuestion === this.props.game.questions.length-1? `This is the last question, score is coming up in ${this.props.countDown}s` : `Next question coming up in ${this.props.countDown}s`
        return (
            <div>
                    <section>
                    <h2>Question {this.props.localCounter.currentQuestion+1}</h2>
                    <div>
                        Correct answer is {this.props.game.questions[this.props.localCounter.currentQuestion].correctAnswer}
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
    game: state.wordsExplorerReducer.game,
    countDown: state.wordsExplorerReducer.countDown,
    localCounter: state.wordsExplorerReducer.localCounter
})

export default connect(mapStateToProps)(liveGameQuestionResult)