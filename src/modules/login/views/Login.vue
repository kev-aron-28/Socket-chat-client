<template>
  <div class="login">
    <h1>Welcome back!</h1>
    <form class="login__form" @submit.prevent="onSubmit">
      <label class="login__label" for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        id="email"
        class="login__input"
        v-model="user.email"
        required
      />
      <label class="login__label" for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        class="login__input"
        v-model="user.password"
        required
      />
      <button class="login__button">Login</button>
      <router-link class="login__link" :to="{ name: 'register' }"
        >Not registered yet? Create an account</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

export default {
  setup() {
    const router = useRouter()
    const user = ref({
      email: '',
      password: ''
    })
    const { login } = useAuth()

    return {
      user,
      onSubmit: async () => {
        const { ok, msg } = await login(user.value)
        if(!ok) return;
        router.push('/chat')
      }
     }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/login.scss";
</style>