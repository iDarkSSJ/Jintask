/* eslint-disable react/react-in-jsx-scope */

import { ButtonType } from "../assets/types.d"
import Button from "../components/Button"


function CreateProject(): JSX.Element {
  return (
    <main className="createProject">
      <section>
        <h2>Create project</h2>
        <p>Fill out the form below to create a project.</p>
        <Button type={ButtonType.navigate}>
          Back to Projects
        </Button>

      </section>
      <form className="createProjectForm">
        <label>
          <input type="text" placeholder="Project name" />
        </label>
        <label>
          <input type="text" placeholder="Project description" />
        </label>
        <input type="text" />
      </form>
    </main>
  )
}

export default CreateProject