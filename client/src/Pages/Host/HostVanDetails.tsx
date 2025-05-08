import {Link, NavLink, Outlet, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import { VansType, ErrorType } from "../../types"
import { getVan } from "../../api"
const HostVanDetails = () => {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState<VansType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);
    useEffect( () => {
      const fetchData = async () => {
        if(!id) return;
        try{
          const data = await getVan(id);
          setCurrentVan(data as VansType);
        }catch(error){
          setError(error as ErrorType);
        }finally{
          setLoading(false);
        }
      }
      fetchData();
  }, [id]);
  
    if(loading) {
        return <div>Loading......</div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }
  return (
    <div className="host-van-detail-container">
        <button>
        <Link to=".."relative="path">
          ⬅️ <span id="back">Back to all vans</span>
        </Link>
      </button>
      <div className="host-detail">
        <div className="first-row">
            <img src={currentVan?.imageUrl} alt="van" />
            <div className="temp">
                <button style={{ backgroundColor : "#E17654"}}>Simple</button>
                <h2>{currentVan?.name}</h2>
                <p id="price">{currentVan?.price}/day</p>
            </div>
        </div>
        <nav className="host-van-detail-nav">
            <NavLink to="." end className={({isActive}) => isActive? "current-link" : ""}>
                Details
            </NavLink>
            <NavLink to="pricing" className={({isActive}) => isActive? "current-link" : ""}>
                Pricing
            </NavLink>
            <NavLink to="photo" className={({isActive}) => isActive? "current-link" : ""}>
                Photo
            </NavLink>
        </nav>
        <Outlet context={currentVan}/>
      </div>
    </div>
  )
}

export default HostVanDetails