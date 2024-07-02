/* eslint-disable react/react-in-jsx-scope */

import { useNavigate } from "react-router-dom";
import { ButtonType } from "../assets/types.d";

type Props = {
  children: React.ReactNode;
  type: ButtonType;
  path?: string;
}


function Button({ children, type, path = "" }: Props): JSX.Element {
  const navigate = useNavigate()

  const handleClick = (type: ButtonType) => {
    if (type === ButtonType.navigate) {
      navigate(`/${path}`)
    }
  }
  
  return (
    <button className={type} onClick={()=> handleClick(type)}>
      {children}
    </button>
  )
}

export default Button