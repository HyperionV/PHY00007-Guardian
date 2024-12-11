import { useState } from "react";

const SelectStation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState("");

  const stations = ["Vườn Quốc Gia Cát Tiên"]; // List of options

  const handleInputClick = () => setIsDropdownOpen(!isDropdownOpen);
  const handleOptionClick = (station) => {
    setSelectedStation(station);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mt-5 mb-5 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Input Field */}
          <input
            type="text"
            value={selectedStation}
            placeholder="Lựa chọn một trạm..."
            readOnly
            onClick={handleInputClick}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-[#e0e0e0] text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
          />

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {stations.map((station, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(station)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {station}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectStation;
