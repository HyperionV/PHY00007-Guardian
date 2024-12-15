import { ChatInput } from "./chat-input"



export const ChatInputArea = ({ onSend }) => {
  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  )
}

