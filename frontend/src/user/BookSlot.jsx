import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/BookingApi";
import { getAllParkingAreas } from "../api/ParkingAreaApi";

function BookSlot() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getAllParkingAreas()
      .then(res => setAreas(res.data))
      .catch(() => alert("Failed to load areas"));
  }, []);

  const handleBooking = () => {
    if (!areaId || !vehicleType || !vehicleId) {
      alert("All fields required");
      return;
    }

    createBooking({
      userId: user.userId,
      areaId: areaId,
      vehicleType: vehicleType,
      vehicleId: vehicleId
    })
      .then(() => {
        alert("Slot booked successfully");
        navigate("/user/dashboard");
      })
      .catch(err => {
        alert(err.response?.data?.message || "Slot not available");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h4 className="fw-bold mb-3">Book Parking Slot</h4>

      {/* AREA */}
      <select
        className="form-select mb-3"
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
      >
        <option value="">Select Area</option>
        {areas.map(a => (
          <option key={a.areaId} value={a.areaId}>
            {a.areaName}
          </option>
        ))}
      </select>

      {/* VEHICLE TYPE */}
      <select
        className="form-select mb-3"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      >
        <option value="">Vehicle Type</option>
        <option value="CAR">Car</option>
        <option value="BIKE">Bike</option>
      </select>

      {/* VEHICLE NUMBER */}
      <input
        className="form-control mb-3"
        placeholder="MH12 AB 1234"
        onChange={(e) => setVehicleId(e.target.value.toUpperCase())}
      />

      <button className="btn btn-primary w-100" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default BookSlot;
