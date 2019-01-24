
export const UPDATE_GAME = 'UPDATE_GAME'
export const updateGame = (gameStatus)=> ({
    type: UPDATE_GAME,
    gameStatus
})
export const UPDATE_TIMEOUT = 'UPDATE_TIMEOUT'
export const updateTimeOut = (timeOut)=> ({
    type: UPDATE_TIMEOUT,
    timeOut
})
export const JOIN_NEW_GAME = 'JOIN_NEW_GAME'
export const joinNewGame = (gameId)=> ({
    type: JOIN_NEW_GAME,
    gameId
})
export const AUTH_USER = 'AUTH_USER'
export const authUser = (user)=> ({
    type: AUTH_USER,
    user
})
export const EXIT_GAME = 'EXIT_GAME'
export const exitGame = (gameId)=> ({
    type: EXIT_GAME,
    gameId
})
export const UPDATE_LINK = 'UPDATE_LINK'
export const updateLink = (status)=> ({
    type: UPDATE_LINK,
    status
})
export const UPDATE_QUESTION_INDEX = 'UPDATE_QUESTION_INDEX'
export const updateQuestionIndex = (currentQuestion)=> ({
    type: UPDATE_QUESTION_INDEX,
    currentQuestion
})
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const submitAnswer = (answer)=> ({
    type: SUBMIT_ANSWER,
    answer
})
export const CALCULATE_SCORE = 'CALCULATE_SCORE'
export const calculateScore = (answers)=> ({
    type: CALCULATE_SCORE,
    answers
})
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const updateStatus = (status)=> ({
    type: UPDATE_STATUS,
    status
})
export const UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN'
export const updateCountdown = (countDown)=> ({
    type: UPDATE_COUNTDOWN,
    countDown
})
export const UPDATE_WORDRESULT = 'UPDATE_WORDRESULT'
export const updateWordResult = (wordResult)=> ({
    type: UPDATE_WORDRESULT,
    wordResult
})
export const FETCH_GAME = 'FETCH_GAME'
export const fetchGame = (game)=> ({
    type: FETCH_GAME,
    game
})
export const UPDATE_GAMEPOOL = 'UPDATE_GAMEPOOL'
export const updateGamePool = (questionsPool)=> ({
    type: UPDATE_GAMEPOOL,
    questionsPool
})
export const UPDATE_OPENGAME = 'UPDATE_OPENGAME'
export const updateOpenGame = (openGames)=> ({
    type: UPDATE_OPENGAME,
    openGames
})
export const RESET_GAMEPOOL = 'RESET_GAMEPOOL'
export const resetGamePool = ()=> ({
    type: RESET_GAMEPOOL
})
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const removeQuestion = (question)=> ({
    type: REMOVE_QUESTION,
    question
})
export const UPDATE_RANKS = 'UPDATE_RANKS'
export const updateRanks = (ranks)=> ({
    type: UPDATE_RANKS,
    ranks
})