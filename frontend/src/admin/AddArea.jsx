import { useState } from "react";
import { addParkingArea } from "../api/ParkingAreaApi";
import { useNavigate } from "react-router-dom";

function AddArea() {
  const navigate = useNavigate();

  const [area, setArea] = useState({
    areaName: "",
    locationDescription: "",
  });

  const handleAdd = () => {
    if (!area.areaName || !area.locationDescription) {
      alert("All fields required");
      return;
    }

    addParkingArea(area)
      .then(() => {
        alert("Parking Area Added Successfully");
        navigate("/admin/areas");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add area");
      });
  };

  return (
    <div>
    <div className="container mt-5">
      <div className="add-area-card mx-auto">
        <h4 className="text-center mb-4 fw-bold">
          🅿️ Add New Parking Area
        </h4>

        <div className="form-group mb-3">
          <label className="form-label fw-semibold">Area Name</label>
          <input
            className="form-control custom-input"
            placeholder="Eg: Basement A"
            value={area.areaName}
            onChange={(e) =>
              setArea({ ...area, areaName: e.target.value })
            }
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label fw-semibold">
            Location Description
          </label>
          <input
            className="form-control custom-input"
            placeholder="Near Main Gate, Ground Floor"
            value={area.locationDescription}
            onChange={(e) =>
              setArea({
                ...area,
                locationDescription: e.target.value,
              })
            }
          />
        </div>

        <button className="btn btn-primary w-100 add-btn" onClick={handleAdd}>
          ➕ Add Parking Area
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        .add-area-card {
          max-width: 420px;
          background: #ffffff;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: fadeIn 0.6s ease;
        }

        .custom-input {
          border-radius: 10px;
          padding: 12px;
          border: 1px solid #ced4da;
          transition: all 0.3s ease;
        }

        .custom-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
        }

        .add-btn {
          padding: 12px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(13, 110, 253, 0.4);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
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

export default AddArea;
