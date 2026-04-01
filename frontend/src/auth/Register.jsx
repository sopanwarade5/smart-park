import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/LoginRegister";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const isValidPhone = (phone) =>
    /^\d{10}$/.test(phone);
  

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { firstName, lastName, phoneNumber, email, password } = user;

    // ===== FRONTEND VALIDATION =====
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      alert("Name must have at least 2 characters");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Enter a valid email address");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // ===== API CALL =====
    registerUser(user)
      .then(() => {
        alert("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        //EMAIL ALREADY EXISTS HANDLING
        if (
          err.response &&
          err.response.data &&
          typeof err.response.data === "string" &&
          err.response.data.toLowerCase().includes("email")
        ) {
          alert(
            "This email is already registered. Please use another email."
          );
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <h3 className="text-center fw-bold mb-4">
              Create Account
            </h3>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                First Name
              </label>
              <input
                name="firstName"
                className="form-control form-control-lg"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Last Name
              </label>
              <input
                name="lastName"
                className="form-control form-control-lg"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                className="form-control form-control-lg"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control form-control-lg"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control form-control-lg"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-success btn-lg w-100 mb-3"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
