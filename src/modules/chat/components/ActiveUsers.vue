<template>
  <div class="active">
  <input
      type="text"
      class="active__search"
      placeholder="Search a user"
      v-model="term"
    />
    <template v-if="usersList.length > 0">
    <div
      class="active__user"
      :style="{ 'background': activeUserBg, 'color': mode === 'light' ? '#000' : '#fff' }"
      v-for="user in usersList || []"
      :key="user.userID"
      @click="
        !user.self
          ? $router.push({ name: 'chat-home', params: { id: user.userID } })
          : $router.push({ name: 'no-chat' }),
          notification === user.userID ? notification = '' : ''
      "
    >
      <div class="active__user__content">
        <div class="active__user__name">
          <Icon :letter="user.username" :active="user.status" />
          <h4 class="active__name">{{ user.self ? "You" : user.username }}</h4>
        </div>
        <img src="@/assets/noti.png" class="active__notification" v-if="notification == user.userID"/>
      </div>
    </div>
    </template>
    <p v-else>No active users</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, defineAsyncComponent, ref } from "@vue/runtime-core";
export default {
  components: {
    Icon: defineAsyncComponent(() => import("./Icon.vue")),
  },

  setup() {
    const store = useStore();
    
    const term = ref('');
    const socket = store.getters['getSocket']
    const notification = ref('')

    socket.on('private_message', ({ from }) => {
      if(from != socket.auth.uid) {
        notification.value = from
      }
    })

    return {
      usersList: computed(() => {
        const users = store.getters['chat/getUser'](term.value);
        return users;
      }),
      activeUserBg: computed(() => store.getters['ui/getContentBg']), 
      mode: computed(() => store.getters['ui/getMode']),
      term,
      notification
    };
  },
};
</script>

<style lang="scss">
@import "../styles/chat.scss";
</style>