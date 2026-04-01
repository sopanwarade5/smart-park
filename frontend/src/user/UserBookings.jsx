import { useEffect, useState } from "react";
import api from "../api/axios";

function UserBookings() {
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get(`/bookings/user/${user.userId}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [user.userId]);

  return (
    <div className="container mt-4">
      <h3>My Bookings</h3>

      <table className="table table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Vehicle</th>
            <th>Slot</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.vehicleId}</td>
              <td>{b.slotId}</td>
              <td>{b.entryTime}</td>
              <td>{b.exitTime || "-"}</td>
              <td>₹ {b.amount}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserBookings;
