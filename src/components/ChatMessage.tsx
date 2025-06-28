'use client'

import { motion } from 'framer-motion'
import { Message } from '@/types'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-xs lg:max-w-md`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'ml-2 bg-primary-500' : 'mr-2 bg-dental-500'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        
        {/* Message Content */}
        <div className={`message-bubble ${isUser ? 'message-user' : 'message-ai'} relative`}>
          {message.imageUrl && (
            <div className="mb-3">
              <img
                src={message.imageUrl}
                alt="Uploaded image"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* AI branding tooth icon */}
          {!isUser && (
            <img src="/tooth-decor.svg" alt="AI Tooth" className="absolute -top-4 -left-4 w-7 h-7 opacity-70" />
          )}
          
          <div className={`text-xs mt-2 ${
            isUser ? 'text-primary-100' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 