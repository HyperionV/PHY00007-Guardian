import { Card } from "@/components/ui/card"



export function SensorGauge({ value, unit, label, icon, max = 100, color = "#4C9F4C" }) {
  const percentage = (value / max) * 100

  return (
    <Card className="p-4">
      <div className="relative w-full aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-4/5 h-4/5">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.827} 282.7`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground">{unit}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0">
          {icon}
        </div>
      </div>
      <div className="text-sm text-center mt-2">{label}</div>
    </Card>
  )
}

