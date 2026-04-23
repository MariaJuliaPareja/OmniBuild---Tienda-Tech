import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/products.json';
import { useCart } from '../context/CartContext';

function getImageUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export default function Catalogo() {
  const [categoria, setCategoria] = useState('Todos');
  const [justAddedId, setJustAddedId] = useState(null);
  const { addToCart } = useCart();

  const categorias = [
    'Todos',
    'Procesadores',
    'Placas Madre',
    'Memorias RAM',
    'Tarjetas Gráficas',
    'Almacenamiento',
    'Fuentes de Poder',
    'Monitores',
    'Periféricos',
  ];

  const productosFiltrados =
    categoria === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  useEffect(() => {
    if (!justAddedId) return;
    const timer = setTimeout(() => setJustAddedId(null), 1500);
    return () => clearTimeout(timer);
  }, [justAddedId]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
  };

  return (
    <section className="min-h-screen bg-gray-200 px-6 py-10 text-black">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Catálogo de Productos
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Selecciona una categoría para explorar los productos disponibles.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                categoria === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {productosFiltrados.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to={`/producto/${product.id}`}>
                <div className="flex h-60 items-center justify-center bg-white p-4">
                  <img
                    src={getImageUrl(product.imagen)}
                    alt={product.nombre}
                    className="h-full w-full object-contain bg-white"
                  />
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-sm font-medium text-black">
                    {product.nombre}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {product.categoria}
                  </p>

                  <p className="mt-2 text-base font-bold text-blue-600">
                    S/ {product.precio}.00
                  </p>
                </div>
              </Link>

              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                  Agregar al carrito
                </button>

                {justAddedId === product.id && (
                  <p className="mt-2 text-center text-sm font-medium text-green-600">
                    Producto agregado al carrito
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}