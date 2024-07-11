/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef, useState } from "react"
import { SUPPORTED_TASK_STATES, Task, TaskStatesEnum } from "../../assets/types.d"
import { useProjectsContext } from "../../context/context"
import { formatDate } from "../../assets/formatDate.d"


interface Props {
  setShowViewModal: (boolean: boolean) => void
  showViewModal: boolean
  projectId: string
  taskId: string
}

function ViewTaskModal({ setShowViewModal, showViewModal, projectId, taskId }: Props): JSX.Element {

  const { projects, editTask } = useProjectsContext()
  const project = projects.find((p) => p.id === projectId)
  const currentTask = project?.tasks?.find((t) => t.id === taskId)
  const [stateChanged, setStateChanged] = useState(false)

  const refOne = useRef<HTMLElement>(null)

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setShowViewModal(false)
        setNewTask(INITIAL_STATE)
        setStateChanged(false)
      }
    }

    if (showViewModal) {
      document.addEventListener("mousedown", closeModal)
    } else {
      document.removeEventListener("mousedown", closeModal)
    }
  }, [showViewModal, setShowViewModal])

  const INITIAL_STATE: Task = {
    id: currentTask?.id || "",
    name: currentTask?.name || "",
    description: currentTask?.description || '',
    state: currentTask?.state || TaskStatesEnum.pending,
    notes: currentTask?.notes || [],
    createdDate: currentTask?.createdDate || 0,
    updatedDate: currentTask?.updatedDate || 0
  }

  const [newTask, setNewTask] = useState<Task>(INITIAL_STATE)

  const handleChangeState = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    editTask(projectId, taskId, newTask)
    setNewTask({ ...newTask, updatedDate: new Date().getTime() })
    setShowViewModal(false)
    setStateChanged(false)
  }

  return (
    <div className={showViewModal ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
      <section ref={refOne} className="ModalView Modal">
        <div className="viewHeader">
          <button className="blankButton" onClick={() => setShowViewModal(false)}>Back</button>
          <div className="date">
            <span className="noteTime created">Created {formatDate(currentTask?.createdDate)}</span>
            <span className="noteTime updated">Updated {formatDate(currentTask?.updatedDate)}</span>
          </div>
        </div>
        <h2>{currentTask?.name}</h2>
        <p>Description: {currentTask?.description}</p>
        <form onSubmit={handleChangeState} className="stateTaskForm">
          <label><span>State</span></label>
          <select onChange={(e) => {
            setStateChanged(true)
            setNewTask({
              ...newTask,
              state: e.target.value as TaskStatesEnum,
              updatedDate: new Date().getTime()
            })
          }} value={newTask?.state}>
            {
              Object.entries(SUPPORTED_TASK_STATES).map(
                ([key, literal]) => {
                  return <option key={key} value={key}>{literal}</option>
                })
            }
          </select>
          {stateChanged ? <input type="submit" value="Save" /> : ""}
        </form>
      </section>
    </div>
  )
}

export default ViewTaskModal