
export const UPDATE_GAME = 'UPDATE_GAME'
export const updateGame = (gameStatus)=> ({
    type: UPDATE_GAME,
    gameStatus
})
export const UPDATE_TIMMER = 'UPDATE_TIMMER'
export const updateTimmer = (timeleft)=> ({
    type: UPDATE_TIMMER,
    timeleft
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