/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef, useState } from "react"
import { VerticalMenu } from "../assets/icons"
import { TaskModalName } from "../assets/types.d"
import DeleteTaskModal from "./Modal/DeleteTaskModal"
import EditTaskModal from "./Modal/EditTaskModal"
import ViewTaskModal from "./Modal/ViewTaskModal"

type Props = {
  projectId: string
  menuOpen: string | null
  setMenuOpen: (menu: string | null) => void
  task: {
    id: string
    name: string
    description: string
  }
}

function Task({ task, projectId, menuOpen, setMenuOpen }: Props): JSX.Element {
  const [onView, setOnView] = useState<boolean>(false)
  const [showDelModal, setShowDelModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)


  const refOne = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      e.stopPropagation()
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setOnView(false)
      }
    }

    if (onView && menuOpen === task.id) window.addEventListener("click", closeMenu)
      else {
        window.removeEventListener("mousedown", closeMenu)
        setOnView(false)
      }
    
  }, [onView, menuOpen, setMenuOpen, task.id])

  const handleOnClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setMenuOpen(task.id)
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
      <div ref={refOne} className={onView && menuOpen === task.id ? "taskMenuButton onView" : "taskMenuButton"}>
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