'use client'

import { useState } from 'react'
import { Chat } from '@/src/components/chat'
import { ChatInputArea } from '@/src/components/chat-input-area'
import { Layout } from '@/src/components/layout'



const WELCOME_MESSAGE = {
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

      const data = "Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?"
      const assistantMessage= {
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
      <div className="flex flex-col h-[calc(80vh-5rem)] bg-gray-100">
        <div className="flex-1 overflow-hidden">
          <Chat
            messages={messages}
            loading={loading}
            onReset={handleReset}
          />
        </div>
        <ChatInputArea onSend={handleSend} />
      </div>
    </Layout>
  )
}

