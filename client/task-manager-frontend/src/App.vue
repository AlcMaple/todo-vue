<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <router-view />
  </div>
</template>

<script setup>
// App.vue只负责提供根容器，所有内容都在路由视图中展示
</script>

<style>
/* 全局CSS可以在这里添加 */
html, body {
  font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
}

/* 添加一些全局动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* 任务拖拽时的样式 */
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.task-drag {
  cursor: move;
}
</style>