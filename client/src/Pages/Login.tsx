import { useState } from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { FormType, ErrorType } from "../types";
import { loginUser } from "../api";
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormType>({
        email: "",
        password: "",
    })
    console.log(formData)
     const [status, setStatus] = useState<"idle" |  "submitting">("idle");
     const [error, setError] = useState<null | ErrorType>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target;
        setFormData((prevFormData) => ({
                ...prevFormData,
                [name] : value,
            })
        )
       
    }
    console.log(formData)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        const temp = async () =>{
            try{
                const response = await loginUser(formData);
                console.log(response)
                setError(null);
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
                localStorage.setItem("accessToken", response.accessToken);
                if(response.role === "host"){
                    localStorage.setItem("isHost", JSON.stringify(true));
                    navigate(location.state?.path || "/host", {replace : true})
                }
                if(response.role === "user"){
                    localStorage.setItem("isHost", JSON.stringify(true));
                    navigate(location.state?.path || "/vans", {replace : true})
                }
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
            }catch(error){
                console.log(error)
                setError(error as ErrorType) 
            }finally{
                setStatus("idle");
    
            }
        }
        temp();
        
    }

    
  return (
    <div className="login-container both-center column">
            {
                location.state?.message &&
                <>
                    <h4 style={{color: "red"}}>{location.state.message}</h4>
                    <br />
                </>
            }

        <h2>Sign in to your account</h2>
        <br />
        {error && <h2 style={{color: "red"}}>{error.message}</h2>}
        <br />
        <form onSubmit={handleSubmit} className="both-center  column form">
            <input
                type="text"
                value={formData.email}
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="Email Address"
            />
            <input
                type="password"
                value={formData.password}
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="Password"
            />
            <button disabled={status === "submitting"}>{status === "submitting" ? "Logging in..." : "Log in"}</button>
            <p>Don't have an account? <Link to="register" id="new">Create one now</Link></p>
        </form>
    </div>
  )
}

export default Login