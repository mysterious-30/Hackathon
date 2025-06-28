'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, X, CheckCircle } from 'lucide-react'
import { ImageUploadProps } from '@/types'

export default function ImageUpload({ onImageUpload, isUploading }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleFileSelect(imageFile)
    }
  }, [])

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      onImageUpload(selectedFile)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex justify-center">
        <div className="backdrop-blur-lg bg-white bg-opacity-80 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-2 sm:mx-4">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4 relative">
              <img src="/tooth-decor.svg" alt="Tooth Illustration" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-lg animate-bounce-slow z-10" />
              <img src="/sparkle.svg" alt="Sparkle" className="sparkle" style={{ top: '-10px', left: '10px', width: '18px', height: '18px', animationDelay: '0.2s' }} />
              <img src="/sparkle.svg" alt="Sparkle" className="sparkle" style={{ top: '10px', right: '-10px', width: '14px', height: '14px', animationDelay: '0.7s' }} />
              <img src="/sparkle.svg" alt="Sparkle" className="sparkle" style={{ bottom: '-8px', left: '30px', width: '10px', height: '10px', animationDelay: '1.1s' }} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-dental-400 to-primary-700 mb-1 sm:mb-2 drop-shadow-md" style={{textShadow: '0 2px 8px rgba(0,0,0,0.10)'}}>Dental AI Consultation</h1>
            <p className="text-gray-700 text-base sm:text-lg font-medium mb-2" style={{textShadow: '0 1px 4px rgba(0,0,0,0.08)'}}>
              Upload an image of your oral issue to get <span className="text-primary-500 font-semibold">professional advice</span>
            </p>
          </div>
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`upload-zone ${isDragOver ? 'upload-zone-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload your oral image
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn-primary cursor-pointer inline-block"
                >
                  Choose Image
                </label>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 w-full max-w-md mx-auto"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Selected Image
                  </h3>
                  <button
                    onClick={handleRemove}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={previewUrl!}
                    alt="Preview"
                    className="w-full h-40 sm:h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 break-all max-w-full">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-xs">{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="btn-primary w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </div>
                    ) : (
                      'Start Consultation'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
} 
