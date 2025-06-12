export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#FCD34D',
        marginBottom: '1rem'
      }}>
        AutoXAU
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#9CA3AF' }}>
        Professional XAUUSD Trading Bot
      </p>
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          borderRadius: '0.5rem'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>79.3%</div>
          <div style={{ color: '#9CA3AF' }}>Win Rate</div>
        </div>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          borderRadius: '0.5rem'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>$793</div>
          <div style={{ color: '#9CA3AF' }}>Weekly</div>
        </div>
      </div>
    </div>
  )
}
