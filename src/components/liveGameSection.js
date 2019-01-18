import React from 'react'
import {connect} from 'react-redux'
import LiveGameForm from './liveGameForm'
import {updateTimeOut, updateQuestionIndex, updateStatus, updateGame, updateCountdown} from '../actions'

export class liveGameSection extends React.Component {
    componentDidMount() {
        this.props.dispatch(updateCountdown(5))
        let time = setInterval(function(){
            if (this.props.countDown===0) {
                this.props.dispatch(updateTimeOut())
                clearInterval(time)
            }
            else {
                this.props.dispatch(updateCountdown(this.props.countDown-1))
            }
            console.log(this.props.game.answerReceived[this.props.game.currentQuestion])
            let allUsersSubmitted = this.props.game.answerReceived[this.props.game.currentQuestion] ? Object.keys(this.props.game.answerReceived[this.props.game.currentQuestion]).length === Object.keys(this.props.game.players).length : false
            console.log(allUsersSubmitted)
            if (this.props.game.timeOutUser === Object.keys(this.props.game.players).length || allUsersSubmitted) {
                clearInterval(time)
                this.props.dispatch(updateCountdown(3))
                this.props.dispatch(updateGame('pause'))
            }
        }.bind(this), 1000)
    }
    componentDidUpdate(prevProps) {
        if (this.props.game.currentQuestion !== prevProps.game.currentQuestion) {
            this.props.dispatch(updateCountdown(5))
        }
    }
    render() {
        let currentQuestion = this.props.game.questions[this.props.game.currentQuestion].question[0].replace(/{(.*?)}/g, '')
        return (
            <div>
                <section>
                    <h2>Question {this.props.game.currentQuestion+1}, Timeleft:{this.props.countDown}s</h2>
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
    game: state.game,
    countDown: state.countDown
})

export default connect(mapStateToProps)(liveGameSection)