<template>
  <div>
    <Header>
      <template #actions>
        <!-- 空出来以便布局平衡 -->
      </template>
    </Header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">工作进度看板</h2>
        <p class="text-gray-600">实时查看任务进度</p>
        <p v-if="lastEditTime" class="text-sm text-gray-500 mt-1">
          最后更新: {{ formatDate(lastEditTime) }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BoardColumn
          title="待办"
          :tasks="todoTasks"
          :isAdmin="false"
          @add="showRequestForm = true"
        />
        
        <BoardColumn
          title="正在"
          :tasks="inProgressTasks"
          :isAdmin="false"
        />
        
        <BoardColumn
          title="待沟通"
          :tasks="pendingCommunicationTasks"
          :isAdmin="false"
        />
        
        <BoardColumn
          title="已完成"
          :tasks="completedTasks"
          :isAdmin="false"
        />
      </div>
    </main>
    
    <RequestForm
      v-if="showRequestForm"
      :isAdmin="false"
      @close="showRequestForm = false"
      @submit="submitRequest"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '../store';
import Header from '../components/Header.vue';
import BoardColumn from '../components/BoardColumn.vue';
import RequestForm from '../components/RequestForm.vue';
import api from '../services/api';

const taskStore = useTaskStore();
const showRequestForm = ref(false);
const lastEditTime = ref(null);

// 计算属性获取不同状态的任务
const todoTasks = computed(() => taskStore.getTodoTasks);
const inProgressTasks = computed(() => taskStore.getInProgressTasks);
const pendingCommunicationTasks = computed(() => taskStore.getPendingCommunicationTasks);
const completedTasks = computed(() => taskStore.getCompletedTasks);

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 获取最后编辑时间
const fetchLastEditTime = async () => {
  try {
    // 如果后端没有提供此API，可以临时使用最新任务的更新时间
    // 方案1: 使用专门的API获取最后编辑时间
    // const response = await api.getLastEditTime();
    // lastEditTime.value = response.data.lastEditTime;
    
    // 方案2: 使用现有数据计算最后编辑时间
    const allTasks = [...todoTasks.value, ...inProgressTasks.value, 
                       ...pendingCommunicationTasks.value, ...completedTasks.value];
    if (allTasks.length > 0) {
      // 找出最新更新的任务
      const latestTask = allTasks.reduce((latest, current) => {
        const latestDate = latest.updated_at ? new Date(latest.updated_at) : new Date(0);
        const currentDate = current.updated_at ? new Date(current.updated_at) : new Date(0);
        return currentDate > latestDate ? current : latest;
      }, { updated_at: null });
      
      if (latestTask.updated_at) {
        lastEditTime.value = latestTask.updated_at;
      }
    }
  } catch (error) {
    console.error('获取最后编辑时间失败:', error);
  }
};

// 提交用户请求
const submitRequest = async (formData) => {
  try {
    await taskStore.addTask(formData);
    showRequestForm.value = false;
    // 刷新最后编辑时间
    fetchLastEditTime();
  } catch (error) {
    console.error('提交请求失败:', error);
    // 这里可以添加错误提示
  }
};

// 页面加载时获取任务数据和最后编辑时间
onMounted(async () => {
  await taskStore.fetchTasks();
  fetchLastEditTime();
});
</script>