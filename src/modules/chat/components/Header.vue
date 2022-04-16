<template>
  <div class="chat__header">
    <div class="chat__logo" @click="$router.push({ name: 'no-chat'})">
        <img src="@/assets/icon.png" alt="Socket chat icon" srcset="">
    </div>
    <div class="chat__mode" @click="changeIcon">
      <img :src="icon" alt="Mode chat" srcset="">
    </div>
    <div class="header__logout">
        <button class="logout" @click="logout">Sign out</button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const mode = ref('ligth') 

    const icon = computed(() => {
      return mode.value == 'ligth' ? require('@/assets/ligth.png') : require('@/assets/dark.png')
    })


    return { 
      logout: () => {
        store.dispatch('auth/logout')
        router.push('/')
      },
      changeIcon: () => {
        mode.value === 'ligth' ? mode.value = 'dark' : mode.value = 'ligth'
        store.commit('ui/changeMode')
      },
      mode,
      icon
    }
  }
}
</script>

<style>

</style>