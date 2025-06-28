'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageUpload from '@/components/ImageUpload'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create object URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)
    setUploadedImageUrl(imageUrl)
    setShowChat(true)
    setIsUploading(false)
  }

  const handleBackToUpload = () => {
    setShowChat(false)
    setUploadedImageUrl(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <ImageUpload
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen"
          >
            {uploadedImageUrl && (
              <ChatInterface
                initialImageUrl={uploadedImageUrl}
                onBack={handleBackToUpload}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 