import { Button } from "@/components/ui/button"
export const ResetChat = ({ onReset }) => {
  return (
    <Button onClick={onReset} variant="outline">
      Đoạn chat mới
    </Button>
  )
}

