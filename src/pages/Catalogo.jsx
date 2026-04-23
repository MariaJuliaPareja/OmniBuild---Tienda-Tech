import { useState } from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/products.json';
import { useCart } from '../context/CartContext';

const penFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
});

export default function Catalogo() {
  const categorias = [
    'Todos',
    'Procesadores',
    'Placas Madre',
    'Memorias RAM',
    'Tarjetas Gráficas',
    'Almacenamiento',
    'Fuentes de Poder',
    'Monitores',
    'Periféricos'
  ];

  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const { addToCart, cartItems } = useCart();

  const productosFiltrados =
    categoriaActiva === 'Todos'
      ? productos
      : productos.filter((prod) => prod.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-center text-3xl font-bold sm:text-4xl">
          Catálogo de Productos
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-center text-zinc-400">
          Selecciona una categoría para explorar los productos disponibles.
        </p>

        <div className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-3">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
              categoriaActiva === cat
                ? 'bg-indigo-600 text-zinc-100 hover:bg-indigo-700'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productosFiltrados.map((prod) => (
          <article
            key={prod.id}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            <Link to={`/producto/${prod.id}`} className="block no-underline">
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="h-48 w-full bg-zinc-800 object-contain p-4"
              />
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <Link to={`/producto/${prod.id}`} className="no-underline">
                <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-zinc-100">
                  {prod.nombre}
                </h3>
                <p className="mb-3 text-sm text-zinc-400">{prod.categoria}</p>
                <p className="mb-4 text-lg font-bold text-indigo-400">
                  {penFormatter.format(prod.precio)}
                </p>
              </Link>

              <button
                type="button"
                onClick={() => addToCart(prod)}
                className={`mt-auto rounded-lg px-4 py-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
                  cartItems.some((item) => item.id === prod.id)
                    ? 'bg-emerald-700/30 text-emerald-300 hover:bg-emerald-700/45'
                    : 'bg-indigo-600 text-zinc-100 hover:bg-indigo-700'
                } opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100`}
              >
                {cartItems.some((item) => item.id === prod.id)
                  ? 'En carrito ✓'
                  : 'Agregar al carrito'}
              </button>
            </div>
          </article>
        ))}
        </div>
      </div>
    </div>
  );
}