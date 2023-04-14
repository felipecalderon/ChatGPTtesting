import './globals.css'

export const metadata = {
  title: 'Chatbot GPT',
  description: 'Testing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es_ES">
      <body>{children}</body>
    </html>
  )
}
