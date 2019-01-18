import {UPDATE_TIMEOUT, UPDATE_QUESTION_INDEX, SUBMIT_ANSWER, CALCULATE_SCORE, UPDATE_STATUS, UPDATE_GAME, JOIN_NEW_GAME, UPDATE_COUNTDOWN, EXIT_GAME} from '../actions'

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
        timeOutUser:0,
        answerReceived: {},
        players: {},
        status: ''
    },
    user: {},
    countDown: 3
}

export const wordsExplorerReducer  = (state=initState, action) => {
    switch (action.type) {
        case UPDATE_GAME:
            const newGameStatus = Object.assign({}, state.game, {gameStatus:action.gameStatus})
            return Object.assign({}, state, {game:newGameStatus})
        case UPDATE_COUNTDOWN:
            return Object.assign({}, state, {countDown:action.countDown})
        case UPDATE_TIMEOUT:
            if(action.timeOut===0) {
                const newtimeOutUser = Object.assign({}, state.game, {timeOutUser:action.timeOut})
                return Object.assign({}, state, {game:newtimeOutUser})
            }
            else {
                const newtimeOutUser = Object.assign({}, state.game, {timeOutUser:state.game.timeOutUser+1})
                return Object.assign({}, state, {game:newtimeOutUser})
            }
        case CALCULATE_SCORE:
        console.log(state.game)
            let newPlayersWithScore = Object.assign({}, state.game.players)
            for (let idx of Object.keys(state.game.answerReceived)) {
                for (let nameOfPlayer of Object.keys(state.game.players)) {
                    if (state.game.answerReceived[idx].find(answer=>Object.keys(answer)[0]=== nameOfPlayer)) {
                        newPlayersWithScore[nameOfPlayer].totalAnswered+=1
                        newPlayersWithScore[nameOfPlayer].totalScore+=state.game.answerReceived[idx].filter(answer=>Object.keys(answer)[0] === nameOfPlayer)[0][nameOfPlayer].answer
                    }
                    //get bonus if player is the 1st one submitted the correct answer
                    Object.keys(state.game.answerReceived[idx][0])[0]===nameOfPlayer && state.game.answerReceived[idx][0][nameOfPlayer].answer===1 ? newPlayersWithScore[nameOfPlayer].bonus+=1 : newPlayersWithScore[nameOfPlayer].bonus+=0
                }
            }
            const updatedPlayersScore = Object.assign({}, state.game, {players: newPlayersWithScore})
            return Object.assign({}, state, {game:updatedPlayersScore})
        case UPDATE_QUESTION_INDEX:
            const newGameQuestionsIndex = Object.assign({}, state.game, {currentQuestion: action.currentQuestion})
            return Object.assign({}, state, {game:newGameQuestionsIndex})
        case SUBMIT_ANSWER:
            //prevent double submit
            if(state.game.answerReceived[state.game.currentQuestion] && state.game.answerReceived[state.game.currentQuestion].find(answer=>Object.keys(answer)[0]===state.user.name)) {
                return state
            }
            else {
                let newAnswerReceived
                if (state.game.answerReceived[state.game.currentQuestion]) {
                    newAnswerReceived = Object.assign({}, state.game.answerReceived)
                    newAnswerReceived[state.game.currentQuestion]= [...newAnswerReceived[state.game.currentQuestion], {[state.user.name]: {time: state.game.timeleft, answer: action.answer}}]
                }
                else {
                    newAnswerReceived = Object.assign({}, state.game.answerReceived)
                    state.game.answerReceived[state.game.currentQuestion] = [{[state.user.name]: {time: state.game.timeleft, answer: action.answer}}]
                }
                const updatedAnswerReceived = Object.assign({}, state.game.answerReceived, newAnswerReceived)
                const newGameAnswerReceived = Object.assign({}, state.game, {answerReceived: updatedAnswerReceived})
                return Object.assign({}, state, {game:newGameAnswerReceived})
            }
        case UPDATE_STATUS:
            const newStatus = Object.assign({}, state.game, {status: action.status})
            return Object.assign({}, state, {game:newStatus})
        case JOIN_NEW_GAME:
            if (state.user.auth && state.user.auth==='Yes') {
                const addUserGameId = Object.assign({}, state.user, {user: {currentGameId: action.user.gameId}})
                const addUserToGame = Object.assign({}, state.game, {players: {[state.user.name]: {totalScore:0, totalAnswered:0, bonus:0}}})
                return Object.assign({}, state, addUserGameId, {game: addUserToGame})
            }
            else {
                const addUserGameId = Object.assign({}, state.user, {user: {name:action.user.name, auth: 'no', currentGameId: action.user.gameId}})
                const addUserToGame = Object.assign({}, state.game, {players: {[action.user.name]: {totalScore:0, totalAnswered:0, bonus:0}}})
                return Object.assign({}, state, addUserGameId, {game: addUserToGame})
            }
        case EXIT_GAME:
            const removeUserGameId = Object.assign({}, state.user, {user: {currentGameId: null}})
            const removeUserFromGame = Object.assign({}, state.game)
            delete removeUserFromGame.players[state.user.name]
            return Object.assign({}, state, removeUserGameId, {game: removeUserFromGame})
        default:
        return state
    }
}