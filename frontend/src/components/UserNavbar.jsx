import { Link, useLocation, useNavigate } from "react-router-dom";

function UserNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Login / Register pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  // ADMIN user navbar 
  if (!user || user.role !== "USER") {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "active-nav fw-bold text-warning" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-lg sticky-top">
      {/* ===== BRAND ===== */}
      <Link className="navbar-brand fw-bold fs-4" to="/user/dashboard">
        🚗 Smart<span className="text-light">Park</span>
        <span className="badge bg-light text-primary ms-2">USER</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#userNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="userNavbar">
        {/* ===== LEFT MENU ===== */}
        <ul className="navbar-nav me-auto gap-1">

          <NavItem
            to="/user/dashboard"
            text="🏠 Dashboard"
            active={isActive("/user/dashboard")}
          />  

          <NavItem
            to="/user/book-slot"
            text="🚗 Book Slot"
            active={isActive("/user/book-slot")}
          />

          <NavItem
            to="/user/bookings"
            text="📅 My Bookings"
            active={isActive("/")}
          />


        </ul>

        {/* ===== RIGHT DROPDOWN ===== */}
        <div className="dropdown">
          <div
            className="d-flex align-items-center gap-2 text-white dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
          >
            {/* Avatar */}
            <div
              className="rounded-circle bg-dark d-flex align-items-center justify-content-center"
              style={{ width: 38, height: 38 }}
            >
              <span className="fw-bold h5 mb-0 text-white">
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </span>
            </div>

            <span className="fw-semibold">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li className="dropdown-item text-muted">
              Role: <b>{user.role}</b>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                className="dropdown-item text-danger fw-semibold"
                onClick={logout}
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

/* ===== NAV ITEM ===== */
function NavItem({ to, text, active }) {
  return (
    <li className="nav-item">
      <Link className={`nav-link px-3 text-white ${active}`} to={to}>
        {text}
      </Link>
    </li>
  );
}

export default UserNavbar;
