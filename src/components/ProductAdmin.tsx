import { useState, useEffect } from "react";

// Definir la interfaz para los productos
interface Product {
  id: number;
  name: string;
  model: string;
  price: string;
  image: string;
  description: string;
  category_id: number;
  brand_id: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    model: "",
    price: "",
    image: "",
    description: "",
    category_id: 1,
    brand_id: 1,
  });

  // Obtener los productos desde el backend
  useEffect(() => {
    fetch("http://localhost:3301/app/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  // Manejar la edición de un producto
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Guardar cambios en el producto
  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch(
        `http://localhost:3301/app/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      // Actualizar el estado local con el producto editado
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...editingProduct } : p
        )
      );

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Manejar la eliminación de un producto
  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3301/app/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // Actualizar el estado local eliminando el producto
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Manejar la creación de un nuevo producto
  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:3301/app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      const createdProduct = await response.json();

      // Actualizar la lista de productos
      setProducts((prev) => [...prev, createdProduct]);

      // Cerrar el modal y resetear el formulario
      setIsCreateModalOpen(false);
      setNewProduct({
        name: "",
        model: "",
        price: "",
        image: "",
        description: "",
        category_id: 1,
        brand_id: 1,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Agregar Producto
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Modelo</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.model}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Modelo:
              <input
                type="text"
                value={editingProduct.model}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    model: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Precio:
              <input
                type="text"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de creación */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Modelo:
              <input
                type="text"
                value={newProduct.model}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, model: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Precio:
              <input
                type="text"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Imagen URL:
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Descripción:
              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
