import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../api/BookingApi";
import { makePayment } from "../api/PaymentApi";

function UserPayment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // 🔐 session check
  useEffect(() => {
    if (!user || user.role !== "USER") {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    loadBooking();
  }, []);

  const loadBooking = () => {
    getBookingById(bookingId)
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load booking details");
        navigate("/user/bookings");
      })
      .finally(() => setLoading(false));
  };

  const handlePayment = () => {
    if (!window.confirm("Confirm payment?")) return;

    setPaying(true);

    makePayment({
      bookingId: booking.bookingId,
      userId: booking.userId,
      amount: booking.amount,
      paymentMode: "UPI",
    })
      .then(() => {
        alert("Payment successful ✅");
        navigate("/user/bookings");
      })
      .catch((err) => {
        console.error(err);
        alert("Payment failed");
        setPaying(false);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading payment details...</h5>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">Booking not found</h5>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/user/bookings")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0" style={{ width: 420 }}>
        <div className="card-body p-4">

          <h3 className="fw-bold mb-3">💳 Payment</h3>

          <p><b>Booking ID:</b> {booking.bookingId}</p>
          <p><b>Slot ID:</b> {booking.slotId}</p>
          <p><b>Entry Time:</b> {booking.entryTime}</p>
          <p><b>Exit Time:</b> {booking.exitTime}</p>

          <hr />

          <h4 className="text-success fw-bold mb-3">
            Amount to Pay: ₹{booking.amount}
          </h4>

          <button
            className="btn btn-success w-100 fw-bold"
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>

          <button
            className="btn btn-link w-100 mt-2"
            onClick={() => navigate("/user/bookings")}
          >
            ← Back to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPayment;
