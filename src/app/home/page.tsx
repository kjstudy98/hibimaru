"use client";

import React from "react";
import AddItemCard from "@/components/AddItemCard";
import ItemsCard from "@/components/ItemsCard";
import { useItems } from "@/hooks/useItems";

const Home = () => {
  const { items, loading, error, addItem, deleteItem, toggleItem } = useItems();

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">ホーム</h1>
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">ホーム</h1>
          <p className="text-red-600">エラー: {error}</p>
          <p className="text-sm text-gray-600 mt-2">
            データベース接続を確認してください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">ホーム</h1>
      </div>

      <AddItemCard onAddItem={addItem} />

      <ItemsCard items={items} onToggle={toggleItem} onDelete={deleteItem} />
    </div>
  );
};

export default Home;
