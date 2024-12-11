import React, { useState, useRef } from "react";

export const Select = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={handleToggle} className="cursor-pointer">
        {React.Children.map(children, (child) => {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, { isOpen, handleClose });
          }
          return null;
        })}
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {React.Children.map(children, (child) => {
            if (child.type === SelectContent) {
              return React.cloneElement(child, { handleClose });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children }) => {
  return (
    <button
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
    >
      {children}
    </button>
  );
};

export const SelectContent = ({ children, handleClose }) => {
  return (
    <ul className="py-1 text-gray-700">
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { handleClose });
        }
        return null;
      })}
    </ul>
  );
};

export const SelectItem = ({ children, value, onClick, handleClose }) => {
  return (
    <li
      className="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (onClick) onClick(value);
        if (handleClose) handleClose();
      }}
    >
      {children}
    </li>
  );
};

export const SelectValue = ({ value }) => {
  return <span>{value || "Select an option"}</span>;
};