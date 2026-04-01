import { useEffect, useState } from "react";
import { getAllBookings } from "../api/BookingApi";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings()
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container text-center p-5">
        <div className="card p-5 shadow">
          <div className="spinner-border text-primary mb-3"></div>
          <h5>Loading booking history...</h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`

        body {
          background: #eef2f7;
          font-family: Arial;
        }

        .booking-box {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 0 12px rgba(0,0,0,0.15);
          animation: panelLoad 0.8s ease-out;
        }

        @keyframes panelLoad {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .analytics-card {
          border-radius: 20px;
          border: none;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          animation: cardFade 0.7s ease;
        }

        @keyframes cardFade {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .analytics-card:hover {
          transform: scale(1.03);
        }

        .header-title {
          color: #0d6efd;
          letter-spacing: 1px;
          animation: fadeDown 0.6s ease;
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        table thead th,
        table tbody td {
          text-align: center;
        }

        tbody tr {
          animation: rowAppear 0.5s ease;
        }

        @keyframes rowAppear {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        .badge {
          padding: 8px 14px;
          font-size: 12px;
        }

        /* STATUS BASED COLORS */

        .badge-active {
          background-color: #198754 !important;    /* GREEN */
          color: white !important;
        }

        .badge-closed {
          background-color: #6c757d !important;    /* GRAY */
          color: white !important;
        }

        .btn-close-slot {
          background-color: #dc3545 !important;    /* RED */
          color: white !important;
        }

        .btn-available-slot {
          background-color: #198754 !important;    /* GREEN */
          color: white !important;
        }

      `}</style>

      <div className="container-fluid px-5 py-4">
        <div className="booking-box">

          <div className="row mb-4 text-center">
            <h2 className="fw-bold header-title">ADMIN BOOKING PANEL</h2>
            <p className="text-muted">
              Monitor all vehicle entries and revenue
            </p>
          </div>

          <div className="row g-4 mb-4 text-center">

            <div className="col-md-4">
              <div className="card analytics-card text-bg-primary">
                <div className="card-body">
                  <h5>Total Bookings</h5>
                  <h1>{bookings.length}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card analytics-card text-bg-success">
                <div className="card-body">
                  <h5>Active Vehicles</h5>
                  <h1>
                    {bookings.filter((b) => b.status === "ACTIVE").length}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card analytics-card text-bg-warning">
                <div className="card-body">
                  <h5>Completed</h5>
                  <h1>
                    {bookings.filter((b) => b.status !== "ACTIVE").length}
                  </h1>
                </div>
              </div>
            </div>

          </div>

          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Vehicle ID</th>
                <th>Slot ID</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.userId}</td>
                    <td>{b.vehicleId}</td>
                    <td>{b.slotId}</td>
                    <td>{new Date(b.entryTime).toLocaleString()}</td>
                    <td>
                      {b.exitTime
                        ? new Date(b.exitTime).toLocaleString()
                        : "-"}
                    </td>
                    <td>₹ {b.amount}</td>
                    <td>
                      <span
                        className={
                          b.status === "ACTIVE"
                            ? "badge badge-active"
                            : "badge badge-closed"
                        }
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default AdminBookings;
