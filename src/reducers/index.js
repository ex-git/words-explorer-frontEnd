import {UPDATE_TIMEOUT,
    UPDATE_QUESTION_INDEX,
    SUBMIT_ANSWER,
    CALCULATE_SCORE,
    UPDATE_STATUS,
    UPDATE_GAME,
    JOIN_NEW_GAME,
    UPDATE_COUNTDOWN,
    EXIT_GAME,
    UPDATE_WORDRESULT,
    UPDATE_GAMEPOOL,
    REMOVE_QUESTION,
    RESET_GAMEPOOL,
    UPDATE_OPENGAME,
    AUTH_USER,
    UPDATE_LINK,
    UPDATE_RANKS,
    FETCH_GAME
} from '../actions'

import {GAMES_ENDPOINT} from '../components/config'
import { clearInterval } from 'timers';

const initState = {
    availableGames: [],
    links: [
        {   
            name:"Log In",
            url:"/login",
            status: 1
        },
        {   
            name:"Log out",
            url:"/logout",
            status: 0
        },
        {   
            name:"Profile",
            url:"/profile",
            status: 0
        }
    ],
    ranks: [
        // {name: "Maxwell", score: 999},
        // {name: "Lily", score: 354},
    ],
    game: {
        gameStatus: 'open',
        id: null,
        questions: [],
        answersReceived: {},
        players: {},
        
    },
    localCounter: {
        currentQuestion:0,
        status: ''
    },
    userInfo: {},
    countDown: 3,
    wordResult: {},
    gamePool: {},
    newGame: {},
    gameResult: {totalQuestion: 0, totalScore:0, totalAnswered:0, bonus:0}
}

