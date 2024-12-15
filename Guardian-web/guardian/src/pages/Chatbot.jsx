'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Chat } from '@/src/components/chat'
import { ChatInputArea } from '@/src/components/chat-input-area'
import { Layout } from '@/src/components/layout'

const WELCOME_MESSAGE= {
    role: 'system',
    content: 'Chào mừng bạn đến với Hệ thống Ứng dụng IoT Hỗ trợ Giám sát và Bảo vệ Rừng! Tôi có thể giúp gì cho bạn hôm nay?'
  }

export default function ChatInterface() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [loading, setLoading] = useState(false)

  const handleSend = async (message) => {
    if (!message.trim()) return

    const userMessage = {
      role: 'user',
      content: message.trim()
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setLoading(true)

    try {
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message: userMessage.content }),
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to get response from the model')
      // }

      const data = "Hi, I'm the assistant. How can I help you today?"
      const assistantMessage = {
        role: 'assistant',
        content: data
      }

      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE])
  }

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-100">
        <ScrollArea className="flex-1 px-4 py-4">
          <Chat
            messages={messages}
            loading={loading}
            onReset={handleReset}
          />
        </ScrollArea>
        <ChatInputArea onSend={handleSend} />
      </div>
    </Layout>
  )
}

