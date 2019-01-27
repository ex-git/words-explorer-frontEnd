import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, startEndWithSpace} from './formValidation'
import formInput from './formInput'


import {USERS_ENDPOINT} from './config'

export class signUp extends React.Component {
    onSubmit(values) {
        return fetch(USERS_ENDPOINT, {
        // return fetch('//words-explorer-api.herokuapp.com/api/users', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (
                        res.headers.has('content-type') &&
                        res.headers
                            .get('content-type')
                            .startsWith('application/json')
                    ) {
                        // It's a nice JSON error returned by us, so decode it
                        return res.json().then(err => Promise.reject(err));
                    }
                    // It's a less informative error returned by express
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return;
            })
            //add redirect here
            .then(() => console.log('Submitted with values', values))
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
            <section>
                <form onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
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

export default reduxForm({
    form: 'Sign Up',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('Sign Up', Object.keys(errors)[0]))
})(signUp)
