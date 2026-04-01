import { useEffect, useState } from "react";
import {
  getAllParkingSlots,
  deleteParkingSlot,
} from "../api/ParkingSlotApi";

function ViewSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = () => {
    getAllParkingSlots()
      .then((res) => {
        setSlots(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (slotId) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) {
      return;
    }

    deleteParkingSlot(slotId)
      .then(() => {
        alert("Slot deleted successfully");
        setSlots((prev) =>
          prev.filter((s) => s.slotId !== slotId)
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete slot");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
        <h5 className="mt-3 fw-semibold">Loading Parking Slots...</h5>
      </div>
    );
  }

  return (
    <div>
    <div className="container mt-5">
      <div className="slot-table-card">
        <h4 className="fw-bold mb-4 text-warning">
          🚗 Parking Slots
        </h4>

        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Slot Number</th>
                <th>Vehicle Type</th>
                <th>Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {slots.length === 0 ? (
                <tr>
                  <td colSpan="5" className="fw-semibold text-muted py-4">
                    No Slots Found
                  </td>
                </tr>
              ) : (
                slots.map((s) => (
                  <tr key={s.slotId} className="slot-row">
                    <td>{s.slotId}</td>
                    <td className="fw-semibold">{s.slotNumber}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {s.vehicleType}
                      </span>
                    </td>
                    
                    <td>{s.area?.areaName}</td>
                    <td>
                      {s.occupied ? (
                        <span className="badge bg-danger px-3 py-2">
                          Occupied
                        </span>
                      ) : (
                        <span className="badge bg-success px-3 py-2">
                          Available
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={() => handleDelete(s.slotId)}
                      >
                        🗑 Delete
                      </button>
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
          background-color: #fff8e1;
          transform: scale(1.01);
        }

        .delete-btn {
          transition: all 0.25s ease;
        }

        .delete-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 18px rgba(220, 53, 69, 0.45);
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

export default ViewSlots;
