/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Main from "../pages/Main"
import CreateProject from "../pages/CreateProject"

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Navigate to={"/"}/>} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router