import { useState } from "react";
import '../style.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loggedIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/upload", { state: { username: data.username } });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={loggedIn}>
        <label><h3>Email</h3></label>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label><h3>Password</h3></label>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
        <p>New User? <Link to='/register'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
