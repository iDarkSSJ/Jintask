/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react"
import { ButtonType, Project } from "../assets/types.d"
import Button from "../components/Button"
import { useProjectsContext } from "../context/context"
import { useParams } from "react-router-dom"

function EditProject(): JSX.Element {
  const params = useParams()
  const { projects } = useProjectsContext()

  const project = projects.find(project => project.id === params.id)

  useEffect(()=> {
    if (project === undefined) {
      window.location.href = '/'
      return
    }
  }, [project])

  const INITIAL_STATE: Project = {
    id: project?.id || "",
    name: project?.name || "",
    client: project?.client ||'',
    description: project?.description || '',
    tasks: project?.tasks || []
  }

  const [inputs, setInputs] = useState(INITIAL_STATE)

  const { editProject } = useProjectsContext()

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setInputs(INITIAL_STATE)
    project ? editProject(project.id,inputs) : null
    window.location.href = '/'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  return (
    <main className="createProject">
      <section>
        <h2>Edit project</h2>
        <p>Fill out the form below to edit a project.</p>
        <Button type={ButtonType.navigate}>
          Back to Projects
        </Button>

      </section>
      <form className="createProjectForm" onSubmit={(e)=>handleOnSubmit(e)}>
        <label>
          <span>Project Name</span>
          <input value={inputs.name} required type="text" name="name" placeholder="Project name" onChange={e=>handleChange(e)} />
        </label>
        <label>
          <span>Client</span>
          <input value={inputs.client} required type="text" name="client" placeholder="Project Client" onChange={e=>handleChange(e)} />
        </label>
        <label>
          <span>Project Description</span>
          <textarea value={inputs.description} required rows={6} maxLength={400} name="description" placeholder="Project description" onChange={e=>handleChange(e)} />
        </label>
        <input type="submit" value={"Save"}/>
      </form>
    </main>
  )
}

export default EditProject