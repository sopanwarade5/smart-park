import { useEffect, useState } from "react";
import { getAvailableParkingSlots } from "../api/ParkingSlotApi";
function ViewAvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableParkingSlots()
      .then((res) => {
        setSlots(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load available slots");
        setLoading(false);
      });
  }, []);

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
      <div className="available-slot-card">
        <h4 className="fw-bold mb-4 text-success">
          ✅ Available Parking Slots
        </h4>

        {slots.length === 0 ? (
          <div className="text-center text-muted fw-semibold py-4">
            No Available Slots
          </div>
        ) : (
          <div className="row g-3">
            {slots.map((s) => (
              <div className="col-md-4" key={s.slotId}>
                <div className="slot-box">
                  <div className="slot-number">
                    Slot {s.slotNumber}
                  </div>
                  <div className="slot-area">
                    Area ID: {s.areaId}
                  </div>
                  <span className="badge bg-success mt-2">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .available-slot-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
          animation: fadeIn 0.6s ease;
        }

        .slot-box {
          background: #f8fff9;
          border: 1px solid #d1e7dd;
          padding: 18px;
          border-radius: 14px;
          text-align: center;
          transition: all 0.25s ease;
        }

        .slot-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(25, 135, 84, 0.25);
        }

        .slot-number {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .slot-area {
          font-size: 0.9rem;
          color: #6c757d;
          margin-top: 4px;
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

export default ViewAvailableSlots;
