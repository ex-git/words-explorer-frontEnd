import React from 'react'

export default function logIn() {
    return (
        <section>
            <form>
                <legend>Login</legend>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" />
                <label htmlFor="password">password</label>
                <input type="text" id="password" />
                <button>Log me In</button>
            </form>     
        </section>
    )
}
