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