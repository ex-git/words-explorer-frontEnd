exports.USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT ||  "//localhost:8080/api/users"
exports.LOGIN_ENDPOINT = process.env.REACT_APP_LOGIN_ENDPOINT || "//localhost:8080/api/auth/login"
exports.LOGOUT_ENDPOINT = process.env.REACT_APP_LOGOUT_ENDPOINT || "//localhost:8080/api/auth/logout"
exports.REFRESH_ENDPOINT = process.env.REACT_APP_REFRESH_ENDPOINT || "//localhost:8080/api/auth/refresh"
exports.GAMES_ENDPOINT = process.env.REACT_APP_GAMES_ENDPOINT || "//localhost:8080/api/games"
exports.WORDS_ENDPOINT = process.env.REACT_APP_WORDS_ENDPOINT || "//localhost:8080/api/words"