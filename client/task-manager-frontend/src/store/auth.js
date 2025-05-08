// src/store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: false,
    adminPassword: '2333' // 在实际应用中，这应该存储在后端
  }),
  
  actions: {
    login(password) {
      if (password === this.adminPassword) {
        this.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    },
    
    logout() {
      this.isAdmin = false;
      localStorage.removeItem('isAdmin');
    },
    
    checkAuth() {
      // 从本地存储中恢复登录状态
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
      return this.isAdmin;
    }
  }
})