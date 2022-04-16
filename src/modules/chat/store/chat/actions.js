export const setUsers = ({ commit }, users) => {
    commit('setUsers', users)
}

export const addUsers = ({ commit }, user) => {
    commit('setUsers', user)
}

export const unactiveUser = async ({ commit }, user) => {
    await commit('unactiveUser', user)
}