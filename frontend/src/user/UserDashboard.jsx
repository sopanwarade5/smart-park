import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../api/BookingApi";
import { getAllPayments } from "../api/PaymentApi";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    activeBooking: "—",
    totalBookings: 0,
    totalPayments: 0,
    parkingStatus: "—",
  });

  const [loading, setLoading] = useState(true);

  // 🔐 AUTH CHECK
  useEffect(() => {
    if (!user || user.role !== "USER") {
      navigate("/login");
    } else {
      loadDashboard();
    }
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // ===== BOOKINGS (single API call) =====
      const bookingRes = await getUserBookings(user.userId);
      const bookings = bookingRes.data || [];

      const active = bookings.find((b) => b.status === "ACTIVE");

      // ===== PAYMENTS =====
      const paymentRes = await getAllPayments();
      const payments = paymentRes.data || [];

      const userPayments = payments.filter(
        (p) => Number(p.userId) === Number(user.userId)
      );

      // ===== SET STATE =====
      setStats({
        totalBookings: bookings.length,
        activeBooking: active ? "YES" : "NO",
        parkingStatus: active ? "IN PARKING" : "NOT PARKED",
        totalPayments: userPayments.length,
      });

    } catch (err) {
      console.error("Dashboard error:", err);

      // fallback safe state
      setStats({
        activeBooking: "NO",
        totalBookings: 0,
        totalPayments: 0,
        parkingStatus: "NOT PARKED",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 px-5 py-4">

      {/* HEADER */}
      <h2 className="fw-bold mb-1">👋 Welcome, {user?.firstName}</h2>
      <p className="text-muted mb-4">Your parking activity at a glance</p>

      {/* STATS */}
      <div className="row g-4 mb-5">

        <BigCard
          title="Active Booking"
          value={stats.activeBooking}
          badge={stats.activeBooking === "YES" ? "success" : "secondary"}
          icon="bi-car-front-fill"
          gradient="linear-gradient(135deg,#43cea2,#185a9d)"
          loading={loading}
        />

        <BigCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon="bi-journal-text"
          gradient="linear-gradient(135deg,#667eea,#764ba2)"
          loading={loading}
        />

        <BigCard
          title="Total Payments"
          value={stats.totalPayments}
          icon="bi-credit-card-fill"
          gradient="linear-gradient(135deg,#ff9966,#ff5e62)"
          loading={loading}
        />

        <BigCard
          title="Parking Status"
          value={stats.parkingStatus}
          badge={stats.parkingStatus === "IN PARKING" ? "success" : "danger"}
          icon="bi-check-circle-fill"
          gradient="linear-gradient(135deg,#56ab2f,#a8e063)"
          loading={loading}
        />
      </div>

       {/* QUICK ACTIONS
      <h4 className="fw-bold mb-3">Quick Actions</h4>
      <div className="row g-4 text-center">
        <ActionCard icon="bi-check-circle-fill" text="Available Slots" color="success"
          onClick={() => navigate("/user/available-slots")} />
        <ActionCard icon="bi-car-front-fill" text="Book Slot" color="primary"
          onClick={() => navigate("/user/book-slot")} />
        <ActionCard icon="bi-journal-text" text="My Bookings" color="info"
          onClick={() => navigate("/user/bookings")} />
        <ActionCard icon="bi-credit-card-fill" text="Payments" color="warning"
          onClick={() => navigate("/user/payments")} />
      </div>  */}

      {/* STYLE */}
      <style>{`
        .big-card {
          border-radius: 18px;
          transition: all .3s ease;
        }
        .big-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,.25);
        }
        .action-card {
          border-radius: 15px;
          cursor: pointer;
          transition: all .3s ease;
        }
        .action-card:hover {
          transform: scale(1.05);
          box-shadow: 0 18px 35px rgba(0,0,0,.3);
        }
      `}</style>
    </div>
  );
}

/* UI */

function BigCard({ title, value, icon, gradient, badge, loading }) {
  return (
    <div className="col-md-3">
      <div className="card text-white shadow-lg border-0 big-card"
        style={{ background: gradient, minHeight: 180 }}>
        <div className="card-body d-flex justify-content-between">
          <div>
            <h6>{title}</h6>
            <h1 className="fw-bold">
              {loading ? "…" : value}
            </h1>
            {badge && <span className={`badge bg-${badge}`}>{value}</span>}
          </div>
          <i className={`bi ${icon}`} style={{ fontSize: "3.5rem", opacity: .3 }} />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, text, color, onClick }) {
  return (
    <div className="col-md-3">
      <div className={`card bg-${color} text-white shadow-lg action-card`}
        onClick={onClick}>
        <div className="card-body py-4">
          <i className={`bi ${icon} fs-1`} />
          <h6 className="fw-bold mt-2">{text}</h6>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;