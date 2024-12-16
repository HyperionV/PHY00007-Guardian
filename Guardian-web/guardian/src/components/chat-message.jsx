
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Bot } from 'lucide-react'

export const ChatMessage= ({ message }) => {
  if (message.role === 'system') {
    return (
      <div className="flex justify-center pt-5">
        <div className="max-w-[80%] p-2 rounded-lg bg-blue-100 text-blue-800">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-2 my-4 ${message.role === 'user' ? 'flex-row-reverse pr-10' : 'pl-10'}`}>
      <Avatar className={message.role === 'user' ? 'bg-blue-500' : 'bg-gray-400'}>
        <AvatarFallback className={message.role === 'user' ? 'bg-blue-500' : 'bg-none border-white'}>
          {message.role === 'user' ? <User className="text-white bg-blue-500" /> : <img src='icon.png' className="text-white" />}
        </AvatarFallback>
      </Avatar>
      <div className={`max-w-[80%] p-3 rounded-2xl ${
        message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        {message.content}
      </div>
    </div>
  )
}

