<template>
  <div class="conversation">
    <template v-if="!loading">
    <div class="conversation__info">
        <Icon active="not-show" :letter="!userActive.name ? '' : userActive.name" class="converstation__icon"/>
        <h1 class="conversation__name__shorten" v-if="userActive.name?.length > 0">
          {{shortenName}}
        </h1>
        <h1 class="conversation__name" v-if="userActive.name?.length > 0">
          {{userActive.name}}
        </h1>
        <img src="@/assets/back.png" @click="$router.push({ name: 'no-chat' })" alt="Back icon" srcset="">
    </div>
      <div class="converstation__messages" id="messagesContainer">
        <div class="message__container">
          <div 
            class="message" 
            v-for="(m, idx) in allMessages || []" 
            :key="idx" 
            :style="{ 
            'text-align': m.name === 'You' ? 'right' : 'left', 
             'align-self': m.name === 'You' ? 'flex-end' : 'flex-start', 
             'background': m.name === 'You' ? messageBg.self : messageBg.user,
              'color': mode === 'light' ?  m.name === 'You' ? '#fff' : '#000' : '#fff'
            }"
            :class="m.name === 'You' ? 'self__message' : 'user__message'">
            <small 
              class="message__date"
            >{{getDate(m.date)}}</small>
            <h4>{{m.name}}</h4>
            <p>{{m.content || ''}}</p>

          </div>
          <div 
            class="message user__message bubble" 
            :style="{ 
            'text-align': 'left', 
             'align-self': 'flex-start', 
              'background': mode === 'light' ? '#f5f7fb' : '#4E426D',
            }"
            v-if="typing"
            >
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
    </div>
    <div class="converstation__input">
      <button class="send__message" @click="sendMessage">
        <img src="@/assets/send.png" alt="" srcset="">
      </button>
      <input 
        type="text" 
        class="input__message"
        placeholder="Send a message"
        v-model="message"
        @keyup.enter="sendMessage"
        >
    </div>
    </template>
    <Loader v-else/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { computed, defineAsyncComponent, onBeforeUnmount, onUpdated, watch } from '@vue/runtime-core'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import userApi from '@/api/user'
import messageApi from '@/api/message'

export default {
  components: {
    Icon: defineAsyncComponent(() => import('../components/Icon.vue')),
    Loader: defineAsyncComponent(() => import('../components/Spinner.vue'))
  },

  props: {
    id: {
      type: String
    }
  },

  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const message = ref('')
    const allMessages = ref([])
    const userActive = ref({})
    const socket = store.getters['getSocket']
    const loading = ref(false)
    const typing = ref(false)

    const getUserInfo = async () => {
      try {
        const { data } = await userApi.get(`/${route.params.id}`)
        userActive.value = data.user
      } catch (error) {
        router.push({ name: 'no-chat' })
        throw new Error(error)
      }
    }

    const getMessages = async () => {
      try {
        const { data } = await messageApi.get('/', {params: { from: socket.auth.uid, to: props.id }} )
        const { messages } = data
        if(messages) {
          messages.forEach(m => {
            allMessages.value.push({ 
              content: m.content, 
              name: m.from === socket.auth.uid ? 'You' : userActive.value.name, 
              date: m.date
            })
          })
        }
      } catch (error) {
        router.push({ name: 'no-chat' })
        throw new Error(error)
      }
    }

    const initInfo = async () => {
      loading.value = true
      try {
        const [ gMessages, gUserInfo ] = await Promise.all([getUserInfo, getMessages])
        gMessages()
        gUserInfo()
      } catch (error) {
        return router.push({ name: 'no-chat' })
      } finally {
        loading.value = false
      }
      
    }

    const sendMessage = () => {
      if(message.value.trim().length > 0) {
        const date = new Date()
        const newMessage = { content: message.value, from: socket.auth.uid, to: route.params.id, date} 
        socket.emit('private_message', newMessage )
        allMessages.value.push({ content: message.value, from: socket.auth.uid, to: route.params.id, name: 'You', date})
        message.value = ''
        // typing.value = false
        return
      }
      
    }

    const getDate = computed(() => (d) => {
      const date = new Date(d)
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    })

    const shortenName = computed(() => {
      return userActive.value.name.length > 10 ? userActive.value.name.substring(0, 10) + '...' : userActive.value.name
    })


    socket.on('private_message', ({ from, to, content, date, name }) => {
      if(to == store.getters['auth/getId']) {
        allMessages.value.push({ from, to, content, date, name })
      }
    })

    socket.on('typing', ({ to, from, content}) => {
        if(to == store.getters['auth/getId'] && from == props.id) {
          if(content.trim().length > 0) {
            typing.value = true
          } else {
            typing.value = false
          }
        } 
    })

    onUpdated(() => {
      if(!loading.value) {
        const messagesContainer = document.getElementById('messagesContainer')
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
      
    })

    onMounted(() => {
      if(!loading.value) {
        const messagesContainer = document.getElementById('messagesContainer')
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    })

    onBeforeUnmount(() => {
      socket.emit('typing', {
        from: store.getters['auth/getId'], 
        to: props.id, 
        content: ''
      })
    })

    watch(() => props.id, () => {
      allMessages.value = []
      userActive.value = {}
      typing.value = false
      initInfo() 
    })

    watch(message, (prev, curr) => {
      socket.emit('typing', {
        from: store.getters['auth/getId'], 
        to: props.id, 
        content: message.value
      })
    })


    initInfo()
    return {
      userActive,
      message,
      sendMessage,
      allMessages,
      loading,
      typing,
      getDate,
      shortenName,
      messageBg: computed(() => store.getters['ui/getMessagesBg']),
      mode: computed(() => store.getters['ui/getMode'])
    
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/chat.scss";
</style>