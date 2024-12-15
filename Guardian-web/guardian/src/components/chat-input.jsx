'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from 'lucide-react'



export const ChatInput= ({ onSend }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(input);
      onSend(input);
      setInput('')
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tôi có thể giúp gì cho bạn..."
        className="flex-1 rounded-lg"
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" size="icon" className="rounded-full bg-blue-500">
        <ArrowUp className="h-4 w-4 bg-blue-500" />
      </Button>
    </form>
  )
}

