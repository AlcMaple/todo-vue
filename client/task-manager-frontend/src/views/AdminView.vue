<template>
    <div>
      <Header>
        <template #actions>
          <a 
            href="/" 
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 mr-4"
          >
            返回用户视图
          </a>
          <button 
            @click="showAddTaskForm = true"
            class="btn-primary"
          >
            添加任务
          </button>
        </template>
      </Header>
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">任务管理看板</h2>
            <p class="text-gray-600">拖拽任务卡片可以更改任务状态</p>
          </div>
          
          <div v-if="pendingRequests.length > 0">
            <button 
              @click="showRequestsList = true"
              class="btn-secondary relative"
            >
              查看待审核请求
              <span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {{ pendingRequests.length }}
              </span>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BoardColumn
            title="待办"
            v-model:tasks="todoTasks"
            :isAdmin="true"
            @edit="editTask"
            @delete="deleteTask"
            @add="showAddTaskForm = true"
            @status-change="updateTaskStatus"
          />
          
          <BoardColumn
            title="正在"
            v-model:tasks="inProgressTasks"
            :isAdmin="true"
            @edit="editTask"
            @delete="deleteTask"
            @status-change="updateTaskStatus"
          />
          
          <BoardColumn
            title="待沟通"
            v-model:tasks="pendingCommunicationTasks"
            :isAdmin="true"
            @edit="editTask"
            @delete="deleteTask"
            @status-change="updateTaskStatus"
          />
          
          <BoardColumn
            title="已完成"
            v-model:tasks="completedTasks"
            :isAdmin="true"
            @edit="editTask"
            @delete="deleteTask"
            @status-change="updateTaskStatus"
          />
        </div>
      </main>
      
      <!-- 添加/编辑任务表单 -->
      <RequestForm
        v-if="showAddTaskForm"
        :isAdmin="true"
        :editTask="currentEditTask"
        @close="closeTaskForm"
        @submit="submitTask"
      />
      
      <!-- 待审核请求列表 -->
      <div 
        v-if="showRequestsList"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div 
          class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">待审核请求</h2>
            <button @click="showRequestsList = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[60vh]">
            <div 
              v-for="task in pendingRequests" 
              :key="task.id"
              class="border border-gray-200 rounded-md p-4 mb-3 hover:bg-gray-50"
            >
              <div class="flex justify-between">
                <h3 class="font-medium">{{ task.title }}</h3>
                <span class="text-sm text-gray-500">
                  来自: {{ task.client_name }}
                </span>
              </div>
              
              <p class="text-sm mt-2 text-gray-600">{{ task.description }}</p>
              
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ task.timeframe }}小时
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ¥{{ task.price }}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  联系方式: {{ task.contact }}
                </span>
              </div>
              
              <div class="mt-3 flex justify-end space-x-2">
                <button 
                  @click="rejectRequest(task.id)"
                  class="btn-secondary py-1 px-3"
                >
                  拒绝
                </button>
                <button 
                  @click="approveRequest(task.id)"
                  class="btn-primary py-1 px-3"
                >
                  接受
                </button>
                <button 
                  @click="editTask(task)"
                  class="py-1 px-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                  修改并接受
                </button>
              </div>
            </div>
            
            <div v-if="pendingRequests.length === 0" class="py-8 text-center text-gray-500">
              暂无待审核请求
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useTaskStore } from '../store';
  import Header from '../components/Header.vue';
  import BoardColumn from '../components/BoardColumn.vue';
  import RequestForm from '../components/RequestForm.vue';
  
  const taskStore = useTaskStore();
  const showAddTaskForm = ref(false);
  const showRequestsList = ref(false);
  const currentEditTask = ref(null);
  
  // 计算属性获取不同状态的任务
  const todoTasks = computed(() => taskStore.getTodoTasks);
  const inProgressTasks = computed(() => taskStore.getInProgressTasks);
  const pendingCommunicationTasks = computed(() => taskStore.getPendingCommunicationTasks);
  const completedTasks = computed(() => taskStore.getCompletedTasks);
  
  // 获取待审核的请求（在这里假设就是"待办"状态的任务）
  const pendingRequests = computed(() => todoTasks.value);
  
  // 关闭任务表单
  const closeTaskForm = () => {
    showAddTaskForm.value = false;
    currentEditTask.value = null;
  };
  
  // 编辑任务
  const editTask = (task) => {
    currentEditTask.value = task;
    showAddTaskForm.value = true;
    showRequestsList.value = false;
  };
  
  // 删除任务
  const deleteTask = async (taskId) => {
    if (confirm('确定要删除此任务吗？')) {
      await taskStore.deleteTask(taskId);
    }
  };
  
  // 提交任务（添加或更新）
  const submitTask = async (formData) => {
    try {
      if (currentEditTask.value) {
        await taskStore.updateTask(currentEditTask.value.id, formData);
      } else {
        await taskStore.addTask(formData);
      }
      closeTaskForm();
    } catch (error) {
      console.error('提交任务失败:', error);
      // 这里可以添加错误提示
    }
  };

    // 更新任务状态
    const updateTaskStatus = async (taskId, newStatus) => {
    try {
        console.log('更新任务状态:', taskId, newStatus);
        await taskStore.updateTaskStatus(taskId, newStatus);
        // 显示成功提示
        alert(`任务已移动到"${newStatus}"状态`);
    } catch (error) {
        console.error('更新任务状态失败:', error);
        alert('更新任务状态失败，请重试!');
        await taskStore.fetchTasks(); // 重新获取任务，恢复原状态
    }
    };
  
  // 接受用户请求
    const approveRequest = async (taskId) => {
    try {
        const task = taskStore.tasks.find(t => t.id === taskId);
        if (task) {
        // 将任务状态更新为"正在"
        await taskStore.updateTaskStatus(taskId, '正在');
        // 关闭请求列表
        showRequestsList.value = false;
        // 提示用户操作成功
        alert('已成功接受任务请求！');
        }
    } catch (error) {
        console.error('接受请求失败:', error);
        alert('接受请求失败，请重试！');
    }
    };

    // 拒绝用户请求
    const rejectRequest = async (taskId) => {
    if (confirm('确定要拒绝此请求吗？')) {
        try {
        await taskStore.deleteTask(taskId);
        alert('已拒绝该任务请求');
        } catch (error) {
        console.error('拒绝请求失败:', error);
        alert('拒绝请求失败，请重试！');
        }
    }
    };
  
  // 页面加载时获取任务数据
  onMounted(async () => {
    await taskStore.fetchTasks();
  });
  </script>