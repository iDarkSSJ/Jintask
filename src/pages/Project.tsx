/* eslint-disable react/react-in-jsx-scope */

import Button from "../components/Button"
import { useProjectsContext } from "../context/context"
import { useState } from "react"
import CreateTaskModal from "../components/Modal/CreateTaskModal"
import TasksList from "../components/Tasks"
import { ButtonType } from "../assets/types.d"

type Props = {
  projectId: string
}

function Project({ projectId }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const { projects } = useProjectsContext()
  const project = projects.find((p) => p.id === projectId)
  const tasks = project?.tasks


  return (
    <main>
      <section className="projectFeatures">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
        <div className="wrapper">
          <Button type={ButtonType.navigate}>Back to Projects</Button>
          <button onClick={() => setShowCreateModal(true)}>Add Task</button>
        </div>
      </section>
      <section className="projectTasks">
        <h2>Tasks</h2>
        <TasksList projectId={projectId} tasks={tasks}/>
        {tasks?.length === 0 ? <h3 style={{ textAlign: "center" }}>There are no tasks in this Project, <a>add a task</a> to see it.</h3> : ""}
      </section>
      {showCreateModal ? <CreateTaskModal projectId={projectId} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} /> : ""}
    </main>
  )
}

export default Project