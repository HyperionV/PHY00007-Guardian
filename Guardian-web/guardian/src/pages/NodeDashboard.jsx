import { Layout } from "@/src/components/layout"
import { Map } from "@/src/components/map"
import { SensorGauge } from "@/src/components/sensor-gauge"
import { AverageReadingsChart } from "@/src/components/charts"
import { Droplets, Thermometer, Gauge, Wind, Cloud, Activity } from 'lucide-react'
import * as React from 'react'

export default function NodeDashboard() {
  const [selectedYear, setSelectedYear] = React.useState(2024)

  const fetchStationData = async () => {
    const response = await fetch(`https://api.example.com/stations/${selectedYear}`)
    const data = await response.json()
    console.log(data)
  }

//   React.useEffect(() => {
//     fetchStationData()
//   }, [selectedYear])

  const data = {
    stationID: 1,
    nodeID: 1,
    status: "Nguy hiểm",
    statusDescription: "Có nguy cơ cháy rừng",
    position: "Vườn Quốc Gia Cát Tiên"
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
                {data.position}: Trạm {data.stationID} - Node {data.nodeID}
            </h1>
            <div className="text-red-500">Trạng thái: {data.status}</div>
            <div className="text-sm text-red-500">{data.statusDescription}</div>
          </div>
          <select  
            className="border rounded p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            >
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>

        <div >
          <Map data={data}/>
          <AverageReadingsChart />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <SensorGauge
            value={28.236}
            unit="°C"
            label="Nhiệt độ"
            icon={<Thermometer className="h-6 w-6 text-blue-500" />}
            max={50}
          />
          <SensorGauge
            value={0.49}
            unit="%"
            label="Độ ẩm không khí"
            icon={<Droplets className="h-6 w-6 text-blue-500" />}
          />
          <SensorGauge
            value={41}
            unit="%"
            label="Độ ẩm đất"
            icon={<Gauge className="h-6 w-6 text-brown-500" />}
          />
          <SensorGauge
            value={93.02}
            unit="PPM"
            label="Nồng độ khí C0"
            icon={<Wind className="h-6 w-6 text-yellow-500" />}
            max={200}
          />
          <SensorGauge
            value={1000}
            unit="cd/m2"
            label="Cường độ ánh sáng"
            icon={<Cloud className="h-6 w-6 text-blue-500" />}
            max={2000}
          />
          <SensorGauge
            value={6}
            unit="mm/s"
            label="Rung chấn"
            icon={<Activity className="h-6 w-6 text-gray-500" />}
            max={50}
          />
        </div>
      </div>
    </Layout>
  )
}

