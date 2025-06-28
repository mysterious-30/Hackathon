'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, ChatState } from '@/types'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Bot, ArrowLeft } from 'lucide-react'

interface ChatInterfaceProps {
  initialImageUrl: string
  onBack: () => void
}

export default function ChatInterface({ initialImageUrl, onBack }: ChatInterfaceProps) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isUploading: false,
    isTyping: false
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate AI response
  const simulateAIResponse = async (userMessage: string) => {
    setChatState(prev => ({ ...prev, isTyping: true }))
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const aiResponses = [
      "Based on the image you've shared, I can see signs of [condition]. This appears to be a common dental issue that typically requires professional attention.",
      "The symptoms you're describing, combined with the visual evidence, suggest [diagnosis]. I recommend scheduling a consultation with your dentist.",
      "From a clinical perspective, this presentation is consistent with [condition]. Here are some immediate steps you can take: [recommendations].",
      "The image shows [observation]. While I can provide general guidance, this requires professional evaluation for accurate diagnosis and treatment.",
      "Based on the visual assessment, I notice [findings]. This type of presentation typically indicates [condition] and should be evaluated by a dental professional."
    ]
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: randomResponse,
      sender: 'ai',
      timestamp: new Date()
    }
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, aiMessage],
      isTyping: false
    }))
  }

  // Initialize chat with uploaded image
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      content: "I've uploaded an image of my oral issue. Can you please analyze it and provide professional advice?",
      sender: 'user',
      timestamp: new Date(),
      imageUrl: initialImageUrl
    }
    
    setChatState(prev => ({
      ...prev,
      messages: [initialMessage]
    }))
    
    // Simulate initial AI response
    setTimeout(() => {
      simulateAIResponse("")
    }, 1000)
  }, [initialImageUrl])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatState.messages])

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }))
    
    // Simulate AI response
    simulateAIResponse(content)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="chat-container px-1 sm:px-2 md:px-0"
    >
      <div className="flex-1 flex flex-col h-full justify-between">
        <div className="backdrop-blur-lg bg-white bg-opacity-80 rounded-2xl shadow-2xl flex flex-col h-full p-2 sm:p-4 md:p-6">
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-white bg-opacity-80 border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between rounded-t-2xl"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dental-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Dental AI Assistant</h2>
                  <p className="text-sm text-gray-500">Professional consultation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scrollbar-hide">
            <AnimatePresence>
              {chatState.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>
            
            {/* Typing indicator */}
            {chatState.isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="flex items-end max-w-xs lg:max-w-md">
                  <div className="flex-shrink-0 w-8 h-8 bg-dental-500 rounded-full flex items-center justify-center mr-2">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="message-bubble message-ai">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={chatState.isTyping}
          />
        </div>
      </div>
    </motion.div>
  )
} 
