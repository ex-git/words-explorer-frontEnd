import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './joinGame.css'

export class joinGame extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        if(this.gameId.value.trim() !== '') {
            this.props.history.push(`/game/${this.gameId.value}`)
        }
        else {
            alert('No empty gameID')
        }
    }
    render() {
        return (
            <section className='joinGame'>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <label htmlFor="gameID">Join Game by Game ID</label>
                    <input type="text" id="gameID" ref={input => (this.gameId = input)} />
                    <button>join game</button>
                </form>     
            </section>
        )
    }
}
export default withRouter(connect()(joinGame))
