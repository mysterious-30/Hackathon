import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dental AI Chat - Professional Oral Health Consultation',
  description: 'Upload an image of your oral issue and get professional, clinical advice from our AI dental assistant.',
  keywords: 'dental, AI, chat, oral health, consultation, professional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Creative animated background */}
        <div className="background-creative">
          <div className="animated-gradient" />
          {/* Floating dental icons */}
          <img src="/tooth-decor.svg" alt="Floating Tooth" className="float-icon" style={{ left: '10vw', top: '10vh', width: '70px', height: '70px' }} />
          <img src="/brush-decor.svg" alt="Floating Brush" className="float-icon float-icon2" />
          <img src="/smile-decor.svg" alt="Floating Smile" className="float-icon float-icon3" />
          <img src="/tooth-decor.svg" alt="Floating Tooth 2" className="float-icon float-icon4" />
          <img src="/sparkle.svg" alt="Floating Sparkle" className="float-icon float-icon5" />
          <img src="/smile-decor.svg" alt="Floating Smile 2" className="float-icon float-icon6" />
          {/* Bokeh particles */}
          <div className="bokeh" style={{ left: '50vw', top: '20vh', width: '100px', height: '100px' }} />
          <div className="bokeh bokeh2" />
          <div className="bokeh bokeh3" />
          <div className="bokeh bokeh4" />
          {/* Animated wave at the bottom */}
          <img src="/wave.svg" alt="Wave" className="wave" />
        </div>
        {/* Decorative smile SVGs */}
        <img src="/smile-decor.svg" alt="Smile Decor" className="smile-decor" />
        <img src="/smile-decor.svg" alt="Smile Decor" className="smile-decor-bl" />
        {children}
        {/* Creative footer */}
        <footer className="footer-creative">
          Made with <span className="mx-1 text-pink-400">❤️</span> for your smile
          <img src="/smile-decor.svg" alt="Smile" className="inline-block ml-2 w-5 h-5 align-middle" />
        </footer>
      </body>
    </html>
  )
} 