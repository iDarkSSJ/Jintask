/* eslint-disable react/react-in-jsx-scope */

import { useNavigate } from "react-router-dom";
import { ButtonType } from "../assets/types.d";

type Props = {
  children: React.ReactNode
  type: ButtonType
  path?: string | string[]
  className?: string
}

function Button({ children, type, path = "",className  }: Props): JSX.Element {
  const navigate = useNavigate()

  const handleClick = (type: ButtonType) => {
    if (type === ButtonType.navigate) {
      const fullPath = Array.isArray(path) ? path.join("/") : path
      navigate(`/${fullPath}`);
    }
  }
  
  return (
    <button className={type + "" + className} onClick={()=> handleClick(type)}>
      {children}
    </button>
  )
}

export default Button