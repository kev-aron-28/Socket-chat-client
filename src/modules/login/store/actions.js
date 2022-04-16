import chatApi from "@/api/auth"
import userApi from "@/api/user"

export const loginUser = async ({ commit }, user) => {
    commit('setState', 'authenticating')
    try {
        const { data }  = await chatApi.post('/login', user)
        const { user:userDb, token } = data;
        commit('setUser', userDb)
        commit('setToken', token)
        localStorage.setItem('token', token)
        commit('setState', 'authenticated')
        return {
            ok: true
        }
    } catch (error) {
        return { ok:false, msg: error }
    }
}

export const checkAuth = async ({ commit }) => {
    commit('setState', 'authenticating')
    const token = localStorage.getItem('token')
    if(!token) {
        return { ok: false, msg:'There is no existing token'}
    }
     try {
        const { data } = await chatApi.get('/', { 
            headers: { 
                'x-token': token
            }
         });
         
        const { token: newToken, user } = data;
        commit('setUser', user)
        commit('setToken', newToken)
        localStorage.setItem('token', newToken)
        commit('setState', 'authenticated')

        return {
            ok: true,
        }

     } catch (error) {
        return {
            ok: false,
            msg: error
        }
     }
}

export const createUser = async ({ commit }, user) => {
    commit('setState', 'authenticating')
    try {
        const { data } = await userApi.post('/', user)
        const { user: userDb, token } = data
        commit('setUser', user)
        commit('setToken', token)
        localStorage.setItem('token', token)
        commit('setState', 'authenticated')
        return {
            ok: true
        }
    } catch (error) {
        console.log(error);

        return { ok:false, msg: error }
    }
}

export const logout = ({ commit, rootState }) => {
    commit('setState', 'not-authenticated')
    commit('logout')
}