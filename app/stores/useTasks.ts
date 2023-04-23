import { create } from 'zustand'
import { Task } from '../@types/task'

type States = {
  tasks: Task[]
}

type Actions = {
  addTask: (task: Task) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
}

export const useTasks = create<States & Actions>((set) => ({
  // States
  tasks: [],

  // Actions
  addTask: (task) => set(({ tasks }) => ({ tasks: [...tasks, task] })),
  removeTask: (id) =>
    set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) })),
  toggleTask: (id) =>
    set(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),
}))
