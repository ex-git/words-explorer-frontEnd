import React from 'react'
import './app.css'
import MainHeader from './mainHeader'
import MainPage from './mainPage'
import SignUp from './signUp'
import Login from './logIn'
import LiveGame from './liveGame'
import Profile from './userProfile'
import CreateGame from './createGame'

import {REFRESH_ENDPOINT} from './config'
import {authUser, updateLink} from '../actions'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

export class app extends React.Component {
    refreshJWT() {
        fetch(REFRESH_ENDPOINT, {
          credentials: 'include',
          method: 'GET'
        })
        .then(res => {
            console.log('iam on it')
            if (res.ok) {
              return res.json()
            }
            this.stopPeriodicRefresh();
            this.props.dispatch(authUser({}))
            this.props.dispatch(updateLink('unAuth'))
            this.props.history.push('/')
        })
        .then(resJSON=>{
          const user = {
            name: resJSON.validUser.userName,
            auth: 'yes',
            scores: resJSON.validUser.scores,
            id: resJSON.validUser['_id']
          }
          this.props.dispatch(authUser(user))
          return this.props.dispatch(updateLink('auth'))
        })
        .catch(() => {
          return null
        })
    }

    componentWillMount() {
        this.refreshJWT()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo.auth === undefined && this.props.userInfo.auth !== undefined && this.props.userInfo.auth==='yes') {
            // When we are logged in, refresh the auth token periodically
            console.log('updating')
            this.startPeriodicRefresh();
        }
        else if (prevProps.userInfo.auth !== undefined && prevProps.userInfo.auth === 'yes' && this.props.userInfo.auth === undefined) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }
    
    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }
    
    startPeriodicRefresh() {
        // 45 mins fresh JWT
        this.refreshInterval = setInterval(() => this.refreshJWT(),
         1 * 60 * 1000) 
    }
    
    stopPeriodicRefresh() {
        clearInterval(this.refreshInterval);
    }

    render(){
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
}

const mapStateToProps = state => ({
    userInfo: state.wordsExplorerReducer.userInfo,
})

export default connect(mapStateToProps)(app)