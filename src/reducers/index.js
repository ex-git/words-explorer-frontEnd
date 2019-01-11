import {UPDATE_TIMMER, UPDATE_QUESTION_INDEX, SUBMIT_ANSWER} from '../actions'

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
                correctAnswer: 'H'}
                ],
        currentQuestion:1,
        timeleft:5,
        answerReceived: [],
        players: [{Maxwell:2},{Maxwell2:2}]
    }
}

export const wordsExplorerReducer  = (state=initState, action) => {
    switch (action.type) {
        case UPDATE_TIMMER:
            const newGameTimeleft = Object.assign({}, state.game, {timeleft:action.timeleft})
            return Object.assign({}, state, {game:newGameTimeleft})
        case UPDATE_QUESTION_INDEX:
            const newGameQuestionsIndex = Object.assign({}, state.game, {currentQuestion: action.currentQuestion})
            return Object.assign({}, state, {game:newGameQuestionsIndex})
        case SUBMIT_ANSWER:
            let player = 'Maxwell'
            let time = new Date().getTime()
            //prevent double submit
            if(state.game.answerReceived.find(answer=>{
                return Object.keys(answer)[0]===player
            })) {
                return state
            }
            else {
                const newPlayersRecord = [...state.game.answerReceived, {[player]: {time: time, answer: action.answer}}]
                const newGameAnswerReceived = Object.assign({}, state.game, {answerReceived: newPlayersRecord})
                return Object.assign({}, state, {game:newGameAnswerReceived})
            }
        default:
        return state
    }

}