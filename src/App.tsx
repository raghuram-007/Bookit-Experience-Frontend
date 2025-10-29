import { useEffect, useState } from "react";
import "./App.css";
import ExperienceCard from "./components/ExperienceCard";
import deliote from "./assets/deliote.png";

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

function App() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("https://bookit-experiences-slots.onrender.com/api/experiences");
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      exp.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading amazing experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-200 max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-600 text-xl font-bold mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100  ">
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white backdrop-blur-sm border-b border-gray-200 shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
    {/* Left - Logo */}
    <div className="flex items-center gap-3 group cursor-pointer">
      <img
        src={deliote}
        alt="logo"
        className="w-20 h-20 rounded-full border-2 shadow-md group-hover:scale-110 transition-transform duration-300"
      />
    </div>

    {/* Middle - Search */}
    <div className="flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <input
        type="text"
        placeholder="Search experiences..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-5 py-2 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 transition-all duration-200">
        Search
      </button>
    </div>
  </div>
</header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
       
       
      
        {/* Experiences Grid */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No experiences found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        )}
      </main>

     
    </div>
  );
}

export default App;