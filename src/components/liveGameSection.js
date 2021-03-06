import React from 'react'
import {connect} from 'react-redux'
import LiveGameForm from './liveGameForm'
import {updateGame, updateCountdown} from '../actions'

export class liveGameSection extends React.Component {
    componentDidMount() {
        //provide 30 sec for each question
        this.props.dispatch(updateCountdown(30))
        this.timmer = setInterval(function(){
            if (this.props.countDown===0) {
                clearInterval(this.timmer)
                this.props.dispatch(updateGame('pause'))
               
            }
            else {
                this.props.dispatch(updateCountdown(this.props.countDown-1))
            }
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
                <section className='gaming'>
                    <h2>Question {this.props.localCounter.currentQuestion+1}, Timeleft: {this.props.countDown}s</h2>
                    <div className='question'>
                        Definition: {currentQuestion}
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