import React from 'react'
import {Link} from 'react-router-dom'

export default function openGame(props) {
    const openGames = props.games.map((game, idx)=>
        <li key={idx}>
            {game.id}
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
