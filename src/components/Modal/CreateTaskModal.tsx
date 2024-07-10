/* eslint-disable react/react-in-jsx-scope */

import { FormEvent, useEffect, useRef, useState } from "react"
import { useProjectsContext } from "../../context/context"
import { TaskStatesEnum, Task as taskType } from "../../assets/types.d"

interface Props {
  showCreateModal: boolean
  setShowCreateModal: (value: boolean) => void
  projectId: string
}

const INITIAL_STATE: taskType = {
  id: "",
  name: "",
  description: "",
  state: TaskStatesEnum.pending
}

function CreateTaskModal({ showCreateModal, projectId, setShowCreateModal }: Props): JSX.Element {
  const { createTask } = useProjectsContext()
  const refOne = useRef<HTMLElement>(null)

  const [newTask, setNewTask] = useState<taskType>(INITIAL_STATE)
  
  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setShowCreateModal(false)
      }
    }

    if (showCreateModal) {
      document.addEventListener("mousedown", closeModal)
    } else {
      document.removeEventListener("mousedown", closeModal)
    }
    return () => {
      document.removeEventListener("mousedown", closeModal)
    }
  }, [showCreateModal, setShowCreateModal])

  const handleCreateTask = (e: FormEvent): void => {
    e.preventDefault()
    setShowCreateModal(false)
    createTask(projectId, newTask)
    setNewTask(INITIAL_STATE)
  }

  return (
    <div className={showCreateModal ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
      <section ref={refOne} className="ModalCreate Modal">
        <h2>New Task</h2>
        <p>Fill out the form and create a task.</p>

        <form onSubmit={handleCreateTask} className="createTaskForm">
          <label>
            <span>Task Name:</span>
            <input
              autoFocus
              required
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value, id: crypto.randomUUID().toString() })}
            />
          </label>
          <label>
            <span>Task Description:</span>
            <textarea
              required
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </label>
          <input type="submit" value="Add" />
        </form>

      </section>
    </div>
  )
}

export default CreateTaskModal