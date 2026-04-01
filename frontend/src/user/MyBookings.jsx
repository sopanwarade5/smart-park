import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, closeBooking } from "../api/BookingApi";
import { getPaymentByBooking } from "../api/PaymentApi";
import { getAllParkingSlots } from "../api/ParkingSlotApi";

function MyBookings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [slots, setSlots] = useState([]);
  const [paymentMap, setPaymentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [exitLoadingId, setExitLoadingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "USER") {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);

    Promise.all([
      getUserBookings(user.userId),
      getAllParkingSlots(),
    ])
      .then(([bookingRes, slotRes]) => {
        const bookingList = bookingRes.data || [];
        const slotList = slotRes.data || [];

        setBookings(bookingList);
        setSlots(slotList);

        // 🔥 payment check
        bookingList.forEach((b) => {
          getPaymentByBooking(b.bookingId)
            .then((pRes) => {
              if (pRes.data?.paymentStatus === "SUCCESS") {
                setPaymentMap((prev) => ({
                  ...prev,
                  [b.bookingId]: true,
                }));
              }
            })
            .catch(() => {});
        });
      })
      .catch(() => alert("Failed to load bookings"))
      .finally(() => setLoading(false));
  };

  // 🔗 slot → areaName
  const getAreaName = (slotId) => {
    return (
      slots.find((s) => s.slotId === slotId)?.area?.areaName ||
      "-"
    );
  };

  const handleExit = (bookingId) => {
    if (!window.confirm("Confirm exit parking?")) return;

    setExitLoadingId(bookingId);

    closeBooking(bookingId)
      .then(() => navigate(`/user/payment/${bookingId}`))
      .catch(() => alert("Exit failed"))
      .finally(() => setExitLoadingId(null));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading your bookings...</h5>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">📋 My Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-muted">No bookings found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Slot</th>
                <th>Area</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => {
                const paid = paymentMap[b.bookingId];

                return (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.slotId}</td>
                    <td>{getAreaName(b.slotId)}</td>
                    <td>{b.entryTime}</td>
                    <td>{b.exitTime || "-"}</td>
                    <td>₹ {b.amount || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "ACTIVE"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>
                      {paid ? (
                        <button className="btn btn-success btn-sm" disabled>
                          PAID
                        </button>
                      ) : b.status === "ACTIVE" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleExit(b.bookingId)}
                          disabled={exitLoadingId === b.bookingId}
                        >
                          Exit
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            navigate(`/user/payment/${b.bookingId}`)
                          }
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
