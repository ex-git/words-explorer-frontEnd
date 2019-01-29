import {
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
    FETCH_GAME,
    QUIT_GAME,
    LOG_OUT,
    UPDATE_USER_GAMES,
} from '../actions'

import {GAMES_ENDPOINT, USERS_ENDPOINT} from '../components/config'

const initState = {
    availableGames: [],
    links: [
        {   
            name:"Log In",
            url:"/login",
            status: 1
        }
    ],
    ranks: [],
    game: {
        gameStatus: 'open',
        id: null,
        questions: [],
        answersReceived: {},
        players: [],
        
    },
    localCounter: {
        currentQuestion:0
    },
    userInfo: {},
    countDown: 3,
    wordResult: {},
    gamePool: {},
    newGame: {},
    userGames: [],
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
        case UPDATE_LINK:
            if(action.status === 'auth') {
                let updateLink = [
                    {   
                        name:"Create Game",
                        url:"/creategame",
                        status: 1
                    },
                    {   
                        name:`Profile (Score: ${state.userInfo.scores})`,
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
                    }
                ]
                return Object.assign({}, state, {
                    links: updateLink,
                    wordResult: {},
                    gamePool: {}
                })
            }
            break
        case AUTH_USER:
            return Object.assign({}, state, {userInfo:action.user})
        case CALCULATE_SCORE:
            let gameResult = {totalQuestion: 0, totalScore:0, totalAnswered:0, bonus:0}
            gameResult.totalQuestion = state.game.questions.length
            for (let idx of Object.keys(state.game.answersReceived)) {
                if (state.game.answersReceived[idx].find(answer=>Object.keys(answer)[0]=== state.userInfo.name)) {
                    gameResult.totalAnswered +=1
                    gameResult.totalScore += state.game.answersReceived[idx].filter(player=> Object.keys(player)[0] ===state.userInfo.name)[0][state.userInfo.name].answer
                    if(Object.keys(state.game.answersReceived[idx][0])[0]===state.userInfo.name && state.game.answersReceived[idx][0][state.userInfo.name].answer===1) {
                        gameResult.bonus +=1
                    }
                }
            }
            let totalScore = gameResult.totalScore + gameResult.bonus + parseInt(state.userInfo.scores)
            fetch(USERS_ENDPOINT, {
                credentials: 'include',
                method: "PUT",
                body: JSON.stringify({userName: state.userInfo.name,
                    scores: totalScore}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
            .then(()=>
                    Promise.resolve()
            )
            let newUserInfo = Object.assign({}, state.userInfo)
            newUserInfo.totalScore+=1
            return Object.assign({}, state, {gameResult}, {userInfo: newUserInfo})

        case UPDATE_QUESTION_INDEX:
            let newLocalCounter = Object.assign({}, state.localCounter)
            newLocalCounter.currentQuestion = action.currentQuestion
            return Object.assign({}, state, {localCounter: newLocalCounter})
        case UPDATE_RANKS:
            return Object.assign({}, state, {ranks:action.ranks})
        case UPDATE_USER_GAMES:
            return Object.assign({}, state, {userGames: action.games})
        case LOG_OUT:
            document.cookie = `authToken='';max-age=0`
            return Object.assign({}, state, {
                userInfo: {},
                wordResult: {},
                gamePool: {}
            })
        case FETCH_GAME:
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
            return state
        case EXIT_GAME:
            if(Object.keys(state.game).length>0) {
                fetch(GAMES_ENDPOINT+'/'+action.gameId, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify({gameStatus: 'open',
                        answersReceived: {},
                        players: []}
                        ),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                })
                .then(()=> {
                    return Promise.resolve()
                })
            }
            return Object.assign({}, state, {
                localCounter: {
                    currentQuestion:0
                }
            })
        case QUIT_GAME:
            if(Object.keys(state.game).length>0) {
                let joinStatus= {join: 'no'}
                fetch(GAMES_ENDPOINT+'/'+action.gameId, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify(joinStatus),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                })
                .then(()=> {
                    return Promise.resolve()
                })
            }
            return Object.assign({}, state, {
                localCounter: {
                    currentQuestion:0
                },
                game: {
                    gameStatus: 'open',
                    id: null,
                    questions: [],
                    answersReceived: {},
                    players: [],
                    
                }
            })
        default:
            return state
        
    }
}