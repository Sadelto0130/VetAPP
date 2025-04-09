import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({registerTo, isAllowed, children}) => {

  if(!isAllowed) return <Navigate to={registerTo} replace/>

  return children ? children : <Outlet/>
}

