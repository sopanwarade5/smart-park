import { useEffect, useState } from "react";
import { getAllPayments } from "../api/PaymentApi";
import { getAllBookings } from "../api/BookingApi";
import { getAllParkingSlots } from "../api/ParkingSlotApi";

function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllPayments(),
      getAllBookings(),
      getAllParkingSlots(),
    ])
      .then(([paymentRes, bookingRes, slotRes]) => {
        setPayments(paymentRes.data || []);
        setBookings(bookingRes.data || []);
        setSlots(slotRes.data || []);
      })
      .catch((err) => {
        console.error("Failed to load payment data", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // helpers
  const getBooking = (bookingId) =>
    bookings.find((b) => b.bookingId === bookingId);
  
  const getSlotNumber = (slotId) =>
    slots.find((s) => s.slotId === slotId)?.slotNumber || "-";

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3 fw-semibold">
          Loading Payment History...
        </h5>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="payment-table-card">
        <h4 className="fw-bold mb-4 text-primary">
          💳 Payment History (Admin)
        </h4>

        <div className="table-responsive">
          <table className="table align-middle text-center table-hover">
            <thead className="table-dark">
              <tr>
                <th>Payment ID</th>
                <th>User ID</th>
                <th>Vehicle ID</th>
                <th>Slot Number</th>
                <th>Amount (₹)</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="fw-semibold text-muted py-4">
                    No Payments Found
                  </td>
                </tr>
              ) : (
                payments.map((p) => {
                  const booking = getBooking(p.bookingId);

                  return (
                    <tr key={p.paymentId} className="payment-row">
                      <td>{p.paymentId}</td>
                      <td>{booking?.userId || "-"}</td>
                      <td>{booking?.vehicleId || "-"}</td>
                      <td>
                        {booking
                          ? getSlotNumber(booking.slotId)
                          : "-"}
                      </td>
                      <td className="fw-bold">₹ {p.amount}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {p.paymentMode}
                        </span>
                      </td>
                      <td>
                        {p.paymentStatus === "SUCCESS" ? (
                          <span className="badge bg-success px-3 py-2">
                            SUCCESS
                          </span>
                        ) : (
                          <span className="badge bg-danger px-3 py-2">
                            FAILED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .payment-table-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
          animation: fadeIn 0.6s ease;
        }

        .payment-row {
          transition: all 0.25s ease;
        }

        .payment-row:hover {
          background-color: #f4f9ff;
          transform: scale(1.01);
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
  );
}

export default ViewPayments;
