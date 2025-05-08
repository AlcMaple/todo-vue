<template>
    <div 
      class="task-card"
      :class="{
        'border-yellow-400': task.status === '待办',
        'border-blue-500': task.status === '正在',
        'border-orange-500': task.status === '待沟通',
        'border-green-500': task.status === '已完成',
        'task-drag': isAdmin
      }"
    >
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-lg">{{ task.title }}</h3>
        <div v-if="isAdmin" class="flex space-x-2">
          <button @click="$emit('edit', task)" class="text-blue-500 hover:text-blue-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="mt-2 text-sm text-gray-600">
        <p>{{ truncateDescription(task.description) }}</p>
      </div>
      
      <div class="mt-3 flex flex-wrap gap-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {{ task.timeframe }}小时
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ¥{{ task.price }}
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {{ task.client_name }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    task: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['edit', 'delete']);
  
  const truncateDescription = (text) => {
    if (text.length > 100) {
      return text.substring(0, 100) + '...';
    }
    return text;
  };
  </script>