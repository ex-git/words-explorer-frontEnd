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