import { useState } from 'react';
import { Link } from 'react-router-dom';
import productos from '../data/products.json';

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

  const productosFiltrados =
    categoriaActiva === 'Todos'
      ? productos
      : productos.filter((prod) => prod.categoria === categoriaActiva);

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Catálogo de Productos
      </h1>

      <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>
        Selecciona una categoría para explorar los productos disponibles.
      </p>

      {/* BOTONES */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '30px',
          maxWidth: '900px',
          margin: '0 auto 30px auto'
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: categoriaActiva === cat ? '#007bff' : '#e0e0e0',
              color: categoriaActiva === cat ? 'white' : 'black',
              fontWeight: 'bold',
              transition: '0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {productosFiltrados.map((prod) => (
          <Link
            to={`/producto/${prod.id}`}
            key={prod.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '15px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                textAlign: 'center',
                minHeight: '340px',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* IMAGEN */}
              <img
                src={prod.imagen}
                alt={prod.nombre}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              />

              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                {prod.nombre}
              </h3>

              <p style={{ color: '#666', marginBottom: '10px' }}>
                {prod.categoria}
              </p>

              <p
                style={{
                  color: '#007bff',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                ${prod.precio.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}