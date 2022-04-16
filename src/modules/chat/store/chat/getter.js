export const getActiveUsers = (state) => {
    return state.connectedUsers || []
}

export const getMessages = (state) => (id) => {
    return state.connectedUsers.find(user => user.userID === id) || []
}

export const getUser = (state) => (term = '') => {
    if(term.length === 0){
        return state.connectedUsers
    } else {
        return state.connectedUsers.filter( user => user.username.toLowerCase().includes(term.toLocaleLowerCase()) )
    }
}