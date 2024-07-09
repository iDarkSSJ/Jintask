/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useRef, useState } from "react"
import { VerticalMenu } from "../assets/icons"
import { ButtonType } from "../assets/types.d"
import Button from "./Button"

type Props = {
  task: {
    id: string
    name: string
    description: string
  }
}

function Task({ task }: Props): JSX.Element {
  const [onView, setOnView] = useState(false)

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

  // const handleDeleteModal = (): void => {
  //   setShowModal(true)
  // }

  return (
    <div className="Task">
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <button className="icon-button" onClick={handleOnClick}>
        <VerticalMenu />
      </button>
      <div ref={refOne} className={onView ? "taskMenuButton onView" : "taskMenuButton"}>
        <Button type={ButtonType.navigate} path={"/"}>View</Button>
        <Button type={ButtonType.navigate} path={"/"}>Edit Project</Button>
        <button>Delete Project</button>
      </div>
    </div>
  )
}

export default Task