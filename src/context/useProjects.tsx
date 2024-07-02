import { useReducer } from 'react'
import { Action, Project, State, Task } from '../assets/types.d'



const reducer = (state: State, action: Action): State => {
  const { type } = action

  if (type === "DELETE_PROJECT") {
    const { projectId } = action.payload
    const newProjects = state.projects.filter(project => project.id !== projectId)

    return {
      ...state,
      projects: newProjects
    }
  }


  if (type === "CREATE_PROJECT") {
    const { Project } = action.payload
    return {
      ...state,
      projects: [...state.projects, Project]
    }
  }

  if (type === "EDIT_PROJECT") {
    const { projectId, Project } = action.payload

    const newProjectsList = state.projects.map(project => {
      if (project.id === projectId) {
        return Project
      }
      return project
    })

    return {
      ...state,
      projects: newProjectsList
    }
  }

  if (type === "CREATE_TASK") {
    const { projectId, Task } = action.payload;
    return {
      ...state,
      projects: state.projects.map(project =>
        project.id === projectId ? { ...project, tasks: [...(project.tasks || []), Task] } : project
      ),
    };
  }

  if (type === "DELETE_TASK") {
    const { projectId, taskId } = action.payload
    return {
      ...state,
      projects: state.projects.map(project =>
        project.id === projectId ? {
          ...project,
          tasks: project.tasks?.filter(task =>
            task.id !== taskId)
        } : project
      )
    }
  }

  if (type === "EDIT_TASK") {
    const { projectId, taskId, Task } = action.payload
    return {
      projects: state.projects.map(project =>
        project.id === projectId ? {
          ...project,
          tasks: project.tasks?.map(task =>
            task.id === taskId ? Task : task
          )
        } : project
      )
    }
  }

  return state
}


const INITIAL_STATE: State = {
  projects: []
}


export const useProjects = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const deleteProject = (projectId: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: { projectId } });
  };

  const createProject = (project: Project) => {
    dispatch({ type: 'CREATE_PROJECT', payload: { Project: project } });
  };

  const editProject = (projectId: string, project: Project) => {
    dispatch({ type: 'EDIT_PROJECT', payload: { projectId, Project: project } });
  };

  const createTask = (projectId: string, task: Task) => {
    dispatch({ type: 'CREATE_TASK', payload: { projectId, Task: task } });
  };

  const deleteTask = (projectId: string, taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { projectId, taskId } });
  };

  const editTask = (projectId: string, taskId: string, task: Task) => {
    dispatch({ type: 'EDIT_TASK', payload: { projectId, taskId, Task: task } });
  };

  return {
    projects: state.projects,
    deleteProject,
    createProject,
    editProject,
    createTask,
    deleteTask,
    editTask,
  };
}

export default useProjects