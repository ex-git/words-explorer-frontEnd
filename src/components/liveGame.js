import React from 'react'

export default class liveGame extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            questions: [{question: ['{bc}somewhat cold {bc}not warm',
                                    '{bc}not letting or keeping in heat ',
                                    '{bc}{sx|calm:3||2} ',
                                    '{bc}not interested or friendly{bc} '],
                        correctAnswer: 'cool'},
                        {question: 'E F G H pick one',
                        correctAnswer: 'H'}],
            questionIndex:0,
            time:30,
        }
    }
    updateCurrentQuestion() {
        if (this.state.questionIndex < this.state.questions.length-1) {
            setTimeout(function(){
                let newIndex = this.state.questionIndex+1;
                this.setState({questionIndex: newIndex})
                }.bind(this), 60000)
        }
        else {
            console.log('no more')
        }
    }
    timmer() {
        if (this.state.time>0) {
            setTimeout(function(){
                this.setState({time:this.state.time-1})
            }.bind(this),1000)
        }
    }
    render() {
    this.updateCurrentQuestion();
    this.timmer()
    let totalQuestions = this.state.questions.length
    let currentQuestion = this.state.questions[this.state.questionIndex].question[Math.floor(Math.random()*totalQuestions)].replace(/{(.*?)}/g, '')
    return (
        <div>
            <section>
                <h2>Test Your Vocabulary. question {this.state.questionIndex}, Timeleft:{this.state.time}s</h2>
                <div>
                    Fill in the blanks to complete a word that refers: {currentQuestion}
                </div>
                <div>
                    <form>
                        <label htmlFor="answer">A word start with "{this.state.questions[this.state.questionIndex].correctAnswer[0]}"</label>
                        <input id="answer"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>  
            </section>
            <section>
                <div>
                    <p>Total player <span>4</span></p>
                    <p>Submitted <span>2</span></p>
                </div>
            </section>
        </div>
    )
  }
}
