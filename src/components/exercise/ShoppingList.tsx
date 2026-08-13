import { useState } from "react";

const shoppingData = [
  {
    id: 1,
    name: "Milk",
    bought: false,
  },
  {
    id: 2,
    name: "Bread",
    bought: true,
  },
  {
    id: 3,
    name: "Cheese",
    bought: false,
  },
  {
    id: 4,
    name: "Apple",
    bought: true,
  },
];

interface ShoppingItem {
  id: number;
  name: string;
  bought: boolean;
}

interface ShoppingListProps {
  items: ShoppingItem[];
}

interface ShoppingItemCardProps {
  id: number;
  name: string;
  bought: boolean;
  onDelete: (id: number) => void;
}

export const ShoppingList = ({ items }: ShoppingListProps) => {
    
  const [shoppingItemList, setShoppingItemList] = useState<ShoppingItem[]>(items);

  const onDelete = (id: number) => {

    setShoppingItemList((prev) => (
        prev.filter((item) => (
            item.id !== id
        ))
    ))
  };

  return (
    <>
      {shoppingItemList.map((item) => (
        <ShoppingItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          bought={item.bought}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export const ShoppingItemCard = ({
  id,
  name,
  bought,
  onDelete,
}: ShoppingItemCardProps) => {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <>
      <div>{name}</div>
      <div>{bought}</div>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </>
  );
};
