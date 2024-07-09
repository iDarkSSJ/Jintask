/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from "react";
import { VerticalMenu } from "../assets/icons";
import { ButtonType } from "../assets/types.d";
import Button from "./Button";
import { useProjectsContext } from "../context/context";

type ProjectProps = {
  title: string;
  description: string;
  client: string;
  projectId: string;
};


function ProjectInMain({ title, description, client, projectId }: ProjectProps): JSX.Element {
  const [onView, setOnView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { deleteProject } = useProjectsContext()

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

  const handleDeleteModal = (): void => {
    setShowModal(true)
  }
  
  return (
    <article className="project">
      <h3><a href={"/project/" + projectId}>{title}</a></h3>
      <p>Client: {client}</p>
      <p>{description}</p>
      <button className="icon-button" onClick={handleOnClick}>
        <VerticalMenu />
      </button>
      <div className={onView ? "projectMenuButton onView" : "projectMenuButton"} ref={refOne}>
        <Button type={ButtonType.navigate} path={`project/${projectId}`}>View</Button>
        <Button type={ButtonType.navigate} path={`edit/${projectId}/${title}/${description}/${client}`}>Edit Project</Button>
        <button onClick={handleDeleteModal}>Delete Project</button>
      </div>
      <div className={showModal ? "ModalWrapper ModalOnView" : "ModalWrapper"}>
        <section className="ModalDelete Modal">
          <h3>Are you sure that you want to delete this project?</h3>
          <p>This action is irreversible</p>
          <div className="barRow">
            <button className="blankButton" onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={() => deleteProject(projectId)}>Agree</button>
          </div>
        </section>
      </div>
    </article>
  );
}

export default ProjectInMain;
