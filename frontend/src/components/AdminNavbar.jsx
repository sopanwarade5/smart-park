import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

   if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "active-nav" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-lg sticky-top">
      {/* BRAND */}
      <Link className="navbar-brand fw-bold fs-4" to="/admin/dashboard">
        🚗 Smart<span className="text-primary">Park</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {/* LEFT MENU */}
        <ul className="navbar-nav me-auto gap-1">

          <NavItem
            to="/admin/dashboard"
            text="🏠 Home"
            active={isActive("/admin/dashboard")}
          />
          <NavItem
            to="/admin/bookings"
            text="📅 Bookings"
            active={isActive("/admin/bookings")}
          />
          <NavItem
            to="/admin/add-area"
            text="➕ Add Area"
            active={isActive("/admin/add-area")}
          />

          <NavItem
            to="/admin/areas"
            text="📋 View Areas"
            active={isActive("/admin/areas")}
          />

          <NavItem
            to="/admin/add-slot"
            text="➕ Add Slot"
            active={isActive("/admin/add-slot")}
          />

          <NavItem
            to="/admin/slots"
            text="🅿 View Slots"
            active={isActive("/admin/slots")}
          />

          {/* ✅ AVAILABLE SLOTS */}
          <NavItem
            to="/admin/available-slots"
            text="✅ Available Slots"
            active={isActive("/admin/available-slots")}
          />

          <NavItem
            to="/admin/payments"
            text="💳 Payments"
            active={isActive("/admin/payments")}
          />

          
        </ul>

        {/* RIGHT USER DROPDOWN */}
        {user && (
          <div className="dropdown">
            <div
              className="d-flex align-items-center gap-2 text-white dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              {/* Avatar */}
              <div
                className="rounded-circle bg-danger d-flex align-items-center justify-content-center"
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
        )}
      </div>
    </nav>
  );
}

/* ===== NAV ITEM COMPONENT ===== */
function NavItem({ to, text, active }) {
  return (
    <li className="nav-item">
      <Link className={`nav-link px-3 text-white ${active}`} to={to}>
        {text}
      </Link>
    </li>
  );
}

export default AdminNavbar;
