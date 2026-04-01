import { useEffect, useState } from "react";
import { getAvailableParkingSlots } from "../api/ParkingSlotApi";

function AvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const loadAvailableSlots = () => {
    getAvailableParkingSlots()
      .then((res) => {
        setSlots(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
        <h5 className="mt-3 fw-semibold">
          Loading Available Slots...
        </h5>
      </div>
    );
  }

  return (
    <div>
    
    <div className="container mt-5">
      <div className="slot-table-card">
        <h4 className="fw-bold mb-4 text-success">
          ✅ Available Parking Slots
        </h4>

        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Slot Number</th>
                <th>Area</th>
                <th>Vehicle Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {slots.length === 0 ? (
                <tr>
                  <td colSpan="4" className="fw-semibold text-muted py-4">
                    No Available Slots
                  </td>
                </tr>
              ) : (
                slots.map((s) => (
                  <tr key={s.slotId} className="slot-row">
                    <td>{s.slotId}</td>
                    <td className="fw-semibold">
                      {s.slotNumber}
                    </td>
                    <td>{s.area?.areaName}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {s.vehicleType}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success px-3 py-2">
                        Available
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .slot-table-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
          animation: fadeIn 0.6s ease;
        }

        .slot-row {
          transition: all 0.25s ease;
        }

        .slot-row:hover {
          background-color: #f1fdf5;
          transform: scale(1.01);
        }

        table th {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
    </div>
  );
}

export default AvailableSlots;
