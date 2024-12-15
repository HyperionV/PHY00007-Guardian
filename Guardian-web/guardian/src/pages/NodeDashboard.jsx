import { Layout } from "@/src/components/layout";
import { Map } from "@/src/components/map";
import { SensorGauge } from "@/src/components/sensor-gauge";
import { AverageReadingsChart } from "@/src/components/charts";
import {
  Droplets,
  Thermometer,
  Gauge,
  Wind,
  Cloud,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/src/firebase-config";
import { ref, get } from "firebase/database";
import { useParams } from "react-router-dom";

export default function NodeDashboard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [nodes, setNodes] = useState([]);
  const [data, setData] = useState([]);
  const [selectedNode, setSelectedNode] = useState("node_1");
  const { nodeId } = useParams();

  // Fetch available nodes
  useEffect(() => {
    const fetchNodes = async () => {
      const nodesRef = ref(db, "nodes");
      const snapshot = await get(nodesRef);
      if (snapshot.exists()) {
        const nodeKeys = Object.keys(snapshot.val());
        setNodes(nodeKeys);
        setSelectedNode(nodeId || nodeKeys[0]);
      }
    };

    fetchNodes();
  }, [nodeId]);

  // Fetch data for selected node
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

    if (selectedNode) {
      fetchData();
    }
  }, [selectedNode]);

  const calculateRiskLevel = (reading) => {
    if (!reading)
      return { status: "Unknown", description: "No data available" };

    let dangerScore = 0;

    const temperature = parseFloat(reading.temperature);
    const airMoisture = parseFloat(reading.air_moisture);
    const distance = parseFloat(reading.distance);
    const lightIntensity = parseFloat(reading.light_intensity);
    const movingMagnitude = parseFloat(reading.moving_magnitude);
    const soilMoisture = parseFloat(reading.soil_moisture);
    const coConcentration = parseFloat(reading.co_concentration);

    if (temperature > 35 || temperature < 15) dangerScore += 2;
    if (airMoisture < 30 || airMoisture > 80) dangerScore += 2;
    if (distance < 50) dangerScore += 2;
    if (lightIntensity < 10) dangerScore += 1;
    if (movingMagnitude > 2) dangerScore += 2;
    if (soilMoisture < 20 || soilMoisture > 80) dangerScore += 2;
    if (coConcentration > 5) dangerScore += 2;

    if (dangerScore >= 6) {
      return { status: "High Risk", description: "Forest fire risk detected" };
    } else if (dangerScore >= 3) {
      return {
        status: "Medium Risk",
        description: "Potential risk conditions",
      };
    }
    return { status: "Low Risk", description: "Normal conditions" };
  };

  const latestReading = data[0] || null;
  const riskLevel = calculateRiskLevel(latestReading);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Cat Tien National Park: Node {selectedNode}
            </h1>
            <div
              className={`
              ${
                riskLevel.status === "High Risk"
                  ? "text-red-500"
                  : riskLevel.status === "Medium Risk"
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            `}
            >
              Status: {riskLevel.status}
            </div>
            <div className="text-sm">{riskLevel.description}</div>
          </div>
          <select
            className="border rounded p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>

        <div>
          <Map data={latestReading} />
          <AverageReadingsChart data={data} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <SensorGauge
            value={latestReading?.temperature}
            unit="°C"
            label="Temperature"
            icon={<Thermometer className="h-6 w-6 text-blue-500" />}
            max={50}
          />
          <SensorGauge
            value={latestReading?.air_moisture}
            unit="%"
            label="Air Moisture"
            icon={<Droplets className="h-6 w-6 text-blue-500" />}
            max={100}
          />
          <SensorGauge
            value={latestReading?.soil_moisture}
            unit="%"
            label="Soil Moisture"
            icon={<Gauge className="h-6 w-6 text-brown-500" />}
            max={100}
          />
          <SensorGauge
            value={latestReading?.co_concentration}
            unit="PPM"
            label="CO Concentration"
            icon={<Wind className="h-6 w-6 text-yellow-500" />}
            max={10}
          />
          <SensorGauge
            value={latestReading?.light_intensity}
            unit="cd/m²"
            label="Light Intensity"
            icon={<Cloud className="h-6 w-6 text-blue-500" />}
            max={100}
          />
          <SensorGauge
            value={latestReading?.moving_magnitude}
            unit="mm/s"
            label="Movement"
            icon={<Activity className="h-6 w-6 text-gray-500" />}
            max={10}
          />
        </div>
      </div>
    </Layout>
  );
}