export const wordsExplorerReducer  = (state=initState, action) => {
    switch (action.type) {
        case UPDATE_GAME:
            fetch(GAMES_ENDPOINT+'/'+state.game.gameId, {
                credentials: 'include',
                method: "PUT",
                body: JSON.stringify({gameStatus: action.gameStatus}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
            .then(()=>
                    Promise.resolve()
            )
            return state
        case UPDATE_COUNTDOWN:
            return Object.assign({}, state, {countDown:action.countDown})
        // case UPDATE_TIMEOUT:
        //     this.timmer = setInterval(function(){
        //         if(state.countDown===0) {
        //             clearInterval(this.timmer)
        //         }
        //         return Object.assign({}, state, {countDown:state.countDown-1})
        //     }, 1000) 
        case UPDATE_LINK:
            if(action.status === 'auth') {
                let updateLink = [
                    {   
                        name:"Log In",
                        url:"/login",
                        status: 0
                    },
                    {   
                        name:"Profile",
                        url:"/profile",
                        status: 1
                    },
                    {   
                        name:"Log out",
                        url:"/logout",
                        status: 1
                    }
                ]
                return Object.assign({}, state, {links: updateLink})
            }
            else if(action.status === 'unAuth') {
                let updateLink = [
                    {   
                        name:"Log In",
                        url:"/login",
                        status: 1
                    },
                    {   
                        name:"Profile",
                        url:"/profile",
                        status: 0
                    },
                    {   
                        name:"Log out",
                        url:"/logout",
                        status: 0
                    }
                ]
                return Object.assign({}, state, {links: updateLink})
            }
            break
        case AUTH_USER:
            return Object.assign({}, state, {userInfo:action.user})
        case CALCULATE_SCORE:
            let gameResult = {totalQuestion: 0, totalScore:0, totalAnswered:0, bonus:0}
            gameResult.totalQuestion = state.game.questions.length
            for (let idx of Object.keys(state.game.answersReceived)) {
                if (state.game.answersReceived[idx].find(answer=>Object.keys(answer)[0]=== state.userInfo.name)) {
                    gameResult.totalAnswered = state.gameResult.totalAnswered+1
                    gameResult.totalScore = state.gameResult.totalScore += state.game.answersReceived[idx].filter(player=> Object.keys(player)[0] ===state.userInfo.name)[0][state.userInfo.name].answer
                    if(Object.keys(state.game.answersReceived[idx][0])[0]===state.userInfo.name && state.game.answersReceived[idx][0][state.userInfo.name].answer===1) {
                        gameResult.bonus = state.gameResult.bonus+1
                    }
                }
            }
            // const updatedPlayersScore = Object.assign({}, state.game, {players: newPlayersWithScore})
            return Object.assign({}, state, {gameResult})

        case UPDATE_QUESTION_INDEX:
            let newLocalCounter = Object.assign({}, state.localCounter)
            newLocalCounter.currentQuestion = action.currentQuestion
            // console.log(newLocalCounter, Object.assign({}, state, newLocalCounter))
            // const newGameQuestionsIndex = Object.assign({}, state.localCounter, {currentQuestion: action.currentQuestion})
            return Object.assign({}, state, {localCounter: newLocalCounter})
        case UPDATE_RANKS:
            return Object.assign({}, state, {ranks:action.ranks})
        case FETCH_GAME:
        // if (action.game.gameId === state.game.gameId) {
        //     if(action.game.answersReceived.length === state.game.answersReceived.length) {

        //     }
        //     else if (Object.keys(action.game.players).join() === Object.keys(state.game.answersReceived).join()) {

        //     }
        // }
        return Object.assign({}, state, {game:action.game})
        case SUBMIT_ANSWER:
            //prevent double submit
            if(state.game.answersReceived[state.localCounter.currentQuestion] && state.game.answersReceived[state.localCounter.currentQuestion].find(answer=>Object.keys(answer)[0]===state.userInfo.name)) {
                return state
            }
            else {
                let newanswersReceived
                if (state.game.answersReceived[state.localCounter.currentQuestion]) {
                    newanswersReceived = Object.assign({}, state.game.answersReceived)
                    newanswersReceived[state.localCounter.currentQuestion]= [...newanswersReceived[state.localCounter.currentQuestion], {[state.userInfo.name]: {answer: action.answer}}]
                }
                else {
                    newanswersReceived = Object.assign({}, state.game.answersReceived)
                    newanswersReceived[state.localCounter.currentQuestion] = [{[state.userInfo.name]: {answer: action.answer}}]
                }
                fetch(GAMES_ENDPOINT+'/'+state.game.gameId, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify({answersReceived: newanswersReceived}),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                })
                .then(()=>
                        Promise.resolve()
                )
                return state

                
                const updatedanswersReceived = Object.assign({}, state.game.answersReceived, newanswersReceived)
                const newGameanswersReceived = Object.assign({}, state.game, {answersReceived: updatedanswersReceived})
                return Object.assign({}, state, {game:newGameanswersReceived})
            }
        case UPDATE_STATUS:
            const newStatus = Object.assign({}, state.game, {status: action.status})
            return Object.assign({}, state, {game:newStatus})
        case UPDATE_OPENGAME:
            return Object.assign({}, state, {availableGames:action.openGames})
        case UPDATE_WORDRESULT:
            return Object.assign({}, state, {wordResult: action.wordResult})
        case RESET_GAMEPOOL:
            return Object.assign({}, state, {gamePool: {}})
        case UPDATE_GAMEPOOL:
            if (Object.keys(state.gamePool).length===0) {
                return Object.assign({}, state, {gamePool: [action.questionsPool]})
            }
            else if(state.gamePool.find(word=> word.question === action.questionsPool.question)) {
                return state
            }
            else {
                return Object.assign({}, state, {gamePool: [...state.gamePool, action.questionsPool]})
            }
        case REMOVE_QUESTION:
            return Object.assign({}, state, {gamePool: [...state.gamePool.filter(question=> question.question!==action.question)]})
        case JOIN_NEW_GAME:
            if (state.userInfo.name !== undefined) {
                let newPlayersList
                if (state.game.players.length >0 && !(state.userInfo.name in state.game.players)) {
                    newPlayersList = {players: [...state.game.players, state.userInfo.name]}
                }
                else {
                    newPlayersList = {players: [state.userInfo.name]}
                }
                fetch(GAMES_ENDPOINT+'/'+action.gameId, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify(newPlayersList),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                })
                .then(()=>
                     Promise.resolve()
                )
            }
            else {
                return state
            }
        case EXIT_GAME:
            if(Object.keys(state.game).length>0) {
                fetch(GAMES_ENDPOINT+'/'+state.game.gameId, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify({gameStatus: 'open',
                        answersReceived: [],
                        player: []}
                        ),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                })
                .then(()=> {
                    return Promise.resolve()
                })
            }
            return state
        default:
            return state
        
    }
}