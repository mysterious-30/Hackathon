export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
}

export interface ChatState {
  messages: Message[];
  isUploading: boolean;
  isTyping: boolean;
}

export interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isUploading: boolean;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
} 