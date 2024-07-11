/* eslint-disable react/react-in-jsx-scope */

import { ChangeEvent, FormEvent, useState } from "react"
import { useProjectsContext } from "../context/context"

interface Props {
  projectId: string
  taskId: string
}

interface Note {
  id: string,
  content: string,
  createdDate: number
}

const INITIAL_STATE: Note = {
  id: '',
  content: '',
  createdDate: 0
}

function CreateNoteForm({ projectId, taskId }: Props): JSX.Element {
  const [newNote, setNewNote] = useState<Note>(INITIAL_STATE)
  const { createTaskNote } = useProjectsContext()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewNote({
      ...newNote,
      id: crypto.randomUUID().toString(),
      content: e.target.value,
      createdDate: new Date().getTime(),
    })
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    createTaskNote(projectId, taskId, newNote)
  }


  return (
    <form onSubmit={handleFormSubmit} className="createNoteForm">
      <label>
        <span>Create Note</span>
        <input onChange={handleChange} type="text" required placeholder="Note Content" />
      </label>
      <input type="submit" value="Create Note" />
    </form>
  )
}

export default CreateNoteForm