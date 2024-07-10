/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef } from "react"
import { useProjectsContext } from "../../context/context"

interface Props {
  showDelModal: boolean
  projectId: string
  taskId: string
  setShowDelModal: (value: boolean) => void
}

function DeleteTaskModal({ showDelModal, projectId, taskId, setShowDelModal }: Props): JSX.Element {
  const {
    deleteTask
  } = useProjectsContext()

  const refOne = useRef<HTMLElement>(null)

  useEffect(() => {
    const closeModal = (e: MouseEvent): void => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setShowDelModal(false)
      }
    }

    if (showDelModal) document.addEventListener("mousedown", closeModal)
      else document.removeEventListener("mousedown", closeModal)
  })

  return (
    <div className={showDelModal ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
      <section ref={refOne} className="ModalDelete Modal">
        <h3>Are you sure that you want to delete this task?</h3>
        <p>This action is irreversible</p>
        <div className="barRow">
          <button className="blankButton" onClick={() => setShowDelModal(false)}>Cancel</button>
          <button onClick={() => deleteTask(projectId, taskId)}>Agree</button>
        </div>
      </section>
    </div>
  )
}

export default DeleteTaskModal