import React from 'react'
import {connect} from 'react-redux'
import LiveGameForm from './liveGameForm'
import {updateTimmer, updateQuestionIndex, updateStatus, updateGame, calculateScore} from '../actions'

export class liveGameSection extends React.Component {
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
            this.props.dispatch(updateStatus(`Correct answer is: ${this.props.game.questions[this.props.game.currentQuestion].correctAnswer}`))
        }
    }
    timmer() {
        if (this.props.game.timeleft >0) {
            let time = setInterval(function(){
                if(this.props.game.timeleft>0){
                    this.props.dispatch(updateTimmer(this.props.game.timeleft-1))
                    if (this.props.game.answerReceived[this.props.game.currentQuestion] && this.props.game.answerReceived[this.props.game.currentQuestion].length === Object.keys(this.props.game.players).length) {
                        clearInterval(time)
                        this.props.dispatch(updateTimmer('-'))
                        if(this.props.game.currentQuestion+1 !== this.props.game.questions.length){
                            this.updateCurrentQuestion()
                        }
                        else {
                            this.props.dispatch(calculateScore())
                            setTimeout(function(){
                                this.props.dispatch(updateGame('completed'))
                            }.bind(this),2000) 
                        }
                    }
                }
                else if (this.props.game.timeleft===0){
                    clearInterval(time)
                    this.props.dispatch(updateTimmer('-'))
                    if(this.props.game.currentQuestion+1 !== this.props.game.questions.length){
                        this.updateCurrentQuestion()
                    }
                    else {
                        this.props.dispatch(calculateScore())
                        setTimeout(function(){
                            this.props.dispatch(updateGame('completed'))
                        }.bind(this),2000)
                        
                    }
                }
            }.bind(this),1000)
        }
    }
    render() {
        let currentQuestion = this.props.game.questions[this.props.game.currentQuestion].question[0].replace(/{(.*?)}/g, '')
        return (
            <div>
                <section>
                    <h2>Question {this.props.game.currentQuestion+1}, Timeleft:{this.props.game.timeleft}s</h2>
                    <div>
                        Fill in the blanks to complete a word that refers: {currentQuestion}
                    </div>
                    <LiveGameForm />
                </section>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    game: state.game
})

export default connect(mapStateToProps)(liveGameSection)