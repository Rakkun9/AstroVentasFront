
export interface Product {
    id?: number; // Opcional, dependiendo de si el backend devuelve un ID
    name: string;
    model: string;
    rating: string;
    price: number;
    image: string;
    description: string;
  }