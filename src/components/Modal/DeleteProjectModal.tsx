/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef } from "react"
import { useProjectsContext } from "../../context/context"

interface Props {
  projectId: string
  modalOnView: boolean
  setModalOnView: (onView: boolean) => void
}

function DeleteProjectModal({ projectId, modalOnView, setModalOnView }: Props): JSX.Element {
  const refModal = useRef<HTMLElement>(null)
  const { deleteProject } = useProjectsContext()

  const handleClickOutside = (e: MouseEvent) => {
    if (
      refModal.current &&
      !refModal.current?.contains(e.target as Node)
    ) {
      setModalOnView(false)
    }
  }

  useEffect(()=> {
    if (modalOnView) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [modalOnView, setModalOnView])


  return (
    <div className={modalOnView ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
      <section ref={refModal} className="ModalDelete Modal">
        <h3>Are you sure that you want to delete this project?</h3>
        <p>This action is irreversible</p>
        <div className="barRow">
          <button className="blankButton" onClick={() => setModalOnView(false)}>Cancel</button>
          <button onClick={() => deleteProject(projectId)}>Agree</button>
        </div>
      </section>
    </div>
  )
}

export default DeleteProjectModal