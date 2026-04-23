import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Cargando componentes para PC...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Catálogo de Componentes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
          >
            <img 
              src={product.image} 
              alt={product.title}
              className="h-56 w-full object-contain bg-white p-4"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
                {product.title}
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-3">
                ${product.price}
              </p>
              
              <Link 
                to={`/product/${product.id}`}
                className="block mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}