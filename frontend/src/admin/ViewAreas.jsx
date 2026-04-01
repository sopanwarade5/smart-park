import { useEffect, useState } from "react";
import {
  getAllParkingAreas,
  deleteParkingArea,
} from "../api/ParkingAreaApi";

function ViewAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = () => {
    getAllParkingAreas()
      .then((res) => {
        setAreas(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (areaId) => {
    if (!window.confirm("Are you sure you want to delete this area?")) {
      return;
    }

    deleteParkingArea(areaId)
      .then(() => {
        alert("Area deleted successfully");
        setAreas((prev) =>
          prev.filter((a) => a.areaId !== areaId)
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete area");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger"></div>
        <h5 className="mt-3 fw-semibold">Loading Parking Areas...</h5>
      </div>
    );
  }

  return (
    <div>
    
    <div className="container mt-5">
      <div className="area-table-card">
        <h4 className="fw-bold mb-4 text-danger">
          🅿️ Parking Areas
        </h4>

        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Area Name</th>
                <th>Location Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {areas.length === 0 ? (
                <tr>
                  <td colSpan="4" className="fw-semibold text-muted py-4">
                    No Areas Found
                  </td>
                </tr>
              ) : (
                areas.map((a) => (
                  <tr key={a.areaId} className="area-row">
                    <td>{a.areaId}</td>
                    <td className="fw-semibold">{a.areaName}</td>
                    <td className="text-muted">
                      {a.locationDescription}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={() => handleDelete(a.areaId)}
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
        .area-table-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
          animation: fadeIn 0.6s ease;
        }

        .area-row {
          transition: all 0.25s ease;
        }

        .area-row:hover {
          background-color: #fff5f5;
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

export default ViewAreas;
