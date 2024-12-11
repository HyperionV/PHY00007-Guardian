'use client'

import { Card } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: 'Jan', temperature: 0, humidity: 0, soilMoisture: 0 },
  { month: 'Feb', temperature: 40, humidity: 30, soilMoisture: 45 },
  { month: 'Mar', temperature: 45, humidity: 20, soilMoisture: 30 },
  { month: 'Apr', temperature: 30, humidity: 15, soilMoisture: 25 },
]

export function AverageReadingsChart() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Average Readings Summary</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Nhiệt độ" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Độ ẩm không khí" />
            <Line type="monotone" dataKey="soilMoisture" stroke="#ffc658" name="Độ ẩm không khí" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

