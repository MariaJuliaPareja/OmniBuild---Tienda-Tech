import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `
  linear-gradient(rgba(11, 29, 38, 0.85), rgba(18, 54, 71, 0.85)),
  url('${import.meta.env.BASE_URL}img/bg.webp')`
  ,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
      }}
    >
      <div style={{ maxWidth: '800px', padding: '20px' }}>
        <h1 style={{ fontSize: '60px', marginBottom: '20px' }}>
          OmniBuild
        </h1>

        <p
          style={{
            fontSize: '20px',
            lineHeight: '1.8',
            marginBottom: '30px'
          }}
        >
          Tu tienda especializada en componentes de PC. Encuentra procesadores,
          tarjetas gráficas, memorias y todo lo que necesitas para armar tu equipo ideal.
        </p>

        <Link
          to="/productos"
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
            color: '#001018',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
          }}
        >
          Ver Catálogo
        </Link>
      </div>
    </div>
  );
}