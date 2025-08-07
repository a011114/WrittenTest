<script setup>
import { useUsernameStore } from '@/stores/counter.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const username = ref('')
const password = ref('')
let router = useRouter()
const usernameStore = useUsernameStore()
function login() {
  if (username.value === '' || password.value === '') {
    message.error('请输入用户名和密码')
    return
  } else {
    router.push({ path: '/home' }).then(() => {
      usernameStore.setUsername(username.value)
    })
    message.success('登录成功')
  }
}
</script>

<template>
  <div class="login-view">
    <input class="username-input" type="text" placeholder="Username" v-model="username" />
    <input class="password-input" type="password" placeholder="Password" v-model="password" />
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 300px;
  margin: 0 auto;
}
.username-input {
  margin: 10px 0;
}

.password-input {
  margin: 10px 0;
}

.login-button {
  margin-bottom: 10px;
  padding: 5px;
}
</style>
