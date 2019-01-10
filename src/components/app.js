import React from 'react'
import './app.css'
import Header from './header'
import MainPage from './mainPage'
import SignUp from './signUp'
import Login from './logIn'
import LiveGame from './liveGame'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

export default function app() {
  return (
    <BrowserRouter>
        <div>
            <main role="main">
                <Header />
                <Switch>
                    <Redirect exact from='/' to='/main' />
                    <Route exact path='/main' component={MainPage} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/logIn' component={Login} />
                    <Route exact path='/game/:gameId' component={LiveGame} />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
  )
}
