import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const penFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
});

function formatPen(value) {
  return penFormatter.format(Number(value));
}

function EmptyCartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.25}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm12 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <EmptyCartIcon className="h-14 w-14" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
            Tu carrito está vacío
          </h1>
          <p className="mb-8 text-neutral-500">
            Añade componentes desde el catálogo para verlos aquí.
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white no-underline shadow-sm transition-colors duration-150 hover:bg-sky-700"
          >
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/productos"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-sky-700 no-underline transition-colors hover:text-sky-900"
      >
        <span aria-hidden>←</span> Seguir comprando
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-neutral-900 md:text-3xl">
        Carrito
      </h1>

      <div className="grid gap-8 md:grid-cols-[1fr_minmax(280px,360px)] md:items-start">
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <ul className="divide-y divide-neutral-100">
            {cartItems.map((item) => {
              const unit = Number(item.precio);
              const atMin = item.quantity <= 1;

              return (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 p-4 transition-colors duration-150 hover:bg-neutral-50/80"
                >
                  <img
                    src={item.imagen}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded object-cover ring-1 ring-neutral-100"
                  />
                  <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
                    <p className="font-semibold leading-snug text-neutral-900">
                      {item.nombre}
                    </p>
                    <p className="mt-0.5 text-sm text-neutral-500">
                      {item.categoria}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      <span className="text-neutral-500">Precio unit.:</span>{' '}
                      <span className="font-medium tabular-nums text-neutral-800">
                        {formatPen(unit)}
                      </span>
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-3 sm:ml-0">
                    <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-50/80 p-0.5">
                      <button
                        type="button"
                        disabled={atMin}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-md text-lg font-medium text-neutral-700 transition-colors hover:bg-white hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="min-w-[2.25rem] text-center text-sm font-semibold tabular-nums text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-md text-lg font-medium text-neutral-700 transition-colors hover:bg-white hover:shadow-sm"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm md:sticky md:top-4">
          <h2 className="mb-4 text-lg font-bold text-neutral-900">
            Resumen del pedido
          </h2>

          <ul className="space-y-3 text-sm">
            {cartItems.map((item) => {
              const lineTotal = Number(item.precio) * item.quantity;
              return (
                <li
                  key={`summary-${item.id}`}
                  className="flex justify-between gap-3 text-neutral-600"
                >
                  <span className="min-w-0 truncate pr-2">
                    {item.nombre}{' '}
                    <span className="text-neutral-400">
                      ×{item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums font-medium text-neutral-800">
                    {formatPen(lineTotal)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="my-5 border-t border-neutral-200" />

          <div className="mb-6 flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Total
            </span>
            <span className="text-2xl font-bold tabular-nums text-neutral-900 md:text-3xl">
              {formatPen(totalPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Vaciar carrito
            </button>

            <div
              className="group relative w-full"
              title="Próximamente"
            >
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white opacity-50 shadow-sm"
              >
                Proceder al pago
              </button>
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100"
              >
                Próximamente
                <span className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
