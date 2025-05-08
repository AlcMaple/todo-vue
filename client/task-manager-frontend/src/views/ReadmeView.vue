<template>
    <div>
      <Header>
        <template #actions>
          <a 
            href="/" 
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            返回看板
          </a>
        </template>
      </Header>
      
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">✓ Done - 任务管理系统使用说明</h1>
          
          <div class="prose max-w-none">
            <h2 class="text-xl font-semibold mt-6 mb-3">系统简介</h2>
            <p>
              ✓ Done 是一个简单高效的任务管理系统，可以帮助您跟踪和管理各种任务的进度。
              系统将任务分为四种状态：待办、正在、待沟通和已完成，让您能够清晰地了解任务的当前状态。
            </p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">用户界面</h2>
            <p>在用户界面，您可以：</p>
            <ul class="list-disc pl-5 mt-2 mb-4">
              <li>查看所有任务及其当前状态</li>
              <li>点击"添加任务"按钮提交新的任务请求</li>
              <li>查看任务详情</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">添加任务</h2>
            <p>
              要添加新任务，只需点击"待办"列中的"+"按钮，填写任务表单，包括任务名称、
              描述和联系方式，然后提交即可。新任务将自动添加到"待办"列中。
            </p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">状态说明</h2>
            <ul class="mt-2 mb-4">
              <li class="mb-3">
                <strong class="text-blue-600">待办：</strong> 
                <span>新提交的尚未开始处理的任务</span>
              </li>
              <li class="mb-3">
                <strong class="text-indigo-600">正在：</strong> 
                <span>正在处理中的任务</span>
              </li>
              <li class="mb-3">
                <strong class="text-yellow-600">待沟通：</strong> 
                <span>需要进一步沟通或确认的任务</span>
              </li>
              <li class="mb-3">
                <strong class="text-green-600">已完成：</strong> 
                <span>已经完成的任务</span>
              </li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">系统管理</h2>
            <p>
              系统管理功能仅限授权管理员使用。管理员可以执行以下操作：
            </p>
            <ul class="list-disc pl-5 mt-2 mb-4">
              <li>添加新任务</li>
              <li>编辑现有任务</li>
              <li>更改任务状态</li>
              <li>删除任务</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">联系我们</h2>
            <p>
              如果您有任何问题或建议，请通过以下方式联系我们：
            </p>
            <ul class="list-disc pl-5 mt-2">
              <li>GitHub: <a href="https://github.com/HGYJLLK" target="_blank" class="text-blue-600 hover:underline">https://github.com/HGYJLLK</a></li>
              <li>博客: <a href="https://blog.hgyjllk.top/" target="_blank" class="text-blue-600 hover:underline">https://blog.hgyjllk.top/</a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue';
  </script>
  
  <style>
  .prose {
    color: #374151;
    line-height: 1.6;
  }
  .prose h2 {
    color: #1f2937;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .prose p {
    margin-bottom: 1rem;
  }
  .prose ul {
    margin-bottom: 1rem;
  }
  </style>