from fastapi import FastAPI, HTTPException,Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from datetime import datetime

app = FastAPI(title="✓ Done - 任务管理系统")

# 允许跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中，应该设置为特定的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据文件路径
DATA_FILE = "tasks.json"

# 初始化数据文件
def init_data_file():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "tasks": [],
                "next_id": 1
            }, f, ensure_ascii=False)

# 任务模型
class Task(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    price: float
    timeframe: int
    client_name: str
    contact: str
    status: str = "待办"  # 待办, 正在, 待沟通, 已完成
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# 读取任务
def read_tasks():
    init_data_file()
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

# 保存任务
def save_tasks(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 获取所有任务
@app.get("/api/tasks")
def get_tasks():
    data = read_tasks()
    return data["tasks"]

# 获取单个任务
@app.get("/api/tasks/{task_id}")
def get_task(task_id: int):
    data = read_tasks()
    for task in data["tasks"]:
        if task["id"] == task_id:
            return task
    raise HTTPException(status_code=404, detail="任务未找到")

# 添加任务
@app.post("/api/tasks")
def add_task(task: Task):
    data = read_tasks()
    now = datetime.now().isoformat()
    
    new_task = task.dict()
    new_task["id"] = data["next_id"]
    new_task["created_at"] = now
    new_task["updated_at"] = now
    
    data["tasks"].append(new_task)
    data["next_id"] += 1
    
    save_tasks(data)
    return new_task

# 更新任务
@app.put("/api/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    data = read_tasks()
    
    for i, t in enumerate(data["tasks"]):
        if t["id"] == task_id:
            updated_task = task.dict()
            updated_task["id"] = task_id
            updated_task["created_at"] = t["created_at"]
            updated_task["updated_at"] = datetime.now().isoformat()
            
            data["tasks"][i] = updated_task
            save_tasks(data)
            return updated_task
            
    raise HTTPException(status_code=404, detail="任务未找到")

# 更新任务状态
@app.put("/api/tasks/{task_id}/status")
def update_task_status(task_id: int, status: str = Body(..., embed=True)):
    data = read_tasks()
    
    for i, task in enumerate(data["tasks"]):
        if task["id"] == task_id:
            data["tasks"][i]["status"] = status
            data["tasks"][i]["updated_at"] = datetime.now().isoformat()
            
            save_tasks(data)
            return data["tasks"][i]
            
    raise HTTPException(status_code=404, detail="任务未找到")

# 删除任务
@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int):
    data = read_tasks()
    
    for i, task in enumerate(data["tasks"]):
        if task["id"] == task_id:
            del data["tasks"][i]
            save_tasks(data)
            return {"message": "任务已删除"}
            
    raise HTTPException(status_code=404, detail="任务未找到")

if __name__ == "__main__":
    import uvicorn
    init_data_file()
    uvicorn.run(app, host="0.0.0.0", port=8000)