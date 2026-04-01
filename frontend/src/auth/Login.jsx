import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    api
      .post("/users/login", {   // ✅ FIXED URL
        email,
        password,
      })
      .then((res) => {
        const user = res.data;

        localStorage.setItem("user", JSON.stringify(user)); // ✅ FIXED KEY

        alert(`Welcome ${user.firstName} ${user.lastName}`);

        user.role === "ADMIN"
          ? navigate("/admin/dashboard")
          : navigate("/user/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: 400 }}>
        <h3 className="text-center mb-4">Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"        // ✅ VERY IMPORTANT
          className="btn btn-primary w-100"
          onClick={login}
        >
          Login
        </button>

        <p className="text-center mt-3">
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
