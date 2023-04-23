'use client'
import { v4 } from 'uuid'
import { useState } from 'react'
import { Task } from './@types/task'
import { useTasks } from './stores/useTasks'

export default function Home() {
  const [tasks, addTask] = useTasks((state) => [state.tasks, state.addTask])

  const [description, setDescription] = useState('')

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value)
  }

  const handleAddTask = () => {
    addTask({
      id: v4(),
      description,
      completed: false,
    })
    setDescription('')
  }

  const counter = tasks.length

  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-10 bg-gray-300 ">
      <section className="flex gap-2">
        <input
          type="text"
          value={description}
          className="text-black appearance-none focus:outline-none p-2 rounded-md"
          placeholder="Buy some food..."
          onChange={(e) => handleChangeDescription(e)}
        />
        <button
          type="button"
          className="bg-blue-300 text-blue-500 rounded-md p-2 hover:brightness-95 transition-all"
          onClick={handleAddTask}
        >
          Create
        </button>
      </section>
      <section className="w-full flex flex-col gap-2">
        {tasks.map((task) => <Task key={task.id} {...task} />).reverse()}
      </section>
    </main>
  )
}

type TaskProps = Task

function Task({ id, completed, description }: TaskProps) {
  const [removeTask, toggleTask] = useTasks((state) => [
    state.removeTask,
    state.toggleTask,
  ])

  const validDescription = description.length > 0 ? description : '-'

  const handleToggleTask = () => {
    toggleTask(id ?? '')
  }

  const handleRemoveTask = () => {
    removeTask(id ?? '')
  }

  return (
    <div className="flex flex-row gap-2 rounded-md bg-blue-300 p-2 text-blue-600 w-full items-center">
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer"
        value={String(completed)}
        onClick={handleToggleTask}
      />
      <span>{validDescription}</span>
      <button
        type="button"
        className="ml-auto hover:brightness-95 bg-blue-300 p-2 rounded-md transition-all  "
        onClick={handleRemoveTask}
      >
        Delete
      </button>
    </div>
  )
}
