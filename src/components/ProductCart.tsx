import type { Product } from "../producs";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
      <div className="p-6">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
        <p className="text-gray-600 text-sm mb-2">Modelo: {product.model}</p>
        <p className="text-gray-600 text-sm mb-2">Calificación: {product.rating}</p>
        <p className="text-gray-600 text-sm mb-4">Precio: ${product.price}</p>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          Comprar
        </button>
      </div>
    </div>
  );
}
