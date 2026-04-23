import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

function getImageUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  return (
    <section className="min-h-screen bg-gray-200 px-6 py-10 text-black">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Seguir comprando
        </Link>

        <h1 className="my-6 text-3xl font-bold">Carrito</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow"
              >
                <img
                  src={getImageUrl(item.imagen)}
                  alt={item.nombre}
                  className="h-16 w-16 rounded bg-gray-100 p-1 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <p className="text-sm text-gray-500">{item.categoria}</p>
                  <p className="text-sm">Precio unit: S/ {item.precio}.00</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded bg-gray-300 px-2"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded bg-gray-300 px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-lg bg-red-100 p-2 transition hover:bg-red-200"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Resumen del pedido</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.nombre} ×{item.quantity}
                </span>
                <span>S/ {item.precio * item.quantity}.00</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span>S/ {totalPrice}.00</span>
            </div>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded border py-2"
            >
              Vaciar carrito
            </button>

            <button
              className="mt-2 w-full rounded bg-blue-500 py-2 text-white"
              title="Próximamente"
            >
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}