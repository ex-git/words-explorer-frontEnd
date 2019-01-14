import React from 'react'
import {connect} from 'react-redux'
import {updateTimmer, updateQuestionIndex, updateStatus} from '../actions'
import LiveGameForm from './liveGameForm'

export class liveGame extends React.Component {
    componentDidMount() {
        this.timmer()
        this.props.dispatch(updateStatus(`Correct answer is: ${this.props.game.questions[this.props.game.currentQuestion].correctAnswer}`))
    }
    componentDidUpdate(prevProps) {
        if (this.props.game.currentQuestion !== prevProps.game.currentQuestion) {
            this.timmer()
            this.props.dispatch(updateStatus(`Correct answer is: ${this.props.game.questions[this.props.game.currentQuestion].correctAnswer}`))
        }
    }

    updateCurrentQuestion() {
        if (this.props.game.currentQuestion < this.props.game.questions.length-1) {
            let newIndex = this.props.game.currentQuestion+1;
            setTimeout(function(){
                this.props.dispatch(updateTimmer(5))
                this.props.dispatch(updateQuestionIndex(newIndex))
            }.bind(this),2000)
        }
        else {
            console.log(this.props.game.currentQuestion)
            this.props.dispatch(updateStatus(`Correct answer is: ${this.props.game.questions[this.props.game.currentQuestion].correctAnswer}`))
        }
    }
    timmer() {
        if (this.props.game.timeleft >0) {
            let time = setInterval(function(){
                if(this.props.game.timeleft>0){
                    this.props.dispatch(updateTimmer(this.props.game.timeleft-1))
                    if (this.props.game.answerReceived[this.props.game.currentQuestion] && this.props.game.answerReceived[this.props.game.currentQuestion].length === this.props.game.players.length) {
                        clearInterval(time)
                        this.props.dispatch(updateTimmer('-'))
                        this.updateCurrentQuestion()
                    }
                }
                else if (this.props.game.timeleft===0){
                    clearInterval(time)
                    this.props.dispatch(updateTimmer('-'))
                    this.updateCurrentQuestion()
                }
            }.bind(this),1000)
        }
        else {
            console.log('no')
        }
    }
    render() {
        // this.timmer()
        // let totalQuestions = this.props.game.questions.length
        let currentQuestion = this.props.game.questions[this.props.game.currentQuestion].question[0].replace(/{(.*?)}/g, '')
        // let currentQuestion = this.props.game.questions[this.props.game.currentQuestion-1].question[Math.floor(Math.random()*totalQuestions)].replace(/{(.*?)}/g, '')
        return (
            <div>
                <section>
                    <h2>Test Your Vocabulary. question {this.props.game.currentQuestion+1}, Timeleft:{this.props.game.timeleft}s</h2>
                    <div>
                        Fill in the blanks to complete a word that refers: {currentQuestion}
                    </div>
                    <LiveGameForm />
                </section>
                <section>
                    <div>
                        <p>Total player <span>{this.props.game.players.length}</span></p>
                        <p>Submitted <span>{this.props.game.answerReceived[this.props.game.currentQuestion]? this.props.game.answerReceived[this.props.game.currentQuestion].length : 0}</span></p>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    game: state.game
})

export default connect(mapStateToProps)(liveGame)