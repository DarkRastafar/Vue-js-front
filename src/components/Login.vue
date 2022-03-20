<template>

    <div>
        <input v-model="username" type="text" placeholder="Логин"/>
        <input v-model="password" type="password" placeholder="Пароль"/>
        <button @click="setLogin">Войти</button>
    </div>
    
</template>

<script>
    import $ from 'jquery'

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            setLogin() {
                $.ajax({
                    url: 'http://127.0.0.1:8000/auth/token/login/',
                    type: 'POST',
                    data: {
                        username: this.username,
                        password: this.password
                    },
                    success: (response) => {
                        document.cookie = `username=${this.username}; secure;`
                        localStorage.setItem('username', this.username)

                        this.$router.push('tableWebSocket')
                    },
                    error: (response) => {
                        console.log(response)
                    }
                })
            },
        }
    }
</script>

<style>

</style>