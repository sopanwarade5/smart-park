import { useEffect, useState } from "react";
import { addParkingSlot } from "../api/ParkingSlotApi";
import { getAllParkingAreas } from "../api/ParkingAreaApi";
import { useNavigate } from "react-router-dom";

function AddSlot() {
  const navigate = useNavigate();

  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");

  const [slot, setSlot] = useState({
    slotNumber: "",
    vehicleType: "",
    occupied: false,
  });

  useEffect(() => {
    getAllParkingAreas().then((res) => {
      setAreas(res.data || []);
    });
  }, []);

  const handleAddSlot = () => {
    if (!slot.slotNumber || !slot.vehicleType || !areaId) {
      alert("All fields required");
      return;
    }

    addParkingSlot(areaId, slot) // 🔥 areaId passed
      .then(() => {
        alert("Parking Slot Added Successfully");
        navigate("/admin/slots");
      })
      .catch(() => alert("Failed to add slot"));
  };

  return (
    <div className="container mt-5">
      <div className="add-slot-card mx-auto">
        <h4 className="text-center mb-4 fw-bold">🚗 Add New Parking Slot</h4>

        <input
          className="form-control mb-3"
          placeholder="Slot Number"
          value={slot.slotNumber}
          onChange={(e) =>
            setSlot({ ...slot, slotNumber: e.target.value })
          }
        />

        <select
          className="form-control mb-3"
          value={slot.vehicleType}
          onChange={(e) =>
            setSlot({ ...slot, vehicleType: e.target.value })
          }
        >
          <option value="">Select Vehicle Type</option>
          <option value="CAR">Car</option>
          <option value="BIKE">Bike</option>
        </select>

        {/* 🔥 AREA SELECT */}
        <select
          className="form-control mb-4"
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
        >
          <option value="">Select Area</option>
          {areas.map((a) => (
            <option key={a.areaId} value={a.areaId}>
              {a.areaName}
            </option>
          ))}
        </select>

        <button className="btn btn-success w-100" onClick={handleAddSlot}>
          ➕ Add Parking Slot
        </button>
      </div>
    </div>
  );
}

export default AddSlot;
