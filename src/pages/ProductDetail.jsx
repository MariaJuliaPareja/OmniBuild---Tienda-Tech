import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productos from '../data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = productos.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos" style={{ color: '#007bff', textDecoration: 'none' }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '30px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </div>

          <div>
            <p
              style={{
                color: '#007bff',
                fontWeight: 'bold',
                marginBottom: '10px',
                fontSize: '15px'
              }}
            >
              {product.categoria}
            </p>

            <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
              {product.nombre}
            </h1>

            <p
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111',
                marginBottom: '20px'
              }}
            >
              ${product.precio.toFixed(2)}
            </p>

            <p
              style={{
                color: '#555',
                lineHeight: '1.8',
                fontSize: '17px',
                marginBottom: '30px'
              }}
            >
              {product.descripcion}
            </p>

            <button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              Agregar al carrito
            </button>

            <div>
              <Link
                to="/productos"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
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