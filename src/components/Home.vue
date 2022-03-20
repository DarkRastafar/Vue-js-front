<template>
  <div>
      <h1>Нужно авторизоваться</h1>
      <button @click="goLogin">Войти</button>
  </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
      goLogin() {
        this.$router.push('login')
      }
    }
}
</script>

<style>

</style>