/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, ReactNode, useEffect } from "react";
import useProjects from "./useProjects";
import { Note, Project, Task } from "../assets/types.d";


interface ProjectContextProps {
  projects: Project[];
  deleteProject: (projectId: string) => void;
  createProject: (project: Project) => void;
  editProject: (projectId: string, project: Project) => void;
  createTask: (projectId: string, task: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  editTask: (projectId: string, taskId: string, task: Task) => void;
  createTaskNote: (projectId: string, taskId: string, note: Note) => void;
  deleteTaskNote: (projectId: string, taskId: string, noteId: string) => void;
}


const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  const {
    projects,
    state,
    deleteProject,
    createProject,
    editProject,
    createTask,
    deleteTask,
    editTask,
    createTaskNote,
    deleteTaskNote,
  } = useProjects();

  // ----------------------------------------------------------------
  // ---------------------SAVE IN LOCAL STORAGE----------------------
  // ----------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(state));
  }, [state])


  const value = {
    projects,
    deleteProject,
    createProject,
    editProject,
    createTask,
    deleteTask,
    editTask,
    createTaskNote,
    deleteTaskNote
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};


export const useProjectsContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectsContext must be used within a Provider');
  }
  return context;
};

export default Provider;
