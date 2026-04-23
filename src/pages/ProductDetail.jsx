import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productos from '../data/products.json';
import { useCart } from '../context/CartContext';

function getImageUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = productos.find((p) => p.id === Number(id));
    setProduct(found || null);
  }, [id]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [justAdded]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
  };

  return (
    <section className="min-h-screen bg-gray-200 px-6 py-10 text-black">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl border border-gray-300 bg-white p-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">
          <img
            src={getImageUrl(product.imagen)}
            alt={product.nombre}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-blue-600">
            {product.categoria}
          </p>

          <h1 className="mt-2 text-4xl font-bold">{product.nombre}</h1>

          <p className="mt-3 text-2xl font-bold text-black">
            S/ {product.precio}.00
          </p>

          <p className="mt-4 text-gray-600">{product.descripcion}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Cantidad</p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="rounded bg-gray-300 px-3 py-1"
              >
                -
              </button>

              <span className="w-10 text-center font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded bg-gray-300 px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
          >
            Agregar al carrito
          </button>

          {justAdded && (
            <p className="mt-3 text-sm font-medium text-green-600">
              Producto agregado al carrito
            </p>
          )}

          <div className="mt-4">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}