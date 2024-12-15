import { ChatLoader } from "./chat-loader"
import { ChatMessage } from "./chat-message"
import { ResetChat } from "./reset-chat"



export const Chat = ({ messages, loading, onReset }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <ResetChat onReset={onReset} />
      </div>

      <div className="flex-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 sm:my-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}
      </div>
    </div>
  )
}

