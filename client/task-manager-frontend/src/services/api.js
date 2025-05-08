// src/services/api.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://py.hgyjllk.top/api', // 修改为HTTPS
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  // 获取所有任务
  getTasks() {
    return apiClient.get('/tasks')
  },
  
  // 获取单个任务
  getTask(id) {
    return apiClient.get(`/tasks/${id}`)
  },
  
  // 创建新任务
  createTask(task) {
    return apiClient.post('/tasks', task)
  },
  
  // 更新任务
  updateTask(id, task) {
    return apiClient.put(`/tasks/${id}`, task)
  },
  
  // 更新任务状态
  updateTaskStatus(id, status) {
    return apiClient.put(`/tasks/${id}/status`, { status })
  },
  
  // 删除任务
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`)
  },
  
  // 获取最后编辑时间
  getLastEditTime() {
    return apiClient.get('/last-edit-time')
  }
}