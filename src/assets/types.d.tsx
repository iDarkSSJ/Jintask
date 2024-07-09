export enum ButtonType {
  classic = "classic",
  navigate = "navigate"
}

export enum TaskStatesEnum {
  pending = "pending",
  inProgress = "inProgress",
  onHold = "onHold",
  underReview = "underReview",
  completed = "completed"
}

const SUPPORTED_TASK_STATES = {
  pending: "pending",
  inProgress: "inProgress",
  onHold: "onHold",
  underReview: "underReview",
  completed: "completed"
}

export type TaskStates = keyof typeof SUPPORTED_TASK_STATES

export interface Task {
  id: string
  name: string
  description: string
  state: TaskStates
}

export interface Project {
  id: string
  name: string
  description: string
  client: string
  tasks?: Task[]
}

export interface State {
  projects: Project[]
}

export type Action =
  | { type: "SAVE_STATE", payload: { data: State } }
  | { type: "DELETE_PROJECT", payload: { projectId:  string} }
  | { type: "CREATE_PROJECT", payload: { Project : Project} }
  | { type: "EDIT_PROJECT", payload: { projectId: string, Project: Project } }
  | { type: "CREATE_TASK", payload: { projectId: string, Task: Task} }
  | { type: "DELETE_TASK", payload: { projectId: string, taskId: string } }
  | { type: "EDIT_TASK", payload: { projectId: string, taskId: string, Task: Task } }