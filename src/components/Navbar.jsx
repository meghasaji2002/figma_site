import React, { useState } from "react";
import SelectIcon from "./icons/SelectIcon";

const Navbar = ({ onSelectShape, onSelectColor }) => {
  const [isShapeDropdownOpen, setShapeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");

  const toggleShapeDropdown = () => {
    setShapeDropdownOpen(!isShapeDropdownOpen);
    setColorDropdownOpen(false); // Close color dropdown
  };

  const toggleColorDropdown = () => {
    setColorDropdownOpen(!isColorDropdownOpen);
    setShapeDropdownOpen(false); // Close shape dropdown
  };

  const handleSelectShape = (shapeType) => {
    setShapeDropdownOpen(false);
    onSelectShape(shapeType);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div>
      <nav className="bg-white shadow-md flex justify-between items-center px-12 py-8">
        <div className="hidden md:block">
          <a
            className="text-black hover:text-gray-800 font-extrabold px-3 py-2 rounded-md text-sm"
            href="/"
          >
            FIGMA
          </a>
        </div>

        <div className="relative flex">
        <button
            type="button"
            className="flex mx-8 items-center text-black hover:text-gray-800 font-bold px-3 py-2 rounded-md text-sm focus:outline-none relative"
            onClick={toggleColorDropdown}
          >
            Color <SelectIcon />
            {isColorDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-md z-10">
                <ul className="flex px-4 py-4">
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectColor("red")}>
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  </li>
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectColor("green")}>
                    <div className="w-6 h-6 rounded-full bg-green-500"></div>
                  </li>
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectColor("black")}>
                    <div className="w-6 h-6 rounded-full bg-black"></div>
                  </li>
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectColor("blue")}>
                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  </li>
                </ul>
              </div>
            )}
          </button>
          <button
            type="button"
            className="flex items-center text-black hover:text-gray-800 font-bold px-3 py-2 rounded-md text-sm focus:outline-none relative"
            onClick={toggleShapeDropdown}
          >
            Shape <SelectIcon />
            {isShapeDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-md z-10">
                <ul className="flex px-4 py-4">
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <div
                      className="square border border-black w-12 h-12"
                      onClick={() => handleSelectShape("square")}
                    ></div>
                  </li>
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <div
                      className="square-rounded border border-black rounded w-12 h-12"
                      onClick={() => handleSelectShape("rounded-square")}
                    ></div>
                  </li>
                  <li className="flex justify-center items-center px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <div
                      className="circle border border-black rounded-full w-12 h-12"
                      onClick={() => handleSelectShape("circle")}
                    ></div>
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
