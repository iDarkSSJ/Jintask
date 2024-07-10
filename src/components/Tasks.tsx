/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"
import { TaskStatesEnum, Task as TaskType } from "../assets/types.d"
import Task from "./Task"

interface Props {
  projectId: string,
  tasks: TaskType[] | undefined
}

function TasksList({ projectId, tasks }: Props): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  return (
    <section className="TasksList">
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#111025" } as React.CSSProperties}>Pending</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.pending) {
                  return <Task menuOpen={menuOpen} setMenuOpen={setMenuOpen} projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f32b52" } as React.CSSProperties}>In Progress</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.inProgress) {
                  return <Task menuOpen={menuOpen} setMenuOpen={setMenuOpen} projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#535bf2" } as React.CSSProperties}>On Hold</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.onHold) {
                  return <Task menuOpen={menuOpen} setMenuOpen={setMenuOpen} projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#f38bf2" } as React.CSSProperties}>Under Review</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.underReview) {
                  return <Task menuOpen={menuOpen} setMenuOpen={setMenuOpen} projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
          <div className="TaskStatus">
            <h3 style={{ "--border-color": "#53f352" } as React.CSSProperties}>Completed</h3>
            <div className="Tasks">
              {tasks ? tasks.map((t) => {
                if (t.state === TaskStatesEnum.completed) {
                  return <Task menuOpen={menuOpen} setMenuOpen={setMenuOpen} projectId={projectId} key={t.id} task={t} />
                }
              }) : null}
            </div>
          </div>
        </section>
  )
}

export default TasksList