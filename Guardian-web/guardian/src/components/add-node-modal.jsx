import { useState } from "react";

const AddNodeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      {/* Add Node Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={handleOpenModal}
      >
        Thêm Node
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Modal Header */}
            <h2 className="text-xl font-bold text-center mb-4">Thêm Node</h2>

            {/* Modal Form */}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Trạm</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập ID trạm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Node</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập ID node"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên Node</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập tên node"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNodeModal;
