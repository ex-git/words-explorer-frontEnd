import React from 'react'
import {connect} from 'react-redux'
import {updateTimmer, updateQuestionIndex, submitAnswer} from '../actions'

export class liveGame extends React.Component {
    componentDidMount() {
        this.timmer()
    }
    componentDidUpdate(prevProps) {
        if (this.props.game.currentQuestion !== prevProps.game.currentQuestion) {
            this.timmer()
        }
    }

    updateCurrentQuestion() {
        if (this.props.game.currentQuestion < this.props.game.questions.length) {
            let newIndex = this.props.game.currentQuestion+1;
            this.props.dispatch(updateTimmer(5))
            this.props.dispatch(updateQuestionIndex(newIndex))
        }
        else {
            console.log('no more')
        }
    }
    timmer() {
        if (this.props.game.timeleft >0) {
            let time = setInterval(function(){
                if(this.props.game.timeleft>0){
                    this.props.dispatch(updateTimmer(this.props.game.timeleft-1))
                    if (this.props.game.answerReceived.length === this.props.game.players.length) {
                        clearInterval(time)
                        this.updateCurrentQuestion()
                    }
                }
                else if (this.props.game.timeleft===0){
                    clearInterval(time)
                    this.updateCurrentQuestion()
                }
            }.bind(this),1000)
        }
        else {
            console.log('no')
        }
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.props.game.timeleft>0) {
            this.props.dispatch(submitAnswer({answer: this.input.value}))
        }        
    }
    render() {
        // this.timmer()
        // let totalQuestions = this.props.game.questions.length
        let currentQuestion = this.props.game.questions[this.props.game.currentQuestion-1].question[0].replace(/{(.*?)}/g, '')
        // let currentQuestion = this.props.game.questions[this.props.game.currentQuestion-1].question[Math.floor(Math.random()*totalQuestions)].replace(/{(.*?)}/g, '')
        return (
            <div>
                <section>
                    <h2>Test Your Vocabulary. question {this.props.game.currentQuestion}, Timeleft:{this.props.game.timeleft}s</h2>
                    <div>
                        Fill in the blanks to complete a word that refers: {currentQuestion}
                    </div>
                    <div>
                        <form onSubmit={e=>this.onSubmit(e)}>
                            <label htmlFor="answer">A word start with "{this.props.game.questions[this.props.game.currentQuestion-1].correctAnswer[0]}"</label>
                            <input id="answer" ref={input => (this.input = input)}></input>
                            <button type="submit">Submit</button>
                        </form>
                    </div>  
                </section>
                <section>
                    <div>
                        <p>Total player <span>{this.props.game.players.length}</span></p>
                        <p>Submitted <span>{this.props.game.answerReceived.length}</span></p>
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