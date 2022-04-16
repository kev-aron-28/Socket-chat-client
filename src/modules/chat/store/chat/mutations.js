export const setUsers = (state, users) => {
    state.connectedUsers = users
}

export const addUsers = (state, user) => {
    const existUser = state.connectedUsers.find(u => u.userID == user.userID )
    if(existUser) {
        existUser.status = 'connected'
    } else {
        state.connectedUsers.push(user)
    }
}

export const unactiveUser = (state, user) => {
    state.connectedUsers.find(u => u.userID == user.userID).status = 'disconnected'
}