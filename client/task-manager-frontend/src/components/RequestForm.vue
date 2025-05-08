<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 animate-fade-in"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ isEditing ? '编辑任务' : '提交需求' }}</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="title" class="form-label">名称</label>
            <div class="text-xs text-gray-500 mb-1">对你需求的简介</div>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="form-input"
              placeholder="请输入需求名称"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="description" class="form-label">需求</label>
            <div class="text-xs text-gray-500 mb-1">尽量详细描叙你的需求</div>
            <textarea
              id="description"
              v-model="form.description"
              class="form-input h-32"
              placeholder="请详细描述您的需求..."
              required
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="price" class="form-label">价格 (RMB)</label>
              <input
                id="price"
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                class="form-input"
                placeholder="¥"
                required
              />
            </div>
            
            <div>
              <label for="timeframe" class="form-label">工期 (小时)</label>
              <input
                id="timeframe"
                v-model.number="form.timeframe"
                type="number"
                min="1"
                class="form-input"
                placeholder="小时为单位"
                required
              />
            </div>
          </div>
          
          <div v-if="!isAdmin" class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="client_name" class="form-label">姓名</label>
              <div class="text-xs text-gray-500 mb-1">会以您的姓氏称呼您</div>
              <input
                id="client_name"
                v-model="form.client_name"
                type="text"
                class="form-input"
                placeholder="您的姓名"
                required
              />
            </div>
            
            <div>
              <label for="contact" class="form-label">联系方式</label>
              <div class="text-xs text-gray-500 mb-1">只要能联系你的都可以</div>
              <input
                id="contact"
                v-model="form.contact"
                type="text"
                class="form-input"
                placeholder="电话/微信/邮箱等"
                required
              />
            </div>
          </div>
          
          <div v-if="isAdmin" class="mb-4">
            <label for="status" class="form-label">状态</label>
            <select id="status" v-model="form.status" class="form-input">
              <option value="待办">待办</option>
              <option value="正在">正在</option>
              <option value="待沟通">待沟通</option>
              <option value="已完成">已完成</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              class="btn-secondary"
              @click="$emit('close')"
            >
              取消
            </button>
            <button 
              type="button" 
              class="btn-primary"
              @click="confirmSubmit"
            >
              {{ confirmStep ? '确认提交' : '提交' }}
            </button>
          </div>
        </form>
        
        <div v-if="confirmStep && !isAdmin" class="mt-4 p-3 bg-blue-50 rounded-md text-blue-700 text-sm">
          <p class="font-medium">您确定这是您的需求吗？</p>
          <p class="mt-1">提交后我会尽快查看并与您联系。</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    isAdmin: {
      type: Boolean,
      default: false
    },
    editTask: {
      type: Object,
      default: null
    }
  });
  
  const emit = defineEmits(['submit', 'close']);
  
  const isEditing = ref(!!props.editTask);
  const confirmStep = ref(false);
  
  const form = reactive({
    title: '',
    description: '',
    price: '',
    timeframe: '',
    client_name: '',
    contact: '',
    status: '待办'
  });
  
  // 如果是编辑模式，填充表单
  watch(() => props.editTask, (newVal) => {
    if (newVal) {
      Object.keys(form).forEach(key => {
        if (key in newVal) {
          form[key] = newVal[key];
        }
      });
      isEditing.value = true;
    }
  }, { immediate: true });
  
  const confirmSubmit = () => {
    if (props.isAdmin || confirmStep.value) {
      submitForm();
    } else {
      confirmStep.value = true;
    }
  };
  
  const submitForm = () => {
    emit('submit', { ...form });
    emit('close');
  };
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>