import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productos from '../data/products.json';
import { useCart } from '../context/CartContext';

const penFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
});

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = productos.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timerId = window.setTimeout(() => {
      setJustAdded(false);
    }, 1500);
    return () => window.clearTimeout(timerId);
  }, [justAdded]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
    setJustAdded(true);
  };

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-bold text-zinc-100">Producto no encontrado</h2>
          <Link
            to="/productos"
            className="font-semibold text-indigo-400 no-underline transition-colors hover:text-indigo-300"
          >
          Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-lg sm:p-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-zinc-800 p-4">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="max-h-[420px] w-full rounded-lg object-cover"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-400">
              {product.categoria}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{product.nombre}</h1>
            <p className="mb-4 text-3xl font-bold text-zinc-100">
              {penFormatter.format(product.precio)}
            </p>
            <p className="mb-6 leading-relaxed text-zinc-400">{product.descripcion}</p>

            <div className="mb-5">
              <label htmlFor="product-quantity" className="mb-2 block text-sm font-semibold text-zinc-300">
                Cantidad
              </label>
              <select
                id="product-quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-28 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-zinc-100 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                Agregar al carrito
              </button>
              <span
                className={`inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 transition-opacity duration-300 ${
                  justAdded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span aria-hidden>✓</span> ¡Agregado!
              </span>
            </div>

            <div>
              <Link
                to="/productos"
                className="font-semibold text-indigo-400 no-underline transition-colors hover:text-indigo-300"
              >
                ← Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}