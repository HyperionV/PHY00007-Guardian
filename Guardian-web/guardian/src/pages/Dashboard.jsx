import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Layout } from "@/src/components/layout";
import { db } from "@/src/firebase-config";
import { ref, get } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import AddNodeModal from "@/src/components/add-node-modal";
import SelectStation from "@/src/components/select-station";

const toFixedNumber = (value, decimalPlaces) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "N/A" : num.toFixed(decimalPlaces);
};

const calculateDanger = (data) => {
    let dangerScore = 0;

    const pitch = parseFloat(data.mpu6050.pitch);
    const roll = parseFloat(data.mpu6050.roll);
    const ultrasonic = parseFloat(data.ultrasonic);
    const photoresistor = parseFloat(data.photoresistor);
    const temperature = parseFloat(data.dht11.temperature);
    const humidity = parseFloat(data.dht11.humidity);
    const mq09 = parseFloat(data.mq09);
    const soilMoisture = parseFloat(data.soilMoisture);

    if (Math.abs(pitch) > 10 || Math.abs(roll) > 10) dangerScore += 2;
    if (ultrasonic < 50) dangerScore += 2;
    if (photoresistor < 100) dangerScore += 1;
    if (temperature > 30 || temperature < 15) dangerScore += 2;
    if (humidity < 40 || humidity > 80) dangerScore += 2;
    if (mq09 > 500) dangerScore += 2;
    if (soilMoisture < 20 || soilMoisture > 80) dangerScore += 2;

    if (dangerScore >= 6) return "HIGH";
    if (dangerScore >= 3) return "AVERAGE";
    return "LOW";
};


const DashboardTable = () => {
    const [nodes, setNodes] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortField, setSortField] = useState("timestamp", null);
    const [selectedNode, setSelectedNode] = useState("node_1");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNodes = async () => {
            const nodesRef = ref(db, "nodes"); // Assume "nodes" contains all the nodes
            const snapshot = await get(nodesRef);
            if (snapshot.exists()) {
                const nodeKeys = Object.keys(snapshot.val());
                setNodes(nodeKeys);
                setSelectedNode(nodeKeys[0]); // Default to the first node
            }
        };

        fetchNodes();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const nodeRef = ref(db, 'nodes/' + selectedNode);
            const snapshot = await get(nodeRef)
            if (snapshot.exists()) {
                const fetchedData = Object.values(snapshot.val())
                fetchedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                setData(fetchedData)
            }
        }

        fetchData()
    }, [selectedNode]);

    const sortData = (field, subField, order) => {
        if (field === "timestamp") {
            const sortedData = [...data].sort((a, b) => {
                if (order === "asc") {
                    return new Date(a[field]).getTime() - new Date(b[field]).getTime();
                }
                return new Date(b[field]).getTime() - new Date(a[field]).getTime();
            });
            setData(sortedData);
            return;
        }

        if (subField) {
            const sortedData = [...data].sort((a, b) => {
                if (order === "asc") {
                    return a[field][subField] - b[field][subField];
                }
                return b[field][subField] - a[field][subField];
            });
            setData(sortedData);
            return;
        }

        const sortedData = [...data].sort((a, b) => {
            if (order === "asc") {
                return a[field] - b[field];
            }
            return b[field] - a[field];
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
    }

    const handleSort = (field, subField) => {
        if (sortField === field) {
            sortData(field, subField, "asc");
            setSortField(null);
        } else {
            sortData(field, subField, "desc");
            setSortField(field, subField);
        }
    }

    const handleSelectNode = (node) => {
        setSelectedNode(node);
    }

    return (
        <Layout>
            <div className="relative w-full h-32 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url(../../public/dashboard.jpg)" }}>
                <div className="absolute top-4 left-4 justify-end">
                    <h1 className="text-white text-2xl font-bold">DASHBOARD</h1>
                </div>
            </div>

            <SelectStation />

            <div className="space-y-4">
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center space-x-2">
                        <span
                            style={{ color: "#4C9F4C" }}
                            className="text-lg font-bold">Vườn Quốc Gia Cát Tiên: Node: </span>
                        <Select value={selectedNode} onValueChange={handleSelectNode}>
                            <SelectTrigger>
                                <span className="text-lg font-bold">{selectedNode}</span>
                            </SelectTrigger>
                            <SelectContent>
                                {nodes.map((node) => (
                                    <SelectItem key={node} value={node} onClick={() => handleSelectNode(node)}>
                                        {node}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <AddNodeModal />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button onClick={() => navigate('/node')} variant="outline" type="button">
                            Xem chi tiết
                        </Button>
                    </div>

                    <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => setItemsPerPage(Number(value))}
                    >
                        <SelectTrigger className="text-sm text-gray-500">
                            Hiển thị {itemsPerPage} mục
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5" onClick={handleSelectOption}> 5 </SelectItem>
                            <SelectItem value="10" onClick={handleSelectOption}> 10 </SelectItem>
                            <SelectItem value="15" onClick={handleSelectOption}> 15 </SelectItem>
                            <SelectItem value={data.length} onClick={handleSelectOption}> Tất cả </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">STT</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("timestamp")}>Timestamp</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("mpu6050", "pitch")}>Pitch</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("mpu6050", "roll")}>Roll</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("ultrasonic")}>Ultrasonic</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("photoresistor")}>Photoresistor</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("dht11", "temperature")}>Temperature</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("dht11", "humidity")}>Humidity</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("mq09")}>MQ09</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort("soilMoisture")}>Soil Moisture</th>
                            <th className="px-4 py-2 border border-gray-300">Danger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index} className="text-center">
                                <td className="px-4 py-2 border">{startIndex + index + 1}</td>
                                <td className="px-4 py-2 border">{new Date(row.timestamp).toLocaleString()}</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.mpu6050.pitch, 2)}</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.mpu6050.roll, 2)}</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.ultrasonic, 0)} cm</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.photoresistor, 0)}</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.dht11.temperature, 2)}°C</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.dht11.humidity, 2)}%</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.mq09, 2)} ppm</td>
                                <td className="px-4 py-2 border">{toFixedNumber(row.soilMoisture, 0)}%</td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${calculateDanger(row) === "HIGH"
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
                        Hiển thị {startIndex + 1} đến {Math.min(endIndex, data.length)} của {data.length} mục
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
