import React from 'react'
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
import './app.css'
import './mobile.css'
export class app extends React.Component {
    refreshJWT() {
        fetch(REFRESH_ENDPOINT, {
          credentials: 'include',
          method: 'GET'
        })
        .then(res => {
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
          document.cookie = `authToken=${resJSON.authToken};max-age=600000;HttpOnly`
          this.props.dispatch(authUser(user))
          return this.props.dispatch(updateLink('auth'))
        })
        .catch(() => {
          return null
        })
    }

    componentWillMount() {
        //refresh JWT at the begining
        this.refreshJWT()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo.auth === undefined && this.props.userInfo.auth !== undefined && this.props.userInfo.auth==='yes') {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        }
        else if (prevProps.userInfo.auth !== undefined && prevProps.userInfo.auth === 'yes' && this.props.userInfo.auth === undefined) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }
    
    componentWillUnmount() {
        //stop JWT refresh timmer if leaving the page
        this.stopPeriodicRefresh();
    }
    
    startPeriodicRefresh() {
        // 45 mins fresh JWT period, cookie and JWT was set to expire after 60 mins
        this.refreshInterval = setInterval(() => this.refreshJWT(),
         45 * 60 * 1000) 
    }
    
    stopPeriodicRefresh() {
        clearInterval(this.refreshInterval);
    }

    render(){
        return (
            <BrowserRouter>
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
            </BrowserRouter>
          )
    }
}

const mapStateToProps = state => ({
    userInfo: state.wordsExplorerReducer.userInfo,
})

export default connect(mapStateToProps)(app)