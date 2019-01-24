import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, startEndWithSpace} from './formValidation'
import formInput from './formInput'
import {USERS_ENDPOINT} from './config'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

export class userProfile extends React.Component {
    onSubmit(values) {
        return fetch(USERS_ENDPOINT, {
                method: 'PUT',
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
        console.log(this.props.userInfo)
        if(this.props.userInfo.auth ===undefined || this.props.userInfo.auth === 'no') {
            return <Redirect exact to="/" />
        }
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
                        type="text"
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
  userInfo: state.wordsExplorerReducer.userInfo
})

userProfile = connect(mapStateToProps)(userProfile)

export default reduxForm({
    form: 'userProfile',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('userProfile', Object.keys(errors)[0]))
})(userProfile)
