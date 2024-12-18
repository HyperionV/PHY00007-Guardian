// src/components/StatusToggleButton.jsx
import React, { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tooltip from "@/src/components/tootip";
import ConfirmationModal from "@/src/components/confirmation-modal";

const StatusToggleButton = ({ status, onToggle, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onToggle();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip content={status ? "Deactivate Warning" : "Activate Warning"}>
        <Button
          onClick={handleClick}
          disabled={loading}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${
            status
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
          }`}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              {status ? (
                <>
                  <AlertCircle className="h-5 w-5" />
                  <span>Deactivate Warning</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Activate Warning</span>
                </>
              )}
            </>
          )}
        </Button>
      </Tooltip>
      {isModalOpen && (
        <ConfirmationModal
          title={status ? "Deactivate Warning" : "Activate Warning"}
          message={`Are you sure you want to ${
            status ? "deactivate" : "activate"
          } the warning for this node?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default StatusToggleButton;