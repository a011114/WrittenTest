import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsernameStore = defineStore('username', () => {
  const username = ref('')
  const setUsername = (newUsername) => {
    username.value = newUsername
  }
  return { username, setUsername }
})
