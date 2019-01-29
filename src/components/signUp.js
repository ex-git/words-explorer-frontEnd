import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, startEndWithSpace} from './formValidation'
import formInput from './formInput'
import {withRouter} from 'react-router-dom'

import {USERS_ENDPOINT} from './config'

export class signUp extends React.Component {
    onSubmit(values) {
        return fetch(USERS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
                console.log(res)
                if(res.ok || res.status===422) {
                    return res.json()
                }
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            })
            .then(resJSON => {
                if(resJSON.status ===422) {
                    return Promise.reject(resJSON);
                }
                setTimeout(function(){
                    return this.props.history.push('/login')
                }.bind(this), 2000)
            })
            .catch(err => {
                // console.log(err)
                const {message} = err;
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            });
                
    }
    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    You have been successfully registered
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
            <section className='signUp'>
                <form onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <legend>Create your account</legend>
                    {successMessage}
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


signUp = withRouter(signUp)
export default reduxForm({
    form: 'Sign Up',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('Sign Up', Object.keys(errors)[0]))
})(signUp)
