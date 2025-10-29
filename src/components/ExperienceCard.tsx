import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
}

interface Props {
  experience: Experience;
}

const ExperienceCard: React.FC<Props> = ({ experience }) => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleClick = () => {
    navigate(`/experience/${experience._id}`); // ✅ navigate to the route
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm w-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <img
          src={
            experience.images?.[0] ||
            "https://images.pexels.com/photos/163240/bungee-jumping-sport-activity-163240.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex-1">
            {experience.title}
          </h3>
          {experience.category && (
            <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded flex-shrink-0">
              {experience.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {experience.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">From</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{experience.price}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent parent click
              navigate(`/experience/${experience._id}`);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
