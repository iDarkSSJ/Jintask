/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/react-in-jsx-scope */

import { FormEvent, useEffect, useRef, useState } from "react"
import { useProjectsContext } from "../../context/context"
import { SUPPORTED_TASK_STATES, TaskStatesEnum, Task as taskType } from "../../assets/types.d"

interface Props {
  showEditModal: boolean
  setShowEditModal: (value: boolean) => void
  projectId: string
  taskId: string
}

function EditTaskModal({ showEditModal, projectId, setShowEditModal, taskId }: Props): JSX.Element {
  const { editTask, projects } = useProjectsContext()
  const refOne = useRef<HTMLElement>(null)
  const project = projects.find(project => project.id === projectId)
  const task = project?.tasks?.find(task => task.id === taskId)

  const INITIAL_STATE: taskType = {
    id: task?.id || "",
    name: task?.name || "",
    description: task?.description || '',
    state: task?.state || TaskStatesEnum.pending
  }

  const [newTask, setNewTask] = useState<taskType>(INITIAL_STATE)
  
  useEffect(() => {
    const closeModal = (e: MouseEvent):void => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setShowEditModal(false)
        setNewTask(INITIAL_STATE)
      }
    }

    if (showEditModal) {
      document.addEventListener("mousedown", closeModal)
    } else {
      document.removeEventListener("mousedown", closeModal)
    }
  }, [showEditModal, setShowEditModal, INITIAL_STATE])

  const handleEditTask = (e: FormEvent): void => {
    e.preventDefault()
    setShowEditModal(false)
    editTask(projectId, taskId, newTask)
    setNewTask(INITIAL_STATE)
  }

  return (
    <div className={showEditModal ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
      <section ref={refOne} className="ModalEdit Modal">
        <h2>Edit Task</h2>
        <p>Fill out the form to edit the task.</p>

        <form onSubmit={handleEditTask} className="editTaskForm">
          <label>
          <span>State:</span>  
          <select onChange={(e) => setNewTask({...newTask, state: e.target.value as TaskStatesEnum})} value={newTask?.state}>
            {
              Object.entries(SUPPORTED_TASK_STATES).map(([key, literal]) => {
                return <option key={key} value={key}>{literal}</option>
              })
            }
          </select>
          </label>
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

export default EditTaskModal