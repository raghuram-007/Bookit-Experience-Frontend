import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import deliote from "../assets/deliote.png";

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  slots: { date: string; time: string; capacity: number; booked: number }[];
}

function ExperienceDetails() {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Use environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch Experience Data
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`${API_URL}/api/experiences/${id}`);
        if (!res.ok) throw new Error("Failed to fetch experience details");
        const data = await res.json();
        setExperience(data);
        if (data.slots && data.slots.length > 0) {
          setSelectedDate(data.slots[0].date);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id, API_URL]);

  const availableDates = [...new Set(experience?.slots?.map(slot => slot.date) || [])];
  const availableTimes = experience?.slots?.filter(slot => slot.date === selectedDate) || [];

  if (loading)
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!experience)
    return <div className="flex justify-center items-center h-screen text-gray-600">No data found</div>;

  const subtotal = experience.price * quantity;
  const tax = 59;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
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
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to Home
          </Link>
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
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT CONTENT */}
        <div>
          <img
            src={experience.images[0]}
            alt={experience.title}
            className="w-full h-80 object-cover rounded-2xl mb-6 shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-4">{experience.description}</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
            <p className="text-yellow-800 text-sm">
              Curated small-group experience. Certified guide. Safety first with gear included.
            </p>
          </div>

          {/* Choose Date */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Choose date</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {availableDates.map(date => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${
                  selectedDate === date
                    ? "bg-yellow-500 border-yellow-500 text-black"
                    : "border-gray-300 text-gray-700 hover:border-yellow-400"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Choose Time */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Choose time</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {availableTimes.map(slot => (
              <button
                key={`${slot.date}-${slot.time}`}
                onClick={() => setSelectedTime(slot.time)}
                disabled={slot.booked >= slot.capacity}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${
                  slot.booked >= slot.capacity
                    ? "opacity-50 cursor-not-allowed"
                    : selectedTime === slot.time
                    ? "bg-yellow-500 border-yellow-500 text-black"
                    : "border-gray-300 text-gray-700 hover:border-yellow-400"
                }`}
              >
                {slot.time}
                {slot.booked >= slot.capacity && (
                  <span className="block text-xs text-red-500 mt-1">Sold out</span>
                )}
              </button>
            ))}
          </div>

          <p className="text-gray-400 text-xs mb-8">All times are in IST (GMT +5:30)</p>
        </div>

        {/* RIGHT SUMMARY CARD */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-fit">
          <div className="space-y-3 text-gray-800">
            <div className="flex justify-between">
              <span>Starts at</span>
              <span className="font-semibold">₹{experience.price}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Quantity</span>
              <div className="flex items-center border rounded-lg">
                <button
                  className="px-2 text-lg text-gray-600 hover:text-black"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <span className="px-3 text-sm font-medium">{quantity}</span>
                <button
                  className="px-2 text-lg text-gray-600 hover:text-black"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <Link
            to={`/book/${experience._id}?title=${encodeURIComponent(experience.title)}&price=${experience.price}&date=${selectedDate}&time=${selectedTime}&qty=${quantity}`}
            onClick={(e) => {
              if (!selectedDate || !selectedTime) e.preventDefault();
            }}
            className={`mt-6 block w-full text-center py-3 rounded-md font-semibold text-lg transition-all duration-200 ${
              !selectedDate || !selectedTime
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
          >
            Confirm
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ExperienceDetails;
