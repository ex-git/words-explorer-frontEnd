import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export function openGame(props) {
    const openGames = props.availableGames.map((game, idx)=>
        <li key={idx}>
            Game ID: {game.id}
            Status: {game.status}
            <Link to={`/game/${game.id}`}>join game</Link>
        </li>)
    return (
        <section>
        <h3>Opening game</h3>
            <ul>
                {openGames}
            </ul>
        </section>
  )
}
 const mapStateToProps = state => ({
    availableGames: state.availableGames
 })

 export default connect(mapStateToProps)(openGame)