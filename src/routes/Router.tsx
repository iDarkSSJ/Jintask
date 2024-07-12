/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, Navigate, HashRouter } from "react-router-dom"
import Main from "../pages/Main"
import CreateProject from "../pages/CreateProject"
import { useProjectsContext } from "../context/context"
import EditProject from "../pages/EditPage"
import Project from "../pages/Project"

function Router(): JSX.Element {
  const { projects } = useProjectsContext()

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/edit/:id" element={<EditProject/>}/>
        {projects.length !== 0 ?
        projects.map((project) => (
          <Route key={project.id} path={`/project/${project.id}`} element={<Project projectId={project.id}/>} />
        )) : null}
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/main" element={<Navigate to={"/"}/>} />
      </Routes>
    </HashRouter>
  )
}

export default Router