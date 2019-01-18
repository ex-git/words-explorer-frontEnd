import React from 'react'
import {connect} from 'react-redux'
import {joinNewGame} from '../actions'
import {withRouter} from 'react-router-dom'
export class joinGame extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        // return <Redirect to={`/game/${this.gameId.value}`} />
        this.props.dispatch(joinNewGame({
            gameId: this.gameId.value,
            name: this.userName.value
        }))
        this.props.history.push(`/game/${this.gameId.value}`)
    }
    render() {
        return (
            <section>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <legend>Join Game by ID</legend>
                    <label htmlFor="gameID">Game ID</label>
                    <input type="text" id="gameID" ref={input => (this.gameId = input)} />
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" ref={input => (this.userName = input)} />
                    <button>join game</button>
                </form>     
            </section>
        )
    }
}
export default withRouter(connect()(joinGame))
