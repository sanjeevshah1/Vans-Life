import "./../App.css"
import {Link} from "react-router-dom"
const Home = () => {
  return (
   <>
        <div className="intro-container both-center">
            <div className="intro">
                <h2>You got the travel plans,
                    we  <br /> got the travel vans.</h2>
                <p>Add adventure to your life by joining the #vanlife movement.<br />  Rent the perfect van to make your perfect road trip.</p>
                <Link to="/vans" id="find"><button id="find">Find your van</button></Link>
            </div>
        </div>
    </>
  )
}

export default Home