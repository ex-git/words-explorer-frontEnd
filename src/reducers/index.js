import {UPDATE_TIMMER, UPDATE_QUESTION_INDEX, SUBMIT_ANSWER, CALCULATE_SCORE, UPDATE_STATUS} from '../actions'

const initState = {
    availableGames: [
        {id:112233, status:"playing"},
        {id:990099, status:"open"}
    ],
    links: [
        {   
            name:"Login",
            url:"/login"
        }
    ],
    ranks: [
        {name: "Maxwell", score: 999},
        {name: "Lily", score: 354},
    ],
    game: {
        id: 33889,
        questions: [
                {question: ['{bc}somewhat cold {bc}not warm',
                            '{bc}not letting or keeping in heat ',
                            '{bc}{sx|calm:3||2} ',
                            '{bc}not interested or friendly{bc} '],
                correctAnswer: 'cool'},
                {question: 'E F G H pick one',
                correctAnswer: 'H'},
                {question: 'E F G H pick one',
                correctAnswer: 'H'}
                ],
        currentQuestion:0,
        timeleft:5,
        answerReceived: {},
        players: [{'maxwell':0}],
        score:[] ,
        status: 'aa'
    },
    user: "Maxwell"
}

export const wordsExplorerReducer  = (state=initState, action) => {
    switch (action.type) {
        case UPDATE_TIMMER:
            const newGameTimeleft = Object.assign({}, state.game, {timeleft:action.timeleft})
            return Object.assign({}, state, {game:newGameTimeleft})
        case CALCULATE_SCORE:
            for(let answer of state.game.answerReceived) {

            }


            const updatedScore = Object.assign({}, state.game, {score: state.game.answerReceived})
            return Object.assign({}, state, {game:newGameQuestionsIndex})
        case UPDATE_QUESTION_INDEX:
            const newGameQuestionsIndex = Object.assign({}, state.game, {currentQuestion: action.currentQuestion})
            return Object.assign({}, state, {game:newGameQuestionsIndex})
        case SUBMIT_ANSWER:
            //prevent double submit
            if(state.game.answerReceived[state.game.currentQuestion] && state.game.answerReceived[state.game.currentQuestion].find(answer=>Object.keys(answer)[0]===state.user)) {
                return state
            }
            else {
                let newAnswerReceived
                if (state.game.answerReceived[state.game.currentQuestion]) {
                    newAnswerReceived = Object.assign({}, state.game.answerReceived)
                    newAnswerReceived[state.game.currentQuestion]= [...newAnswerReceived[state.game.currentQuestion], {[state.user]: {time: state.game.timeleft, answer: action.answer}}]
                }
                else {
                    newAnswerReceived = Object.assign({}, state.game.answerReceived)
                    state.game.answerReceived[state.game.currentQuestion] = [{[state.user]: {time: state.game.timeleft, answer: action.answer}}]
                }
                // state.game.answerReceived[state.game.currentQuestion][state.user] = {[state.user]: {time: state.game.timeleft, answer: action.answer}}
                // newAnswerReceived.push({[state.user]: {time: state.game.timeleft, answer: action.answer}})
                const updatedAnswerReceived = Object.assign({}, state.game.answerReceived, newAnswerReceived)
                const newGameAnswerReceived = Object.assign({}, state.game, {answerReceived: updatedAnswerReceived})
                return Object.assign({}, state, {game:newGameAnswerReceived})
            }
        case UPDATE_STATUS:
            const newStatus = Object.assign({}, state.game, {status: action.status})
            return Object.assign({}, state, {game:newStatus})
        default:
        return state
    }
}