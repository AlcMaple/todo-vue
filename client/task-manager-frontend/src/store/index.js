// src/store/index.js
import { defineStore } from 'pinia'
import api from '../services/api'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getTodoTasks: (state) => state.tasks.filter(task => task.status === '待办'),
    getInProgressTasks: (state) => state.tasks.filter(task => task.status === '正在'),
    getPendingCommunicationTasks: (state) => state.tasks.filter(task => task.status === '待沟通'),
    getCompletedTasks: (state) => state.tasks.filter(task => task.status === '已完成')
  },
  
  actions: {
    async fetchTasks() {
        this.loading = true
        try {
          const response = await api.getTasks()
          
          // 更健壮的数据处理，处理不同可能的响应格式
          if (Array.isArray(response.data)) {
            this.tasks = response.data
          } else if (response.data && typeof response.data === 'object') {
            // 如果后端返回的是 { tasks: [...] } 格式
            this.tasks = Array.isArray(response.data.tasks) ? response.data.tasks : []
          } else {
            this.tasks = []
          }
          
        } catch (error) {
          this.error = error.message || '获取任务失败'
          console.error('Error fetching tasks:', error)
          this.tasks = [] // 确保在错误情况下也有一个有效的数组
        } finally {
          this.loading = false
        }
      },
    
    async addTask(task) {
      this.loading = true
      try {
        const response = await api.createTask(task)
        this.tasks.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message || '添加任务失败'
        console.error('Error adding task:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateTask(taskId, updatedTask) {
      this.loading = true
      try {
        const response = await api.updateTask(taskId, updatedTask)
        const index = this.tasks.findIndex(task => task.id === taskId)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message || '更新任务失败'
        console.error('Error updating task:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateTaskStatus(taskId, newStatus) {
        this.loading = true
        try {
          // 执行API调用更新状态
          const response = await api.updateTaskStatus(taskId, newStatus)
          // 在本地更新状态
          const index = this.tasks.findIndex(task => task.id === taskId)
          if (index !== -1) {
            this.tasks[index].status = newStatus
            this.tasks[index].updated_at = new Date().toISOString()
            console.log('状态已成功更新到:', newStatus);
          }
          return response.data
        } catch (error) {
          this.error = error.message || '更新任务状态失败'
          console.error('Error updating task status:', error)
          throw error
        } finally {
          this.loading = false
        }
      },
    
    async deleteTask(taskId) {
      this.loading = true
      try {
        await api.deleteTask(taskId)
        this.tasks = this.tasks.filter(task => task.id !== taskId)
      } catch (error) {
        this.error = error.message || '删除任务失败'
        console.error('Error deleting task:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})