import { useEffect, useState } from "react";

// Define el tipo para el usuario
interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Asegúrate de que el nombre de la propiedad coincida con lo que devuelve el backend
}

export default function AdminView() {
  const [user, setUser] = useState<User | null>(null);

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Si el usuario no es administrador, no mostrar nada
  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <a
      href="/admin"
      className="bg-blue-600 text-white px-4 py-2 mr-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 00-1 1v1H6a1 1 0 00-1 1v1H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-2V4a1 1 0 00-1-1h-3V3a1 1 0 00-1-1zM6 6h8v1H6V6zm8 3H6v1h8V9zm-8 3h8v1H6v-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>Vista de administrador</span>
    </a>
  );
}
