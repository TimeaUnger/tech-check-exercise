const products = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Phone",
  },
  {
    id: 3,
    name: "Keyboard",
  },
  {
    id: 4,
    name: "Monitor",
  },
  {
    id: 5,
    name: "Mouse",
  },
];

interface Product {
    id: number;
    name: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList = ({products}: ProductListProps) => {

    return (
        products.map((product) => (
            <div key={product.id}>{product.name}</div>
        ))
    )
}

export default ProductList;