import {
    UPDATE_GAME,
    updateGame,
    UPDATE_TIMEOUT,
    updateTimeOut,
    JOIN_NEW_GAME,
    joinNewGame,
    AUTH_USER,
    authUser,
    QUIT_GAME,
    quitGame,
    EXIT_GAME,
    exitGame,
    UPDATE_LINK,
    updateLink,
    UPDATE_QUESTION_INDEX,
    updateQuestionIndex,
    SUBMIT_ANSWER,
    submitAnswer,
    CALCULATE_SCORE,
    calculateScore,
    UPDATE_STATUS,
    updateStatus,
    UPDATE_COUNTDOWN,
    updateCountdown,
    UPDATE_WORDRESULT,
    updateWordResult,
    FETCH_GAME,
    fetchGame,
    UPDATE_GAMEPOOL,
    updateGamePool,
    UPDATE_OPENGAME,
    updateOpenGame,
    RESET_GAMEPOOL,
    resetGamePool,
    REMOVE_QUESTION,
    removeQuestion,
    UPDATE_RANKS,
    updateRanks,
    UPDATE_USER_GAMES,
    updateUserGames,
    LOG_OUT,
    logOut
} from '../actions'

describe('updateGame', ()=>{
    it('should fire update game', ()=>{
        const action = updateGame()
        expect(action.type).toEqual(UPDATE_GAME)
    })
})

describe('updateTimeOut', ()=>{
    it('should fire update time out', ()=>{
        const action = updateTimeOut()
        expect(action.type).toEqual(UPDATE_TIMEOUT)
    })
})

describe('joinNewGame', ()=>{
    it('should fire join new game', ()=>{
        const action = joinNewGame()
        expect(action.type).toEqual(JOIN_NEW_GAME)
    })
})

describe('authUser', ()=>{
    it('should fire auth user', ()=>{
        const action = authUser()
        expect(action.type).toEqual(AUTH_USER)
    })
})

describe('quitGame', ()=>{
    it('should fire quite game', ()=>{
        const action = quitGame()
        expect(action.type).toEqual(QUIT_GAME)
    })
})

describe('exitGame', ()=>{
    it('should fire exit game', ()=>{
        const action = exitGame()
        expect(action.type).toEqual(EXIT_GAME)
    })
})

describe('updateLink', ()=>{
    it('should fire update link', ()=>{
        const action = updateLink()
        expect(action.type).toEqual(UPDATE_LINK)
    })
})

describe('updateQuestionIndex', ()=>{
    it('should fire update question index', ()=>{
        const action = updateQuestionIndex()
        expect(action.type).toEqual(UPDATE_QUESTION_INDEX)
    })
})

describe('submitAnswer', ()=>{
    it('should fire submit answer', ()=>{
        const action = submitAnswer()
        expect(action.type).toEqual(SUBMIT_ANSWER)
    })
})

describe('calculateScore', ()=>{
    it('should fire calculate score', ()=>{
        const action = calculateScore()
        expect(action.type).toEqual(CALCULATE_SCORE)
    })
})

describe('updateStatus', ()=>{
    it('should fire update status', ()=>{
        const action = updateStatus()
        expect(action.type).toEqual(UPDATE_STATUS)
    })
})

describe('updateCountdown', ()=>{
    it('should fire update countdown', ()=>{
        const action = updateCountdown()
        expect(action.type).toEqual(UPDATE_COUNTDOWN)
    })
})

describe('updateWordResult', ()=>{
    it('should fire update word result', ()=>{
        const action = updateWordResult()
        expect(action.type).toEqual(UPDATE_WORDRESULT)
    })
})

describe('fetchGame', ()=>{
    it('should fire fetch game', ()=>{
        const action = fetchGame()
        expect(action.type).toEqual(FETCH_GAME)
    })
})

describe('updateGamePool', ()=>{
    it('should fire update game pool', ()=>{
        const action = updateGamePool()
        expect(action.type).toEqual(UPDATE_GAMEPOOL)
    })
})

describe('updateOpenGame', ()=>{
    it('should fire update open game', ()=>{
        const action = updateOpenGame()
        expect(action.type).toEqual(UPDATE_OPENGAME)
    })
})

describe('resetGamePool', ()=>{
    it('should fire reset game pool', ()=>{
        const action = resetGamePool()
        expect(action.type).toEqual(RESET_GAMEPOOL)
    })
})

describe('removeQuestion', ()=>{
    it('should fire remove question', ()=>{
        const action = removeQuestion()
        expect(action.type).toEqual(REMOVE_QUESTION)
    })
})

describe('updateRanks', ()=>{
    it('should fire update ranks', ()=>{
        const action = updateRanks()
        expect(action.type).toEqual(UPDATE_RANKS)
    })
})

describe('updateUserGames', ()=>{
    it('should fire update user games', ()=>{
        const action = updateUserGames()
        expect(action.type).toEqual(UPDATE_USER_GAMES)
    })
})

describe('logOut', ()=>{
    it('should fire logout', ()=>{
        const action = logOut()
        expect(action.type).toEqual(LOG_OUT)
    })
})