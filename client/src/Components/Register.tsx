import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name] : value
    }))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering user:", formData);
    try{
        const res = await fetch('http://localhost:1337/api/users',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData)
        })
        if(!res.ok){
            throw new Error("User Registration failed")
        }
        navigate("login", {replace: true})

    }catch(error : unknown){
        alert(`Error: ${(error instanceof Error) ? error.message : "Unknown error"}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
