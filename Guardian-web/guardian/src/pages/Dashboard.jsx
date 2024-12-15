import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Layout } from "@/src/components/layout";
import { db } from "@/src/firebase-config";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import AddNodeModal from "@/src/components/add-node-modal";
import SelectStation from "@/src/components/select-station";
import AddGateWayModal from "../components/add-gateway-modal";

const toFixedNumber = (value, decimalPlaces) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(num) ? "N/A" : num.toFixed(decimalPlaces);
};

const calculateDanger = (data) => {
  let dangerScore = 0;

  const temperature = parseFloat(data.temperature);
  const airMoisture = parseFloat(data.air_moisture);
  const distance = parseFloat(data.distance);
  const lightIntensity = parseFloat(data.light_intensity);
  const movingMagnitude = parseFloat(data.moving_magnitude);
  const soilMoisture = parseFloat(data.soil_moisture);
  const coConcentration = parseFloat(data.co_concentration);

  if (temperature > 35 || temperature < 15) dangerScore += 2;
  if (airMoisture < 30 || airMoisture > 80) dangerScore += 2;
  if (distance < 50) dangerScore += 2;
  if (lightIntensity < 10) dangerScore += 1;
  if (movingMagnitude > 2) dangerScore += 2;
  if (soilMoisture < 20 || soilMoisture > 80) dangerScore += 2;
  if (coConcentration > 5) dangerScore += 2;

  if (dangerScore >= 6) return "HIGH";
  if (dangerScore >= 3) return "AVERAGE";
  return "LOW";
};

const DashboardTable = () => {
  const [nodes, setNodes] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("timestamp");
  const [selectedNode, setSelectedNode] = useState("node_1");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNodes = async () => {
      const nodesRef = ref(db, "nodes");
      const snapshot = await get(nodesRef);
      if (snapshot.exists()) {
        const nodeKeys = Object.keys(snapshot.val());
        setNodes(nodeKeys);
        setSelectedNode(nodeKeys[0]);
      }
    };

    fetchNodes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const nodeRef = ref(db, "nodes/" + selectedNode + "/data");
      const snapshot = await get(nodeRef);
      if (snapshot.exists()) {
        const fetchedData = Object.values(snapshot.val());
        fetchedData.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setData(fetchedData);
      }
    };

    fetchData();
  }, [selectedNode]);

  const sortData = (field, order) => {
    const sortedData = [...data].sort((a, b) => {
      if (field === "timestamp") {
        return order === "asc"
          ? new Date(a[field]).getTime() - new Date(b[field]).getTime()
          : new Date(b[field]).getTime() - new Date(a[field]).getTime();
      }

      return order === "asc"
        ? parseFloat(a[field]) - parseFloat(b[field])
        : parseFloat(b[field]) - parseFloat(a[field]);
    });
    setData(sortedData);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSelectOption = (value) => {
    setCurrentPage(1);
    setItemsPerPage(Number(value));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      sortData(field, "asc");
      setSortField(null);
    } else {
      sortData(field, "desc");
      setSortField(field);
    }
  };

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  return (
    <Layout>
      <div
        className="relative w-full h-32 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url(../../public/dashboard.jpg)" }}
      >
        <div className="absolute top-4 left-4 justify-end">
          <h1 className="text-white text-2xl font-bold">DASHBOARD</h1>
        </div>
      </div>

      <SelectStation />

      <div className="space-y-4">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center space-x-2">
            <span style={{ color: "#4C9F4C" }} className="text-lg font-bold">
              Node:{" "}
            </span>
            <Select value={selectedNode} onValueChange={handleSelectNode}>
              <SelectTrigger>
                <span className="text-md ">{selectedNode}</span>
              </SelectTrigger>
              <SelectContent>
                {nodes.map((node) => (
                  <SelectItem key={node} value={node}>
                    {node}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AddNodeModal />
            <AddGateWayModal />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => navigate("/node")}
              variant="outline"
              type="button"
            >
              View Details
            </Button>
          </div>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleSelectOption}
          >
            <SelectTrigger className="text-sm text-gray-500">
              Show {itemsPerPage} items
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value={data.length.toString()}>All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">No.</th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("timestamp")}
              >
                Timestamp
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("temperature")}
              >
                Temperature
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("air_moisture")}
              >
                Air Moisture
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("distance")}
              >
                Distance
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("light_intensity")}
              >
                Light Intensity
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("moving_magnitude")}
              >
                Moving Magnitude
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("soil_moisture")}
              >
                Soil Moisture
              </th>
              <th
                className="px-4 py-2 border border-gray-300"
                onClick={() => handleSort("co_concentration")}
              >
                CO Concentration
              </th>
              <th className="px-4 py-2 border border-gray-300">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{startIndex + index + 1}</td>
                <td className="px-4 py-2 border">
                  {new Date(row.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.temperature, 1)}°C
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.air_moisture, 1)}%
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.distance, 2)} cm
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.light_intensity, 0)}
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.moving_magnitude, 2)}
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.soil_moisture, 0)}%
                </td>
                <td className="px-4 py-2 border">
                  {toFixedNumber(row.co_concentration, 2)} ppm
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      calculateDanger(row) === "HIGH"
                        ? "bg-red-100 text-red-700"
                        : calculateDanger(row) === "LOW"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {calculateDanger(row)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-5">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardTable;
