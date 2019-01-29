import React from 'react'
import {connect} from 'react-redux'
import LiveGameSection from './liveGameSection'
import LiveGameStart from './liveGameStart'
import LiveGameCompleted from './liveGameCompleted'
import LiveGameQuestionResult from './liveGameQuestionResult' 
import {GAMES_ENDPOINT} from './config'
import {fetchGame, exitGame, quitGame, updateQuestionIndex, authUser, updateLink} from '../actions'
import {withRouter} from 'react-router-dom'
import './liveGame.css'

export class liveGame extends React.Component {
    checkGameStatus() {
        fetch(GAMES_ENDPOINT+'/' + this.props.match.params.gameId, {
            credentials: 'include',
            method: 'GET'
          })
        .then(res=>{
            if(res.ok) {
                return res.json()
            }
            else if(res.status===401) {
                this.props.dispatch(authUser({}))
                this.props.dispatch(updateLink('unAuth'))
                alert('You got kicked out due to authentication error')
                return this.props.history.push('/')
            }
        })
        .then(resJSON=> this.props.dispatch(fetchGame(resJSON)))
        .catch(err=>
            this.props.history.push('/')
        )
    }

    joinGame() {
        fetch(GAMES_ENDPOINT+'/'+this.props.match.params.gameId, {
            credentials: 'include',
            method: "PUT",
            body: JSON.stringify({join:'yes'}),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(res=> {
            if (res.ok) {
                return res.json()
            }
            else if(res.status===401) {
                this.props.dispatch(authUser({}))
                this.props.dispatch(updateLink('unAuth'))
                alert('You got kicked out due to authentication error')
                return this.props.history.push('/')
            }
            else if(res.status===500) {
                alert("We can't find this game")
                return this.props.history.push('/')
            }
        })
        .then(resJSON=> {
            if(resJSON.players !== undefined && !resJSON.players.includes(this.props.userInfo.name) && resJSON.gameStatus !== 'open') {
                clearInterval(this.fetchGame)
                this.props.history.push('/')
                alert('Game is currently playing by other players, try again later')
            } 
            else {
                this.props.dispatch(fetchGame(resJSON))
            }
        })
        .catch(
            ()=>null                
        )
    }
    componentWillMount(){

        //if logged in, send user name to API to join game. Reset question index to 0
        if(this.props.userInfo.name !== undefined && this.props.userInfo.auth==='yes') {
            this.joinGame()
            return this.props.dispatch(updateQuestionIndex(0))
        }
        else {
            //any error or user refresh tab, kick out player to make sure other players have the same timmer
            alert('Oops, you got kicked out.')
            this.props.dispatch(authUser({}))
            this.props.dispatch(updateLink('unAuth'))
            return this.props.history.push('/')
        }
        
    }

    componentDidUpdate(prevProps) {
        //try to log user in to the game
        if (prevProps.game.players !==undefined && !prevProps.game.players.includes(this.props.userInfo.name) && this.props.game.players !==undefined && !this.props.game.players.includes(this.props.userInfo.name)) {
            clearInterval(this.fetchGame)
            return this.joinGame()
        }
        else if(prevProps.game.players !==undefined && !prevProps.game.players.includes(this.props.userInfo.name) && this.props.game.players !==undefined  && this.props.game.players.includes(this.props.userInfo.name)) {
            setTimeout(function(){
                this.fetchGame = setInterval(function(){
                    if(this.props.game.gameStatus !== 'completed') {
                        return this.checkGameStatus()
                    }
                    else {
                        clearInterval(this.fetchGame)
                    }
                }.bind(this), 1000)
            }.bind(this), 1000)
        }
    }
    componentWillUnmount(){
        //clear timmer before existing game
        clearInterval(this.fetchGame)
        this.props.dispatch(quitGame(this.props.match.params.gameId))
    }

    render() {
        if (this.props.game && Object.keys(this.props.game).length>0 && this.props.game.gameStatus==='open') {
            let players
            if (this.props.game.players.length>0) {
                players = (this.props.game.players).map((player,idx)=>
                <li key={idx}>{player}</li>
            )
            }
            return (
                <div className='liveGame'>
                    <LiveGameStart />
                    <section className='playerStatus'>
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
        else if (this.props.game && Object.keys(this.props.game).length>0 && this.props.game.gameStatus==='pause') {
            return (
                <div className='liveGame'>
                    <LiveGameQuestionResult />
                    <section className='playerStatus'>
                        <div>
                            <p>Total player <span>{Object.keys(this.props.game.players).length}</span></p>
                            <p>Submitted <span>{this.props.game.answersReceived[this.props.localCounter.currentQuestion]? this.props.game.answersReceived[this.props.localCounter.currentQuestion].length : 0}</span></p>
                        </div>
                    </section>
                </div>
            )
        }
        else if (this.props.game && Object.keys(this.props.game).length>0 && this.props.game.gameStatus==='playing') {
            return (
                <div className='liveGame'>
                    <LiveGameSection />
                    <section className='playerStatus'>
                        <div>
                            <p>Total player <span>{Object.keys(this.props.game.players).length}</span></p>
                            <p>Submitted <span>{(Object.keys(this.props.game.answersReceived).length>0 && this.props.game.answersReceived[this.props.localCounter.currentQuestion])? this.props.game.answersReceived[this.props.localCounter.currentQuestion].length : 0}</span></p>
                        </div>
                    </section>
                </div>
            )
        }
        else if (this.props.game && Object.keys(this.props.game).length>0 && this.props.game.gameStatus==='completed') {
            setTimeout(function(){
                this.props.dispatch(exitGame(this.props.match.params.gameId))
            }.bind(this), 5000)
            return (
                <div className='liveGame'>
                    <LiveGameCompleted />
                </div>
            )
        }
        else {
            return (
                <div className='liveGame'>
                </div>
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