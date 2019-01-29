import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, startEndWithSpace} from './formValidation'
import formInput from './formInput'
import {authUser, updateLink} from '../actions'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './logIn.css'
import {LOGIN_ENDPOINT} from './config'

export class logIn extends React.Component {
    onSubmit(values) {
        return fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
                if (!res.ok) {
                    this.props.dispatch(updateLink('unAuth'))
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return res.json();
            })
            //add redirect here
            .then(resJSON => {
                const user = {
                    name: resJSON.validUser.userName,
                    auth: 'yes',
                    scores: resJSON.validUser.scores,
                    id: resJSON.validUser['_id']
                }
                document.cookie = `authToken=${resJSON.authToken};max-age=600000;hostOnly="false"`
                this.props.dispatch(authUser(user))
                this.props.dispatch(updateLink('auth'))
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
    render() {
        if (this.props.userInfo.auth=== 'yes') {
            return <Redirect to="/" />
        }
        let errorMessage = (
            <div className="message">Tesing?  Use 'demo', and password 'demo'</div>
        );
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error === 'Unauthorized' ? 'Incorrect User Name or Password' : this.props.error}</div>
            );
        }
        return (
            <section className="logIn">
                <form onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <legend>Sign in to your account</legend>
                    {errorMessage}
                    <Field name="userName"
                        type="text"
                        component={formInput}
                        label="User Name"
                        validate={[required, nonEmpty, startEndWithSpace]}
                    />
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
            </section>
        )
    }
}

const mapStateToProps = state => ({
    userInfo : state.wordsExplorerReducer.userInfo
})

logIn = connect(mapStateToProps)(logIn)

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(logIn)