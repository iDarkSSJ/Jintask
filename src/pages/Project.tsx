/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */

import { ButtonType, Task as TaskType, TaskStatesEnum } from "../assets/types.d"
import Button from "../components/Button"
import { useProjectsContext } from "../context/context"
import Task from "../components/Task"

type Props = {
  projectId: string
}
const tasks: TaskType[] = [
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task one",
  //   description: "Task one Description",
  //   state: TaskStatesEnum.completed
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task two",
  //   description: "Task two Description",
  //   state: TaskStatesEnum.pending
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task three",
  //   description: "Task three Description",
  //   state: TaskStatesEnum.inProgress
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task four",
  //   description: "Task four Description",
  //   state: TaskStatesEnum.onHold
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task five",
  //   description: "Task five Description",
  //   state: TaskStatesEnum.underReview
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task six",
  //   description: "Task six Description",
  //   state: TaskStatesEnum.completed
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task seven",
  //   description: "Task seven Description",
  //   state: TaskStatesEnum.completed
  // },
  // {
  //   id: crypto.randomUUID().toString(),
  //   name: "task eight",
  //   description: "Task eight Description",
  //   state: TaskStatesEnum.inProgress
  // }
]
function Project({ projectId }: Props) {

  const { projects } = useProjectsContext()
  const project = projects.find((p) => p.id === projectId)



  return (
    <main>
      <section className="projectFeatures">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
        <Button type={ButtonType.navigate}>Add Task</Button>
      </section>
      <section className="projectTasks">
        <h2>Tasks</h2>
        <section className="TasksList">
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#111025" } as React.CSSProperties}>Pending</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.pending) {
                  return <Task key={t.id} task={t} />
                } 
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f32b52" } as React.CSSProperties}>In Progress</h3>
            <div className="Tasks">
            {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.inProgress) {
                  return <Task key={t.id} task={t} />
                } 
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#535bf2" } as React.CSSProperties}>On Hold</h3>
            <div className="Tasks">
            {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.onHold) {
                  return <Task key={t.id} task={t} />
                } 
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f38bf2" } as React.CSSProperties}>Under Review</h3>
            <div className="Tasks">
            {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.underReview) {
                  return <Task key={t.id} task={t} />
                } 
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#53f352" } as React.CSSProperties}>Completed</h3>
            <div className="Tasks">
            {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.completed) {
                  return <Task key={t.id} task={t} />
                } 
              }) : null}
            </div>
          </div>
        </section>
          {tasks.length === 0 ? <h3 style={{textAlign: "center"}}>There are no tasks in this Project, <a>add a task</a> to see it.</h3> : ""}
      </section>
    </main>
  )
}

export default Project