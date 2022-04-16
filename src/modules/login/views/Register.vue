<template>
  <div class="login">
    <h1>Sign up</h1>
    <form class="login__form" @submit.prevent="onSubmit">
      <label class="login__label" for="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="login__input"
        v-model="user.name"
        required
      />
      <label class="login__label" for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        class="login__input"
        v-model="user.email"
        required
      />
      <label class="login__label" for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="login__input"
        v-model="user.password"
        required
      />
      <button class="login__button">Create account</button>
      <router-link class="login__link" :to="{ name: 'login' }">Already have an acount? Login</router-link
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
      password: '',
      name:''
    })
    const { signIn } = useAuth()
    return {
      user,
      onSubmit: async () => {
        const { ok, msg } = await signIn(user.value)
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