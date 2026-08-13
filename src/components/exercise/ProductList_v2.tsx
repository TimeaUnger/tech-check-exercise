import { useState } from "react";

const productsData = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    available: true,
  },
  {
    id: 2,
    name: "Keyboard",
    category: "Electronics",
    available: true,
  },
  {
    id: 3,
    name: "Office Chair",
    category: "Furniture",
    available: false,
  },
  {
    id: 4,
    name: "Desk",
    category: "Furniture",
    available: true,
  },
];

// single product
interface Product {
  id: number;
  name: string;
  category: string;
  available: boolean;
}

// array product
interface ProductsList {
  products: Product[];
}

// child component
interface ProductCard {
  product: Product;
  handleAvailable: (id: number) => void;
}

export const ProductList = ({ products }: ProductsList) => {
  const [productsList, setProductsList] = useState<Product[]>(products);

  const handleAvailable = (id: number) => {
    setProductsList((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, available: false } : product,
      ),
    );
  };

  return (
    <>
      {productsList.map((product) => (
        <ProductCard product={product} handleAvailable={handleAvailable} />
      ))}
    </>
  );
};

export const ProductCard = ({ product, handleAvailable }: ProductCard) => {
  return (
    <div key={product.id}>
      <div>{product.name}</div>
      <div>{product.category}</div>
      <div>{product.available ? "Available" : "Not available"}</div>
      <button onClick={() => handleAvailable(product.id)}>
        Handle available
      </button>
    </div>
  );
};
