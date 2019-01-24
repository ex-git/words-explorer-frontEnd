import React from 'react'
import {connect} from 'react-redux'
import {removeQuestion, updateWordResult, resetGamePool} from '../actions'
import {GAMES_ENDPOINT} from './config'
import './createGamePool.css'

export class createGamePool extends React.Component {
    handleRemove(e) {
        e.preventDefault()
        this.props.dispatch(removeQuestion(e.target.innerText))
    }
    createGame(e) {
        e.preventDefault()
        fetch(GAMES_ENDPOINT, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(this.props.gamePool),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return res.json();
        })
        //add redirect here
        .then(resJSON => {
            this.props.dispatch(updateWordResult(''))
            this.props.dispatch(resetGamePool())
            alert(`Game created, ID: ${resJSON.gameId}`)

        })
        .catch(err => {
            console.log(err.message)
        }); 
    }
    render(){
        if (Object.keys(this.props.gamePool).length>0) {
            let words = this.props.gamePool.map((word, idx)=>{
                return <li key={idx}>{word.correctAnswer}: <span className="remove" onClick={e=>this.handleRemove(e)}>{word.question}</span></li>
            })
            return (
                <div className="wordsPool">
                    <ul>
                        {words}
                    </ul>
                    <div>
                        <button onClick={e=>this.createGame(e)}>Create Game</button>
                    </div>
                </div>
            )
        }
        else {
            return ""
        }
    } 
}

const mapStateToProps = state => ({
    gamePool: state.wordsExplorerReducer.gamePool
})

export default connect(mapStateToProps)(createGamePool)