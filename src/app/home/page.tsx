"use client";

import React, { useState } from "react";
import AddItemCard from "@/components/AddItemCard";
import ItemsCard from "@/components/ItemsCard";

interface Item {
  id: string;
  name: string;
  isActive: boolean;
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "しょうゆ", isActive: true },
    { id: "2", name: "サラダ油", isActive: false },
  ]);

  const handleAddItem = (itemName: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: itemName,
      isActive: true,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">ホーム</h1>
      </div>

      <AddItemCard onAddItem={handleAddItem} />

      <ItemsCard
        items={items}
        onToggle={handleToggleItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
};

export default Home;
