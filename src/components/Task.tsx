/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef, useState } from "react"
import { VerticalMenu } from "../assets/icons"
import { TaskModalName } from "../assets/types.d"
import DeleteTaskModal from "./Modal/DeleteTaskModal"
import EditTaskModal from "./Modal/EditTaskModal"
import ViewTaskModal from "./Modal/ViewTaskModal"

type Props = {
  projectId: string
  task: {
    id: string
    name: string
    description: string
  }
}

function Task({ task, projectId }: Props): JSX.Element {
  const [onView, setOnView] = useState(false)
  const [showDelModal, setShowDelModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)



  const refOne = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setOnView(false)
      }
    }

    if (onView) {
      window.addEventListener("click", closeMenu)
    }
    return () => {
      window.removeEventListener("click", closeMenu)
    }
  }, [onView])

  const handleOnClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setOnView(!onView)
  }

  const handleModal = (name: TaskModalName): void => {
    if (name === TaskModalName.EDIT_TASK) {
      setShowEditModal(true)
    }
    if (name === TaskModalName.DELETE_TASK) {
      setShowDelModal(true)
    }
    if (name === TaskModalName.VIEW_TASK) {
      setShowViewModal(true)
    }
  }

  return (
    <div className="Task">
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <button className="icon-button" onClick={handleOnClick}>
        <VerticalMenu />
      </button>
      <div ref={refOne} className={onView ? "taskMenuButton onView" : "taskMenuButton"}>
        <button onClick={() => handleModal(TaskModalName.VIEW_TASK)}>View</button>
        <button onClick={() => handleModal(TaskModalName.EDIT_TASK)}>Edit Task</button>
        <button onClick={() => handleModal(TaskModalName.DELETE_TASK)}>Delete Task</button>
      </div>

      <DeleteTaskModal projectId={projectId} taskId={task.id} showDelModal={showDelModal} setShowDelModal={setShowDelModal} />

      <EditTaskModal projectId={projectId} taskId={task.id} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />

      <ViewTaskModal projectId={projectId} taskId={task.id} showViewModal={showViewModal} setShowViewModal={setShowViewModal} />

    </div>
  )
}

export default Task