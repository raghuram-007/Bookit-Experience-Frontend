import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import deliote from "../assets/deliote.png";

interface ExperienceSummary {
  _id?: string;
  title: string;
  date: string;
  time: string;
  price: number;
}

export default function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [experience, setExperience] = useState<ExperienceSummary>({
    _id: id || "",
    title: "",
    date: "",
    time: "",
    price: 0,
  });

  const [qty, setQty] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [search, setSearch] = useState("");


  // ✅ Properly extract query params when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setExperience({
      _id: id || "",
      title: decodeURIComponent(params.get("title") || ""),
      date: params.get("date") || "",
      time: params.get("time") || "",
      price: Number(params.get("price")) || 0,
    });
      // ✅ Set quantity from params if exists
  const qtyFromParams = Number(params.get("qty"));
  if (qtyFromParams > 0) setQty(qtyFromParams);
  }, [id, location.search]);

  // 🧮 Calculate totals
  const subtotal = experience.price * qty;
  const taxes = 59;
  const total = subtotal + taxes - discount;

  // 🧾 Validate Promo Code
  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/promo/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      });
      const data = await res.json();

      if (data.valid) {
        if (data.promo.type === "percent") {
          setDiscount(Math.round(subtotal * (data.promo.value / 100)));
        } else if (data.promo.type === "flat") {
          setDiscount(data.promo.value);
        }
        alert(`✅ Promo applied: ${promoCode.toUpperCase()}`);
      } else {
        alert("❌ Invalid promo code");
      }
    } catch (err) {
      console.error("Promo validation error:", err);
    }
  };

  // 💳 Confirm Booking
  const handleConfirm = async () => {
    if (!agree) return alert("Please agree to the terms first.");
    if (!name || !email) return alert("Please fill all required fields.");

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: experience._id,
          slotDate: experience.date,
          slotTime: experience.time,
          name,
          email,
          qty,
          pricePaid: total,
          promoCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/result?success=true&id=${data.bookingId}`);
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
         {/* Left - Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img
                src={deliote}
                alt="Highway Delite Logo"
                className="w-20 h-20 rounded-full border-2 shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute rounded-full blur opacity-25 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
          </div>
        
      <div className="flex w-full max-w-lg items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <input
          type="text"
          placeholder="Search experiences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-5 py-2 text-gray-700 placeholder-gray-500 focus:outline-none"
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-r-full transition-all duration-200">
          Search
        </button>
      </div>
      </header>
      <Link to="/" className="text-gray-700 relative right-5/12 hover:text-gray-900 text-sm">
          ← Checkout
        </Link>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* Left Form */}
        <div className="flex-1 border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
            />
            <button
              onClick={applyPromo}
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              Apply
            </button>
          </div>

        

          <div className="flex items-start gap-2 mt-6">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 accent-yellow-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 select-none"
            >
              I agree to the terms and safety policy
            </label>
          </div>
        </div>

        {/* Right Summary */}
        <div className="w-full md:w-80 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Experience
          </h2>

          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <div className="flex justify-between">
              <span>Experience</span>
              <span className="font-medium">
                {experience.title || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{experience.date || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{experience.time || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{qty}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-base font-semibold text-gray-900 mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full py-3 rounded-md transition font-semibold ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </main>
    </div>
  );
}
