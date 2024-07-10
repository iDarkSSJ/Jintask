/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"
import { ButtonType } from "../assets/types.d"
import Button from "../components/Button"
import Project from "../components/ProjectInMain"
import { useProjectsContext } from "../context/context"


function Main(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const { projects } = useProjectsContext()
  return (

    <main>

      <section className="myProjects">
        <h2>My Projects</h2>
        <p>Manage and administer your projects</p>
        <Button type={ButtonType.navigate} path="create">
          Create Project
        </Button>
      </section>

      <section className="projects">
        {projects.length === 0 ? <p>There is not projects yet, <a href="/create">create new project</a></p> : ""}
        {projects && projects.map(project =>
          <Project
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          key={project.id}
          title={project.name}
          client={project.client}
          description={project.description}
          projectId={project.id}
          />
        )}
      </section>
    </main>

  )
}

export default Main