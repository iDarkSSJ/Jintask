/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from "react"
import { VerticalMenu } from "../assets/icons"
import { ButtonType } from "../assets/types.d"
import Button from "./Button"
import DeleteProjectModal from "./Modal/DeleteProjectModal"
import { Link } from "react-router-dom"

type ProjectProps = {
  title: string
  description: string
  client: string
  projectId: string
  menuOpen: string | null
  setMenuOpen: (isOpen: string) => void
}


function ProjectInMain({ title, description, client, projectId, menuOpen, setMenuOpen }: ProjectProps): JSX.Element {
  const [modalOnView, setModalOnView] = useState(false)
  const refMenu = useRef<HTMLDivElement>(null)
  const refButton = useRef<HTMLButtonElement>(null)

  const handleOnClick = () => {
    const newMenuOpen = menuOpen === projectId ? "" : projectId
    setMenuOpen(newMenuOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      refMenu.current &&
      refButton.current &&
      !refMenu.current.contains(event.target as Node) &&
      !refButton.current.contains(event.target as Node)
    ) {
      setMenuOpen("")
    }
  }

  useEffect(() => {
    if (menuOpen === projectId) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen, projectId])


  const handleDeleteModal = (): void => {
    setModalOnView(true)
  }

  return (
    <article className="project">
      <h3><Link to={`/project/${projectId}`}>{title}</Link></h3>
      <p>Client: {client}</p>
      <p>{description}</p>
      <div className="MenuDropDown">
        <button ref={refButton} className="icon-button" onClick={handleOnClick}>
          <VerticalMenu />
        </button>
        <div ref={refMenu} className={menuOpen === projectId ? "projectMenuButton onView" : "projectMenuButton"}>
          <Button type={ButtonType.navigate} path={`project/${projectId}`}>View</Button>
          <Button type={ButtonType.navigate} path={`edit/${projectId}`}>Edit Project</Button>
          <button onClick={handleDeleteModal}>Delete Project</button>
        </div>
      </div>

      <DeleteProjectModal setModalOnView={setModalOnView} modalOnView={modalOnView} projectId={projectId}/>
      
    </article>
  )
}

export default ProjectInMain;
