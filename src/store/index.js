import { createStore } from "vuex";
import auth from '../modules/login/store/index'
import chat from '../modules/chat/store/chat/index'
import ui from '../modules/chat/store/ui/index'

const store = createStore({
  
  state: {
    socket: null
  },

  actions: { 
    assignSocket: ({ commit }, payload) => {
      commit('ASSIGN_SOCKET', payload)
    },
  },

  mutations: {
    ASSIGN_SOCKET: (state, socket) => {
      state.socket = socket
    }
  },

  getters: {
    getSocket: (state) => state.socket
  },

  modules: {
    auth,
    chat,
    ui
  }
})

export default store