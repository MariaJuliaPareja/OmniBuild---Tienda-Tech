import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold text-neutral-900">
          Carrito de compras
        </h1>
        <p className="mb-8 text-xl text-neutral-500">
          Tu carrito está vacío. Explora el catálogo para añadir componentes.
        </p>
        <Link
          to="/productos"
          className="inline-flex rounded-lg bg-sky-500 px-5 py-2.5 font-medium text-white no-underline transition-colors duration-150 hover:bg-sky-600"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold text-neutral-900">
          Carrito de compras
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="self-start rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-150 hover:bg-red-50 sm:self-auto"
        >
          Vaciar carrito
        </button>
      </div>

      <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white shadow-sm">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-neutral-900">
                {item.nombre}
              </p>
              <p className="text-sm text-neutral-500">{item.categoria}</p>
              <p className="mt-1 text-sm font-medium text-neutral-700">
                ${Number(item.precio).toFixed(2)} c/u
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="sr-only">Cantidad</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, e.target.valueAsNumber)
                  }
                  className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-neutral-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </label>
              <p className="min-w-[5rem] text-right font-semibold text-neutral-900">
                ${(Number(item.precio) * item.quantity).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-600">
            Artículos:{' '}
            <span className="font-semibold text-neutral-900">{totalItems}</span>
          </p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
        <Link
          to="/productos"
          className="inline-flex justify-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 font-medium text-neutral-800 no-underline transition-colors duration-150 hover:bg-neutral-100"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
