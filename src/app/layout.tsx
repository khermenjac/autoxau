export const metadata = {
  title: 'AutoXAU Trading Bot',
  description: 'Professional XAUUSD Trading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
