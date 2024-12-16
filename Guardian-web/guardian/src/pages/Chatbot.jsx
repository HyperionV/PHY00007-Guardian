"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInputArea } from "@/src/components/chat-input-area";
import { Layout } from "@/src/components/layout";
import { Button } from "@/components/ui/button"; 
import { FileText } from "lucide-react"; 

const WELCOME_MESSAGE = {
  role: "system",
  content:
    "Chào mừng bạn đến với Hệ thống Ứng dụng IoT Hỗ trợ Giám sát và Bảo vệ Rừng! Tôi có thể giúp gì cho bạn hôm nay?",
};

const API_URL = "http://localhost:5000/api/chat";

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20); // Adjust speed here (lower = faster)
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}</span>;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState("");

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the model");
      }

      const data = await response.json();
      setCurrentTypingMessage(data.response);
      setShowTyping(true);

      const assistantMessage = {
        role: "assistant",
        content: data.response,
        isTyping: true,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content:
          "I apologize, but I encountered an error while processing your request. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  const handleCreateReport = () => {
    // Implement report creation logic here
    console.log("Creating report...");
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-100">
        <div className="flex-1 flex justify-center">
          <div className="w-[80%] flex flex-col">
            <div className="flex justify-between items-center py-2 px-4">
              <Button
                onClick={handleCreateReport}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText size={16} />
                Create Report
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="hover:bg-gray-200"
              >
                New Conversation
              </Button>
            </div>
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {message.isTyping ? (
                        <TypingAnimation text={message.content} />
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-lg bg-gray-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <ChatInputArea onSend={handleSend} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
