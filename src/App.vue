<template>
  <router-view/>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import useAuth from './modules/login/composables/useAuth'

export default {
  components: {
    Loader: defineAsyncComponent(() => import('../src/modules/chat/components/Spinner.vue'))
  },
  setup() {
    const { checkAuth, getStateAuth } = useAuth()
    checkAuth()

    return { getStateAuth }
  },
}
</script>