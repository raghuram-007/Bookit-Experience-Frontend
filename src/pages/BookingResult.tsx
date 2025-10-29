import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

interface Booking {
  _id: string;
  name: string;
  email: string;
  qty: number;
  pricePaid: number;
  slotDate: string;
  slotTime: string;
}

function BookingResult() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<Booking | null>(null);

  // ✅ Use environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (success && bookingId) {
      fetch(`${API_URL}/api/bookings/${bookingId}`)
        .then((res) => res.json())
        .then((data) => setBooking(data))
        .catch(() => setBooking(null));
    }
  }, [success, bookingId, API_URL]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {success ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-3">🎉 Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for booking with <span className="font-semibold">BookIt</span>!
          </p>

          {booking ? (
            <div className="text-left space-y-2 mb-4">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Date:</strong> {booking.slotDate}</p>
              <p><strong>Time:</strong> {booking.slotTime}</p>
              <p><strong>Quantity:</strong> {booking.qty}</p>
              <p><strong>Paid:</strong> ₹{booking.pricePaid}</p>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">Fetching your booking details...</p>
          )}

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-3">❌ Booking Failed</h1>
          <p className="text-gray-600 mb-6">Something went wrong while processing your booking.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookingResult;
