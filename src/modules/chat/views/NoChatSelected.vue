<template>
  <div class="no__chat">
    <h1>Start chating</h1>
    <ActiveUsers class="mobile__active__users"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
  components: {
    ActiveUsers: defineAsyncComponent(() => import('../components/ActiveUsers.vue'))
  },
}
</script>

<style lang="scss" scoped>
  @import "../styles/chat.scss";
</style>