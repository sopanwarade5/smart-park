import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminAnalytics } from "../api/BookingApi";
import { getAllParkingSlots } from "../api/ParkingSlotApi";

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // ===== ANALYTICS FROM BACKEND =====
  const [analytics, setAnalytics] = useState({
    carsToday: 0,
    bikesToday: 0,
    activeBookings: 0,
    todayRevenue: 0,
  });

  // ===== SLOT STATS =====
  const [slotStats, setSlotStats] = useState({
    total: 0,
    available: 0,
    occupied: 0,
    maintenance: 0, // calculated
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const analyticsRes = await getAdminAnalytics();
      const slotRes = await getAllParkingSlots();

      const slots = slotRes.data || [];
      const total = slots.length;
      const occupied = slots.filter(s => s.occupied === true).length;
      const available = total - occupied;

      // 🔧 Temporary assumption: 5% maintenance
      const maintenance = Math.round(total * 0.05);

      setAnalytics(analyticsRes.data);
      setSlotStats({
        total,
        available,
        occupied,
        maintenance,
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Admin Dashboard...</h5>
      </div>
    );
  }

  // ===== PERCENT CALC =====
  const availablePct = Math.round((slotStats.available / slotStats.total) * 100 || 0);
  const occupiedPct = Math.round((slotStats.occupied / slotStats.total) * 100 || 0);
  const maintenancePct = Math.round((slotStats.maintenance / slotStats.total) * 100 || 0);

  return (
    <div className="container-fluid px-5 py-4 bg-light min-vh-100">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h1 className="fw-bold display-6">
          🚗 Smart Park – Admin Dashboard
        </h1>
        <p className="text-muted fs-5">
          Real-time parking system overview
        </p>
      </div>

      {/* ================= TOP ANALYTICS ================= */}
      <div className="row g-4 mb-5">
        <StatCard title="Cars Today" value={analytics.carsToday}
          icon="bi-car-front-fill" gradient="linear-gradient(135deg,#667eea,#764ba2)" />

        <StatCard title="Bikes Today" value={analytics.bikesToday}
          icon="bi-bicycle" gradient="linear-gradient(135deg,#43cea2,#185a9d)" />

        <StatCard title="Active Bookings" value={analytics.activeBookings}
          icon="bi-clock-fill" gradient="linear-gradient(135deg,#ff9966,#ff5e62)" />

        <StatCard title="Today Revenue (₹)" value={analytics.todayRevenue}
          icon="bi-cash-stack" gradient="linear-gradient(135deg,#56ab2f,#a8e063)" />
      </div>

      {/* ================= MANAGEMENT % ================= */}
      <Section title="Management Overview" />

      <div className="row g-4 mb-5">
        <PercentCard
          title="Available Slots"
          percent={availablePct}
          color="success"
          icon="bi-check-circle-fill"
        />

        <PercentCard
          title="Booked Slots"
          percent={occupiedPct}
          color="danger"
          icon="bi-x-circle-fill"
        />

        <PercentCard
          title="Maintenance Slots"
          percent={maintenancePct}
          color="warning"
          icon="bi-tools"
        />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <Section title="Quick Actions" />

      <div className="row g-4">
        <ActionCard text="Add Area" icon="bi-plus-circle" color="primary"
          onClick={() => navigate("/admin/add-area")} />

        <ActionCard text="View Areas" icon="bi-list-ul" color="success"
          onClick={() => navigate("/admin/areas")} />

        <ActionCard text="Add Slot" icon="bi-plus-square" color="warning"
          onClick={() => navigate("/admin/add-slot")} />

        <ActionCard text="Booking History" icon="bi-clock-history" color="info"
          onClick={() => navigate("/admin/bookings")} />
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .stat-card, .action-card {
          border-radius: 18px;
          transition: all 0.3s ease;
        }
        .stat-card:hover, .action-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title }) {
  return <h4 className="fw-bold mb-3">{title}</h4>;
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className="col-md-3">
      <div className="card text-white stat-card border-0 shadow-lg"
        style={{ background: gradient }}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6>{title}</h6>
            <h1 className="fw-bold">{value}</h1>
          </div>
          <i className={`bi ${icon}`} style={{ fontSize: "3.5rem", opacity: 0.3 }}></i>
        </div>
      </div>
    </div>
  );
}

function PercentCard({ title, percent, color, icon }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-lg border-0">
        <div className="card-body text-center py-4">
          <i className={`bi ${icon} fs-1 text-${color}`}></i>
          <h6 className="mt-3 fw-bold">{title}</h6>

          <div className="progress mt-3" style={{ height: "10px" }}>
            <div
              className={`progress-bar bg-${color}`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <h4 className={`mt-3 fw-bold text-${color}`}>
            {percent}%
          </h4>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ text, icon, color, onClick }) {
  return (
    <div className="col-md-3">
      <div
        className={`card bg-${color} text-white action-card shadow-lg`}
        onClick={onClick}
      >
        <div className="card-body py-4 text-center">
          <i className={`bi ${icon} fs-1 mb-3`}></i>
          <h6 className="fw-bold">{text}</h6>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
