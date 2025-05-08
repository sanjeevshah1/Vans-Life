import {Outlet, Navigate, useLocation} from "react-router-dom"

const AuthRequired = () => {
    const location = useLocation()
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
    if(!isLoggedIn){
        return <Navigate to="/login" state={{message: "Oops, You must login First.", path: location.pathname}} replace/>
    }
  return (
    <Outlet/>
  )
}

export default AuthRequired