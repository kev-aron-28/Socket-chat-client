export const setUser = (state, user) => {
    state.user = user;
}

export const setToken = (state, token) => {
    state.token = token;
}

export const setState = (state, status) => {
    state.stateAuth = status;
}

export const logout = (state) => {
    state.token = ''
    state.user = {}
    localStorage.removeItem('token')
}