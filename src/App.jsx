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
    'rounded-lg px-3 py-2 text-sm font-semibold no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
    active
      ? 'bg-zinc-800 text-zinc-100'
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
  ].join(' ');
}

function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900/80 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 sm:px-6">
        <div>
          <span className="text-lg font-bold text-zinc-100">OmniBuild</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
            className={`relative inline-flex items-center justify-center rounded-lg p-2.5 text-zinc-100 transition-colors duration-150 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
              location.pathname === '/carrito' ? 'bg-zinc-800' : ''
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
              className="h-5 w-5"
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
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
