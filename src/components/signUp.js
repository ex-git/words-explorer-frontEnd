import React from 'react'

export default function signUp() {
    return (
        <section>
            <form>
                <legend>Register for more fun!</legend>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" />
                <label htmlFor="password">password</label>
                <input type="text" id="password" />
                <button>Create account</button>
            </form>     
        </section>
      )
}
