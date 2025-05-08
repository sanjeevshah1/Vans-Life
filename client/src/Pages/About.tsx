import bck from "./../assets/about_background.png"
import "./../App.css"
import {Link} from "react-router-dom"
const About = () => {
  return (
    <>
        <img src={bck} className="about-background" alt="" />
        <div className="about-container flex column">
            <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
            <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                (Hitch costs extra 😉)

                Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels</p>
            <div className="msg flex column">
                <p>Your destination is waiting. <br />
                Your van is ready.</p>
                <Link to="/vans"><button id="explore">Explore our vans</button></Link>
            </div>
        </div>
     </>
  )
}

export default About