import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty} from './formValidation'
import formInput from './formInput'
import {WORDS_ENDPOINT} from './config'
import {connect} from 'react-redux'
import {updateWordResult} from '../actions'
import WordResult from './wordResult'
import CreateGamePool from './createGamePool'
import './createGame.css'

export class createGame extends React.Component {

    onSubmit(values) {
        //get word definition from API
        return fetch(WORDS_ENDPOINT+"/"+values.word, {
            credentials: 'include',
            method: 'GET'
            })
            .then(res => {
                if (res.status!==200) {
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return res.json()
            })
            .then(resJSON => {
                if(resJSON.hasOwnProperty('result')) {
                    this.props.dispatch(updateWordResult(''))
                    throw Error(resJSON.message)
                }
                else if (resJSON.hasOwnProperty('similarWords')) {
                    const result = `Nothing found. Similar ${resJSON.similarWords.length>1 ? 'words' : 'word'}:
                    ${resJSON.similarWords.length>4 ? resJSON.similarWords.slice(0,4) : resJSON.similarWords}`
                    this.props.dispatch(updateWordResult(''))
                    throw Error(result)
                }
                else {
                    this.props.dispatch(updateWordResult(resJSON))
                    return values.word=''
                }
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
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }
        return (
            <section className='createGame'>
                <form onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {errorMessage}
                    <Field name="word"
                        type="text"
                        component={formInput}
                        label="Word"
                        validate={[required, nonEmpty]}
                    />
                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Get Definition
                    </button>
                </form>
                <div className='resultAndPool'>
                    <WordResult />
                    <CreateGamePool />   
                </div>  
            </section>
        )
    }
}

const mapStateToProps = state => ({
    wordResult: state.wordsExplorerReducer.wordResult,
    gamePool: state.wordsExplorerReducer.gamePool,
    userInfo: state.wordsExplorerReducer.userInfo
})

createGame = connect(mapStateToProps)(createGame)

export default reduxForm({
    form: 'createGame',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createGame', Object.keys(errors)[0]))
})(createGame)
