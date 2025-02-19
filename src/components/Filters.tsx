import { useState } from "react";
import ProductCard from "./ProductCart";
import type { Product } from "../producs";

export default function Filters({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filtrar productos dinámicamente
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice));

    return matchesSearch && matchesPrice;
  });

  return (
    <>
      {/* Barra de Búsqueda */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="number"
          placeholder="Precio mínimo"
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Lista de productos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
