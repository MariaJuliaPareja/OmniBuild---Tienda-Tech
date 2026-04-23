import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import ProductDetail from './pages/ProductDetail';

function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        background: '#111a1a',
        padding: '12px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center'
      }}
    >
      <div>
        <span
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          OmniBuild
        </span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            marginRight: '25px',
            fontWeight: '500',
            color: location.pathname === '/' ? 'white' : '#bbb',
            borderBottom: location.pathname === '/' ? '2px solid #38bdf8' : 'none',
            paddingBottom: '4px'
          }}
        >
          Inicio
        </Link>

        <Link
          to="/productos"
          style={{
            textDecoration: 'none',
            fontWeight: '500',
            color: location.pathname === '/productos' ? 'white' : '#bbb',
            borderBottom: location.pathname === '/productos' ? '2px solid #38bdf8' : 'none',
            paddingBottom: '4px'
          }}
        >
          Productos
        </Link>
      </div>

      <div></div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;