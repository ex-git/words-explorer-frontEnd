import React from 'react'

import {Link} from 'react-router-dom'

export default function sections() {
    return (
        <section className="intro">
            <div className="introText">
                <p>
                Build robust vocabulary
                <br></br>
                Create game and play with friends
                <br></br>
                Join games and explorer
                </p>
                <Link to='/signup' className='signup'>
                    Sign Up
                </Link>
            </div>
        </section>
    )
}
