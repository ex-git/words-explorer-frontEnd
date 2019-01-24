import React from 'react'
import {connect} from 'react-redux'
import LiveGameForm from './liveGameForm'
import {updateTimeOut, updateGame, updateCountdown} from '../actions'

export class liveGameSection extends React.Component {
    componentDidMount() {
        this.props.dispatch(updateCountdown(10))
        this.timmer = setInterval(function(){
            if (this.props.countDown===0) {
                clearInterval(this.timmer)
                this.props.dispatch(updateGame('pause'))
               
            }
            else {
                this.props.dispatch(updateCountdown(this.props.countDown-1))
            }
            // console.log(this.props.game.answerReceived)
            let allUsersSubmitted = this.props.game.answersReceived[this.props.localCounter.currentQuestion] ? Object.keys(this.props.game.answersReceived[this.props.localCounter.currentQuestion]).length === Object.keys(this.props.game.players).length : false
            if (allUsersSubmitted) {
                clearInterval(this.timmer)
                this.props.dispatch(updateGame('pause'))
            }
        }.bind(this), 1000)
    }
    componentWillUnmount(){
        clearInterval(this.timmer)
    }
    render() {
        let currentQuestion = this.props.game.questions[this.props.localCounter.currentQuestion].question.replace(/{(.*?)}/g, '')
        return (
            <div>
                <section>
                    <h2>Question {this.props.localCounter.currentQuestion+1}, Timeleft:{this.props.countDown}s</h2>
                    <div>
                        Question: {currentQuestion}
                    </div>
                    <LiveGameForm />
                </section>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    game: state.wordsExplorerReducer.game,
    localCounter: state.wordsExplorerReducer.localCounter,
    countDown: state.wordsExplorerReducer.countDown
})

export default connect(mapStateToProps)(liveGameSection)