/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */

import { ButtonType, TaskStatesEnum } from "../assets/types.d"
import Button from "../components/Button"
import { useProjectsContext } from "../context/context"
import Task from "../components/Task"
import { useState } from "react"
import CreateTaskModal from "../components/Modal/CreateTaskModal"

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
        <section className="TasksList">
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#111025" } as React.CSSProperties}>Pending</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.pending) {
                  return <Task projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f32b52" } as React.CSSProperties}>In Progress</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.inProgress) {
                  return <Task projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#535bf2" } as React.CSSProperties}>On Hold</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.onHold) {
                  return <Task projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f38bf2" } as React.CSSProperties}>Under Review</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.underReview) {
                  return <Task projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#53f352" } as React.CSSProperties}>Completed</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.completed) {
                  return <Task projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
        </section>
        {tasks?.length === 0 ? <h3 style={{ textAlign: "center" }}>There are no tasks in this Project, <a>add a task</a> to see it.</h3> : ""}
      </section>
      {showCreateModal ? <CreateTaskModal projectId={projectId} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} /> : ""}
    </main>
  )
}

export default Project