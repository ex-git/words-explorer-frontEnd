import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
export class joinGame extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`/game/${this.gameId.value}`)
    }
    render() {
        return (
            <section>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <legend>Join Game by ID</legend>
                    <label htmlFor="gameID">Game ID</label>
                    <input type="text" id="gameID" ref={input => (this.gameId = input)} />
                    <button>join game</button>
                </form>     
            </section>
        )
    }
}
export default withRouter(connect()(joinGame))
