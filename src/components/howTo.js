import React from 'react'
import {Link} from 'react-router-dom'

export default function howTo() {
  return (
    <section>
        <p>
            You can join a game that a user created or create an account and build the game yourself.
            <br></br>
            Game ID is the unique and it is used to join game
            <br></br>
            Only user with account will show in the ranking list
        </p>
        <Link to='/signup'>
            Sign Up
        </Link>
    </section>
  )
}
