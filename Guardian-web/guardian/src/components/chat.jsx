import { ChatLoader } from "./chat-loader"
import { ChatMessage } from "./chat-message"
import { ResetChat } from "./reset-chat"
import { useAutoScroll } from "@/src/hooks/auto-scroll"


export const Chat = ({ messages, loading, onReset }) => {
  const scrollRef = useAutoScroll(messages)
  return (
    <div className="flex flex-col h-full relative">
      {/* Scrollable chat messages */}
      <div className="flex-1 overflow-y-auto" ref= {scrollRef}>
        <div className="space-y-4">
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

      {/* Fixed reset button */}
      <div className="absolute bottom-0 left-1/3 w-full bg-transparent p-1 shadow-lg">
        <ResetChat onReset={onReset} />
      </div>
    </div>
  );
};


