/* eslint-disable react/react-in-jsx-scope */

import { ButtonType } from "../assets/types.d"
import Button from "../components/Button"


function Main(): JSX.Element {

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
        <p>There is not projects yet, <a href="/create">create new project</a></p>
      </section>
    </main>

  )
}

export default Main