import {UPDATE_TIMMER, UPDATE_QUESTION_INDEX, SUBMIT_ANSWER, CALCULATE_SCORE, UPDATE_STATUS, UPDATE_GAME} from '../actions'

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
        gameStatus: 'open',
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
        players: {'maxwell':{onlineStatus:'yes',totalScore:0, totalAnswered:0, bonus:0}},
        status: ''
    },
    user: "maxwell"
}

export const wordsExplorerReducer  = (state=initState, action) => {
    switch (action.type) {
        case UPDATE_GAME:
            const newGameStatus = Object.assign({}, state.game, {gameStatus:action.gameStatus})
            return Object.assign({}, state, {game:newGameStatus})
        case UPDATE_TIMMER:
            const newGameTimeleft = Object.assign({}, state.game, {timeleft:action.timeleft})
            return Object.assign({}, state, {game:newGameTimeleft})
        case CALCULATE_SCORE:
            let newPlayersWithScore = Object.assign({}, state.game.players)
            for (let idx of Object.keys(state.game.answerReceived)) {
                for (let nameOfPlayer of Object.keys(state.game.players)) {
                    if (state.game.answerReceived[idx].find(answer=>Object.keys(answer)[0]=== nameOfPlayer)) {
                        newPlayersWithScore[nameOfPlayer].totalAnswered+=1
                        newPlayersWithScore[nameOfPlayer].totalScore+=state.game.answerReceived[idx].filter(answer=>Object.keys(answer)[0] === nameOfPlayer)[0][nameOfPlayer].answer
                    }
                    //get bonus if player is the 1st one submitted the correct answer
                    console.log(Object.keys(state.game.answerReceived[idx][0])[0], nameOfPlayer, state.game.answerReceived[idx][0][nameOfPlayer].answer)
                    Object.keys(state.game.answerReceived[idx][0])[0]===nameOfPlayer && state.game.answerReceived[idx][0][nameOfPlayer].answer===1 ? newPlayersWithScore[nameOfPlayer].bonus+=1 : newPlayersWithScore[nameOfPlayer].bonus+=0
                }
            }
            const updatedPlayersScore = Object.assign({}, state.game, {players: newPlayersWithScore})
            console.log(updatedPlayersScore)
            return Object.assign({}, state, {game:updatedPlayersScore})
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