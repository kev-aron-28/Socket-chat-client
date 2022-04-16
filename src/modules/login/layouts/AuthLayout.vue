<template>
  <div class="auth">
    <div class="auth__content">
      <router-view></router-view>
    </div>
    <div class="auth__image">
      <h1 class="title">Socket chat</h1>
      <img class="image" src="@/assets/auth.png" alt="" srcset="" />
      <span><b>By kev_aron_28</b></span>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>