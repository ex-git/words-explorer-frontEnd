import React from 'react'

export default function joinGame() {
  return (
    <section>
        <form>
            <legend>Join Game by ID</legend>
            <label htmlFor="gameID">Game ID</label>
            <input type="text" id="gameID" />
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" />
            <button>join game</button>
        </form>     
    </section>
  )
}
