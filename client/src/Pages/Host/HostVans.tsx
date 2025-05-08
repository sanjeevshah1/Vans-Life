import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { VansType,ErrorType } from "../../types.js"
import { getHostVans } from "../../api.js"
const HostVans = () => {
    const [hostVansData ,setHostVansData] = useState< VansType[]| null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null)

    useEffect( () => {
        const fetchData = async () => {
          try{
            const data = await getHostVans()
            setHostVansData(data as VansType[]);
          }catch(error){
            setError(error as ErrorType);
          }finally{
            setLoading(false);
          }
        }
        fetchData();
    }, []);
    
    if(loading){
        return <div>Loading......</div>
    }
    
    if(error){
        return <div>Error: {error.message}</div>
    }

  return (
    <div className="listed-vans">
            <div className="head">
                <p>Your Listed Vans</p>
            </div>
            {hostVansData?.map((van) => (
                <Link to={van.id} key={van.id}>
                <div className="van-box verti-center">
                    <img src={van.imageUrl} alt={van.name} />
                    <div className="van-explain">
                        <p>{van.name}</p>
                        <p>{van.price}/day</p>
                    </div>
                    <p>Edit</p>
                </div>
            </Link>
            ) )}
        </div>
  )
}
export default HostVans