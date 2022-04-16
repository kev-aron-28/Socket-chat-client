import { useStore } from "vuex"
import { computed } from 'vue'
const useAuth = () => {
    const store = useStore()
    const login = async (user) => {
        const resp = await store.dispatch('auth/loginUser', user)
        console.log(resp);
        return resp
    }

    const signIn = async (user) => {
        const resp = await store.dispatch('auth/createUser',user)
        return resp
    }

    const getStateAuth = computed(() => {
        return store.getters['auth/getStateAuth']
    })

    const checkAuth = async () => {
        const resp = await store.dispatch('auth/checkAuth')
        return resp
    }

    return {
        login,
        signIn,
        checkAuth,
        getStateAuth
    }
}

export default useAuth