# Dental AI Chat - Professional Oral Health Consultation

A modern, professional chat-based frontend experience for dental consultations using AI. Users can upload images of their oral issues and receive clinical, concise advice through an intuitive chat interface.

## Features

- **Image Upload**: Drag-and-drop or click-to-browse image upload functionality
- **Chat Interface**: Professional chat experience with smooth transitions
- **AI Responses**: Simulated clinical AI responses with typing indicators
- **Modern UI**: Beautiful, responsive design with animations
- **Professional Design**: Clean, medical-grade interface suitable for healthcare

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dental-ai-chat
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ImageUpload.tsx      # Image upload component
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── ChatMessage.tsx      # Individual message component
│   └── ChatInput.tsx        # Chat input component
└── types.ts                 # TypeScript type definitions
```

## Features in Detail

### Image Upload Experience
- Drag and drop functionality
- File validation (images only)
- Preview before upload
- Loading states and animations
- Professional upload zone design

### Chat Interface
- Smooth transition from upload to chat
- Message bubbles with proper styling
- User messages on the right (blue)
- AI responses on the left (white with green accent)
- Typing indicators
- Auto-scroll to latest messages
- Responsive design for all screen sizes

### Animations and Transitions
- Page transitions using Framer Motion
- Message entrance animations
- Typing indicator animations
- Hover effects and micro-interactions
- Smooth state transitions

## Customization

### Colors
The application uses a custom color palette defined in `tailwind.config.js`:
- Primary colors (blue) for user interactions
- Dental colors (green) for AI/medical elements
- Gray scale for neutral elements

### Animations
Custom animations are defined in the Tailwind config:
- `fade-in`: Smooth opacity transitions
- `slide-up`: Vertical slide animations
- `bounce-in`: Scale and bounce effects

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Real AI Integration

To integrate with a real AI service:

1. Replace the `simulateAIResponse` function in `ChatInterface.tsx`
2. Add API calls to your AI service
3. Handle loading states and error cases
4. Implement proper image upload to your backend

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 