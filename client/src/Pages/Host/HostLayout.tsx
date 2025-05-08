import {NavLink, Outlet} from "react-router-dom"
const HostLayout = () => {
  return (
    <>
     <div className="host-nav-bar flex">
        <NavLink
         to="."
         end
        className={({ isActive }) => (isActive ? "current-link" : "")}
        >Dashboard</NavLink>

        <NavLink
         to="income"
         className={({ isActive }) => (isActive ? "current-link" : "")}
         >Income</NavLink>
          
        <NavLink
         to="vans"
         className={({ isActive }) => (isActive ? "current-link" : "")}
         >Vans</NavLink>
         
        <NavLink
         to="reviews"
         className={({ isActive }) => (isActive ? "current-link" : "")}
         >Reviews</NavLink>
        <NavLink
         to="users"
         className={({ isActive }) => (isActive ? "current-link" : "")}
         >Users</NavLink>

    </div>
    <Outlet/>
   </>
  )
}

export default HostLayout