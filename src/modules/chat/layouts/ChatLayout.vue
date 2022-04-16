<template>
  <div class="chat" :style="{ 'background': mainBg  }">
      <HeaderChat/>
      <div class="chat__main__content">
        <div class="chat__active">
          <ActiveUsers/>
        </div>
        <div class="chat__messages" :style="{ 'background': messagesBg  }">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import { computed, defineAsyncComponent, defineComponent, onUnmounted } from '@vue/runtime-core'
import { useStore } from 'vuex';

import socket from '../helpers/socket'

export default {
  components: {
    ActiveUsers: defineAsyncComponent(() => import('../components/ActiveUsers.vue')),
    HeaderChat: defineAsyncComponent(() => import('../components/Header.vue'))
  },

  setup() {
    const store = useStore()
    if(localStorage.getItem('token')){
      socket.auth = { username: store.getters['auth/getUserName'], uid: store.getters['auth/getId']};
      socket.connect();
      const checkIfSeldAndSort = (arr) => {
        arr.forEach(user => {
          if(user.userID === socket.auth.uid) user.self = true
        })
        return arr.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        });
      }

      socket.on('users', (users) => {
        const usersArr = checkIfSeldAndSort(users)
        store.dispatch('chat/setUsers', usersArr)
      })

      socket.on('user_connected', (user) => {
        store.dispatch('chat/addUsers', user)
      })

      socket.on('disconnected_user', (user) => {
        store.dispatch('chat/unactiveUser', user)
      })

    } else {
      socket.disconnect();
    }

    onUnmounted(() => {
      socket.disconnect();
    })

    return { 
      mainBg: computed(() => store.getters['ui/getMainBg']),
      messagesBg: computed(() => store.getters['ui/getContentBg'])
    
    }
    
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/chat.scss";
</style>