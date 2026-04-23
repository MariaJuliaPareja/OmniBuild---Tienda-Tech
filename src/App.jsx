import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { useCart } from './context/CartContext';

function navLinkClass(active) {
  return [
    'pb-1 font-medium no-underline border-b-2 transition-colors duration-150',
    active
      ? 'text-white border-sky-400'
      : 'text-neutral-400 border-transparent hover:text-neutral-200',
  ].join(' ');
}

function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="grid grid-cols-[1fr_1fr_1fr] items-center gap-4 bg-[#111a1a] px-5 py-3">
      <div>
        <span className="text-lg font-bold text-white">OmniBuild</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link to="/" className={navLinkClass(location.pathname === '/')}>
          Inicio
        </Link>

        <Link
          to="/productos"
          className={navLinkClass(location.pathname === '/productos')}
        >
          Productos
        </Link>

        <Link
          to="/carrito"
          className={`relative inline-flex items-center justify-center rounded-md p-2 text-white transition-colors duration-150 hover:bg-white/10 ${
            location.pathname === '/carrito' ? 'ring-2 ring-sky-400/60' : ''
          }`}
          aria-label="Carrito de compras"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="17" cy="20" r="1.25" />
            <path d="M3 4h2l1 12h12l1.5-9H7" />
          </svg>
          {totalItems > 0 && (
            <span
              key={totalItems}
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white shadow-sm transition-transform duration-150 animate-cart-badge-pop"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
      </div>

      <div />
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
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
