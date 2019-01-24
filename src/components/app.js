import React from 'react'
import './app.css'
import MainHeader from './mainHeader'
import MainPage from './mainPage'
import SignUp from './signUp'
import Login from './logIn'
import LiveGame from './liveGame'
import Profile from './userProfile'
import CreateGame from './createGame'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

export default function app() {
  return (
    <BrowserRouter>
        <div>
            <main role="main">
                <MainHeader />
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/logIn' component={Login} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/creategame' component={CreateGame} />
                    <Route exact path='/game/:gameId' component={LiveGame} />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
  )
}
