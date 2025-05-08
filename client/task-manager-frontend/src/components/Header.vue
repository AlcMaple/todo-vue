<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 
          class="text-2xl font-bold text-gray-900 cursor-pointer transition-transform duration-200 hover:text-blue-600" 
          @click="handleTitleClick"
        >✓ Done</h1>
        <div class="flex space-x-3">
          <a href="https://github.com/HGYJLLK" target="_blank" class="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 transform">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="https://blog.hgyjllk.top/" target="_blank" class="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 transform">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </a>
          <a href="/readme" class="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 transform">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="flex items-center">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const authStore = useAuthStore();

// 特定点击计数
let clickCount = 0;
let clickTimer = null;

const handleTitleClick = () => {
  clickCount++;
  
  // 清除之前的定时器
  if (clickTimer) {
    clearTimeout(clickTimer);
  }
  
  // 设置新的定时器，3秒后重置计数
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, 3000);
  
  // 如果在短时间内点击了5次，跳转到管理员登录页面
  if (clickCount >= 5) {
    clickCount = 0;
    router.push('/admin-login');
  } else if (clickCount === 1) {
    // 单击时返回首页
    router.push('/');
  }
};
</script>