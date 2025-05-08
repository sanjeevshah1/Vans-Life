import Star from "./../../assets/star.png"
import { getHostVans } from "../../api"
import { useEffect, useState } from "react"
import { ErrorType, VansType } from "../../types"
const Dashboard = () => {
    const [vans, setVans] = useState<VansType[]>([])
    const [error, setError] = useState<ErrorType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
   
    useEffect( () => {
        const fetchData = async () => {
          try{
            const data  = await getHostVans()
            setVans(data as VansType[]);
          }catch(error){
            setError(error as ErrorType);
          }finally{
            setLoading(false);
          }
        }
        fetchData();
    
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
 return(
    <div className="dashboard-container">
        <div className="welcome flex verti-center">
          <div className="welcome-first flex column">
            <h2>Welcome!</h2>
            <p>Income last <span id="days">30 days</span></p>
            <p id="rate">$2,260</p>
          </div>
          <div className="welcome-second">
            <p>Details</p>
          </div>
        </div>
        <div className="review flex verti-center">
            <p>Review score</p>
            <img src={Star} alt="star-logo" id="star"/>
            <p><b>5.0</b>/5</p>
            <p>Details</p>
        </div>
        <div className="listed-vans">
            <div className="head">
                <p>Your Listed Vans</p>
                <p>View all</p>
            </div>
            {vans.map((van)=>(
                <div className="van-box" key={van.id}>
                    <img src={van.imageUrl} alt={van.name} />
                    <div className="van-explain">
                        <p>{van.name}</p>
                        <p>{van.price}/day</p>
                    </div>
                <p>Edit</p>
                </div>
            ))}
        </div>
    </div>
 )
}

export default Dashboard