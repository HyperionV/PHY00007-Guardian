"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Loader2 } from "lucide-react";

export const ChatInput = ({
  onSend,
  isLoading = false,
  placeholder = "Tôi có thể giúp gì cho bạn...",
  maxLength = 1000,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !isLoading) {
      onSend(trimmedInput);
      setInput("");
    }
  };

  return (
    <div className="w-full px-4 py-4 border-t bg-white dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 max-w-4xl mx-auto"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={maxLength}
          className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white
                     transition-colors duration-200 h-14 "
          onKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className={`rounded-full ${
            input.trim() && !isLoading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors duration-200`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </form>
      {input.length > 0 && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {input.length}/{maxLength}
        </div>
      )}
    </div>
  );
};
