<template>
    <div class="task-column">
      <h2 class="text-lg font-semibold mb-4 flex items-center">
        {{ title }}
        <span class="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm">
          {{ tasks.length }}
        </span>
      </h2>
      
      <div v-if="isAdmin">
        <draggable
          v-model="taskList"
          group="tasks"
          item-key="id"
          class="min-h-[400px]"
          ghost-class="ghost"
          @change="handleChange"
        >
          <template #item="{ element }">
            <TaskCard 
              :task="element" 
              :isAdmin="isAdmin"
              @edit="$emit('edit', element)"
              @delete="$emit('delete', element.id)"
            />
          </template>
        </draggable>
        
        <div v-if="title === '待办'" class="mt-4">
          <!-- <button
            @click="$emit('add')"
            class="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            添加任务
          </button> -->
        </div>
      </div>
      
      <div v-else>
        <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center py-10 text-gray-400">
          <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p>暂无任务</p>
        </div>
        
        <div v-else>
          <TaskCard 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task" 
            :isAdmin="isAdmin"
          />
        </div>
        
        <div 
          v-if="title === '待办'" 
          class="mt-4 relative group"
        >
          <button
            @click="$emit('add')"
            class="w-full flex items-center justify-center py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 transition-colors duration-200"
          >
            <span class="group-hover:opacity-0 transition-opacity duration-200">有需求?</span>
            <span class="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">需要我做什么?</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed, watch } from 'vue';
  import draggable from 'vuedraggable';
  import TaskCard from './TaskCard.vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update:tasks', 'edit', 'delete', 'add', 'status-change']);
  
  const taskList = computed({
    get: () => props.tasks,
    set: (value) => {
      emit('update:tasks', value);
    }
  });
  
  const handleChange = (event) => {
  // 如果有任务被添加到此列
  if (event.added) {
    const { element } = event.added;
    console.log('Task moved to:', props.title);
    console.log('Task ID:', element.id);
    
    // 更新任务状态
    emit('status-change', element.id, props.title);
  }
};
  </script>