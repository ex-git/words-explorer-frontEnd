import React from 'react'
import {connect} from 'react-redux'
import LiveGameSection from './liveGameSection'
import LiveGameStart from './liveGameStart'
import LiveGameCompleted from './liveGameCompleted'
import LiveGameQuestionResult from './liveGameQuestionResult' 
import {GAMES_ENDPOINT} from './config'
import {fetchGame, joinNewGame, exitGame} from '../actions'
import {withRouter} from 'react-router-dom'
export class liveGame extends React.Component {
    componentWillMount(){
        fetch(GAMES_ENDPOINT+'/' + this.props.match.params.gameId)
        .then(res=>{
            if(res.ok) {
                return res.json()
            }
            return Promise.reject()
        })
        .then(resJSON=>{
            this.props.dispatch(fetchGame(resJSON))
        })
        .catch(err=>
            {alert('Unable to join this game')
            this.props.history.push('/')}
        )
    }
    componentDidMount(){
        this.fetchGame = setInterval(function(){
            if(this.props.game.gameStatus !== 'completed') {
                fetch(GAMES_ENDPOINT+'/' + this.props.match.params.gameId)
                .then(res=>{
                    if(res.ok) {
                        return res.json()
                    }
                    return Promise.reject()
                })
                .then(resJSON=>{
                    this.props.dispatch(fetchGame(resJSON))
                })
                .catch(err=>
                    {alert('Unable to join this game')
                    this.props.history.push('/')}
                )
            }
            else {
                clearInterval(this.fetchGame)
            }
        }.bind(this), 1000)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo.name !== this.props.userInfo.name) {
            // this.props.dispatch(exitGame(prevProps.userInfo.name))
            this.props.dispatch(joinNewGame(this.props.match.params.gameId))
        }
    }
    componentWillUnmount(){
        clearInterval(this.fetchGame)
        this.props.dispatch(exitGame(this.props.match.params.gameId))
    }

    render() {
            
        if (this.props.game.gameStatus==='open') {
            let players
            if (this.props.game.players.length>0) {
                players = (this.props.game.players).map((player,idx)=>
                <li key={idx}>{player}</li>
            )
            }
            return (
                <div>
                    <LiveGameStart />
                    <section>
                        <div>
                            <p>Total player <span>{this.props.game.players.length}</span></p>
                            <ul>
                                {players}
                            </ul>
                        </div>
                    </section>
                </div>
            )
        }
        else if (this.props.game.gameStatus==='pause') {
            return (
                <div>
                    <LiveGameQuestionResult />
                    <section>
                        <div>
                            <p>Total player <span>{Object.keys(this.props.game.players).length}</span></p>
                            <p>Submitted <span>{this.props.game.answersReceived[this.props.localCounter.currentQuestion]? this.props.game.answersReceived[this.props.localCounter.currentQuestion].length : 0}</span></p>
                        </div>
                    </section>
                </div>
            )
        }
        else if (this.props.game.gameStatus==='playing') {
            return (
                <div>
                    <LiveGameSection />
                    <section>
                        <div>
                            <p>Total player <span>{Object.keys(this.props.game.players).length}</span></p>
                            <p>Submitted <span>{(Object.keys(this.props.game.answersReceived).length>0 && this.props.game.answersReceived[this.props.localCounter.currentQuestion])? this.props.game.answersReceived[this.props.localCounter.currentQuestion].length : 0}</span></p>
                        </div>
                    </section>
                </div>
            )
        }
        else if (this.props.game.gameStatus==='completed') {
            setTimeout(function(){
                this.props.dispatch(exitGame())
            }.bind(this), 4000)
            return (
                <div>
                    <LiveGameCompleted />
                </div>
            )
        }
        else {
            return (
                'nothing'
            )
        }
        }
    }
    

const mapStateToProps = state => ({
    game: state.wordsExplorerReducer.game,
    localCounter: state.wordsExplorerReducer.localCounter,
    userInfo: state.wordsExplorerReducer.userInfo
})

export default withRouter(connect(mapStateToProps)(liveGame))