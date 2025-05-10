import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "user" // Default to "user"
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Executing handle submit")
    
    // Validate password confirmation
    if (formData.password !== formData.passwordConfirmation) {
      console.log("Showing toast: passwords don't match");
      toast.error("Passwords don't match");
      return;
    }

    // Password validation - at least 8 characters
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    console.log("Registering user:", formData);
    setIsLoading(true);
    
    try {
      // Send without confirmPassword
      
      const res = await fetch('http://localhost:1337/api/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      
      if(!res.ok){
        const errorData = await res.json().catch()
        const errorMessage = Array.isArray(errorData?.errors)
          ? errorData.errors.map((err: any) => `${err.message}`).join(", ")
          : "User Registration failed";
        throw new Error(errorMessage);
      }
      
      toast.success("Registration successful!");
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      console.log("error : ", error)
      toast.error(`Error: ${(error instanceof Error) ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-card-header">
          <h2 className="register-card-title">Create an Account</h2>
          <p className="register-card-description">
            Enter your details to register
          </p>
        </div>
        <div className="register-card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                placeholder="Ram Kumar"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="ram@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  className="form-input"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="passwordConfirmation">Confirm Password</label>
              <div className="password-input-container">
                <input
                  className="form-input"
                  id="passwordConfirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  name="passwordConfirmation"
                  placeholder="••••••••"
                  required
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="password-toggle-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Register as</label>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    className="radio-button"
                    type="radio"
                    id="user"
                    name="userType"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={() => handleUserTypeChange("user")}
                  />
                  <label htmlFor="user">User</label>
                </div>
                <div className="radio-item">
                  <input
                    className="radio-button"
                    type="radio"
                    id="host"
                    name="userType"
                    value="host"
                    checked={formData.role === "host"}
                    onChange={() => handleUserTypeChange("host")}
                  />
                  <label htmlFor="host">Host</label>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        <div className="register-card-footer">
          <p className="footer-text">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;