
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
export const joinNewGame = (user)=> ({
    type: JOIN_NEW_GAME,
    user
})
export const EXIT_GAME = 'EXIT_GAME'
export const exitGame = ()=> ({
    type: EXIT_GAME,
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