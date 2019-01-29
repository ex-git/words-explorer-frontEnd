import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, startEndWithSpace} from './formValidation'
import formInput from './formInput'
import {USERS_ENDPOINT, GAMES_ENDPOINT} from './config'
import {connect} from 'react-redux'
import {updateUserGames, authUser, updateLink, logOut} from '../actions'
import {withRouter} from 'react-router-dom'
import './userProfile.css'

export class userProfile extends React.Component {
    onSubmit(values) {
        return fetch(USERS_ENDPOINT, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + document.cookie.split('=').slice(-1)[0]
                }
            })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return;
            })
            .catch(err => {
                const {message} = err;
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            });
                
    }
    fetchGamesByUser() {
        if(document.cookie.match(new RegExp('^authToken'))) {
            fetch(GAMES_ENDPOINT+'/user/'+this.props.userInfo.id, {
                credentials: 'include',
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + document.cookie.split('=').slice(-1)[0]
                }
            })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return res.json()
            })
            //add redirect here
            .then(resJSON => 
                this.props.dispatch(updateUserGames(resJSON)))
            .catch(() => {
                return null
            });
        }
        else {
            return this.props.history.push('/')
        }
    }
    componentDidMount() {
        this.fetchGamesByUser()
    }
    componentDidUpdate(preprops) {
        if(preprops.userInfo.auth !== this.props.userInfo.auth) {
            this.fetchGamesByUser()
        }
    }
    deleteAccount = ()=>{
        this.props.dispatch(logOut())
        if(document.cookie.length>0) {
            fetch(USERS_ENDPOINT+'/'+this.props.userInfo.id, {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + document.cookie.split('=').slice(-1)[0]
                }
            })
            .then(res => {
                if (!res.ok) {
                    alert('Something wrong, try again later')
                }
                this.props.dispatch(authUser({}))
                this.props.dispatch(updateLink('unAuth'))
                this.props.history.push('/')
                return null
            })
            .catch(() => {
                return null
            })
        }
        
    }

    handleDelete(e) {
        if(window.confirm('If you delete this game, it will be gone forever')) {
            let gameDatabaseId = e.target.dataset.value
            fetch(GAMES_ENDPOINT+'/'+gameDatabaseId, {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return this.fetchGamesByUser()
            })
            .catch(() => {
                return null
            })
        }
        
    }

    render() {
        let gamesByMe = this.props.userGames.map((game, idx)=>
            <li key={idx} data-value={game._id} className='remove'>
                Game ID: {game.gameId} - {game.questions.length>1 ? 'Words' : 'Word'}: {game.questions.map(question=>question.correctAnswer).join(', ')}
            </li>)
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Your profile has been successfully updated
                </div>
            );
        }
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }
        return (
            <div className='profile'>
                <section className='userProfile'>
                    <form onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <legend>Motify Your Account Info</legend>   
                        {successMessage}
                        {errorMessage}
                        <Field name="password"
                            type="password"
                            component={formInput}
                            label="Password"
                            validate={[required, nonEmpty, startEndWithSpace]}
                        />
                        <button
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Submit
                        </button>
                    </form>
                    <button className="deleteAccount" onClick={this.deleteAccount}>Delete My Account</button>
                </section>
            <section className='myGames'>
                <h2>Delete games under my account:</h2>
                <p className='message'>We do not allow to edit the game to keep each game as a unique story. However, you can delete it instead</p>
                <ul onClick={e=> this.handleDelete(e)}>
                    {gamesByMe.length> 0 ? gamesByMe : <li>You do not have any game yet!</li>}
                </ul>
            </section>
            </div>
          )
    }
}

const mapStateToProps = state => ({
  userInfo: state.wordsExplorerReducer.userInfo,
  userGames: state.wordsExplorerReducer.userGames
})

userProfile = withRouter(connect(mapStateToProps)(userProfile))

export default reduxForm({
    form: 'userProfile',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('userProfile', Object.keys(errors)[0]))
})(userProfile)
