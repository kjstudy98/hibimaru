import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
  isActive: boolean;
}

interface PrismaItem {
  id: string;
  name: string;
  isExisted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // アイテム一覧を取得
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/items");

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      // Prismaのスキーマに合わせてデータを変換
      const transformedItems: Item[] = data.map((item: PrismaItem) => ({
        id: item.id,
        name: item.name,
        isActive: item.isExisted,
      }));

      setItems(transformedItems);
      setError(null);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // アイテムを追加
  const addItem = async (name: string) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem: PrismaItem = await response.json();
      const transformedItem: Item = {
        id: newItem.id,
        name: newItem.name,
        isActive: newItem.isExisted,
      };

      setItems((prev) => [transformedItem, ...prev]);
    } catch (err) {
      console.error("Error adding item:", err);
      throw err;
    }
  };

  // アイテムを削除
  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      throw err;
    }
  };

  // アイテムのトグル状態を更新
  const toggleItem = async (id: string) => {
    try {
      const item = items.find((item) => item.id === id);
      if (!item) return;

      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isExisted: !item.isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item,
        ),
      );
    } catch (err) {
      console.error("Error updating item:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    deleteItem,
    toggleItem,
    refetch: fetchItems,
  };
};
