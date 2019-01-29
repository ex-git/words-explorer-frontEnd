import React from 'react'

import {updateGamePool} from '../actions'
import {connect} from 'react-redux'

export class wordResult extends React.Component{
    addToGame =(e) => {
        e.preventDefault();
        if(this.props.wordResult.results !== undefined &&
            this.props.wordResult.results.length>0) {
                let questionsPool = {
                    correctAnswer: this.props.wordResult.word,
                    question: e.target.innerText
                }
                this.props.dispatch(updateGamePool(questionsPool))
        }
    }
    render() {
        if (this.props.wordResult.word) {
            //filter null result and map them
            const results = this.props.wordResult.results.filter(result=> result!==null).map((result, idx)=>{
                const resultDefinition = result.definitions ?
                    result.definitions.map((definition, idx)=>{
                        return <div key={idx}>
                            {idx}: <span className="add" onClick={e=>this.addToGame(e)}>{definition}</span>
                        </div>
                    }) : ''
                    if(resultDefinition.length===0) {
                        return <div key={idx}>
                                    <span className="mainWord">
                                        {this.props.wordResult.word} 
                                    </span>
                                    <span className="speech">
                                        {result.partsOfSpeech}
                                    </span>
                                </div>
                    }
                    else {
                        return <div key={idx}>
                                    <span className="mainWord">
                                        {this.props.wordResult.word}
                                    </span>
                                    <span className="speech">
                                        {result.partsOfSpeech}
                                    </span>
                                    <div>
                                        <span className="definition">Definition of {this.props.wordResult.word}</span>
                                        {resultDefinition}
                                    </div>
                                </div>
                    }
            })
            return (
                <div className="wordResult">
                    <h2>Definition</h2>
                    {results}
                </div>
            )
        }
        else {
            return <div className="wordResult">
                    <h2>Definition</h2>
                    Oops, no definition to show.
                </div>
        }
    }
    
    
}

const mapStateToProps = state => ({
    wordResult: state.wordsExplorerReducer.wordResult
})

export default connect(mapStateToProps)(wordResult)