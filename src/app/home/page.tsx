"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";

interface Item {
  id: string;
  name: string;
  isActive: boolean;
  isEditing?: boolean;
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "サンプルアイテム1", isActive: true },
    { id: "2", name: "サンプルアイテム2", isActive: false },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editName, setEditName] = useState("");

  // 新しいアイテムを追加
  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        isActive: true,
      };
      setItems([...items, newItem]);
      setNewItemName("");
      // TODO: データベースに登録する処理をここに追加
    }
  };

  // アイテムの削除
  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    // TODO: データベースから削除する処理をここに追加
  };

  // 編集モードを開始
  const handleStartEdit = (item: Item) => {
    setEditingItem(item);
    setEditName(item.name);
  };

  // 編集を保存
  const handleSaveEdit = () => {
    if (editingItem && editName.trim()) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? { ...item, name: editName.trim() }
            : item,
        ),
      );
      setEditingItem(null);
      setEditName("");
      // TODO: データベースを更新する処理をここに追加
    }
  };

  // 編集をキャンセル
  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditName("");
  };

  // トグル状態を変更
  const handleToggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
    // TODO: データベースを更新する処理をここに追加
  };

  // Enterキーでアイテム追加
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            アイテム管理
          </h1>
          <p className="text-gray-600">アイテムの追加・編集・削除ができます</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* アイテム追加カード */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Plus className="w-5 h-5 text-blue-500" />
                新しいアイテムを追加
              </CardTitle>
              <CardDescription>
                新しいアイテムをリストに追加しましょう
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="アイテム名を入力してください"
                  value={newItemName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewItemName(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  className="h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleAddItem}
                disabled={!newItemName.trim()}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                アイテムを追加
              </Button>
            </CardContent>
          </Card>

          {/* アイテム一覧カード */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">
                アイテム一覧 ({items.length}件)
              </CardTitle>
              <CardDescription>登録されたアイテムの管理</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          {/* トグルスイッチ */}
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={item.isActive}
                              onCheckedChange={() => handleToggleItem(item.id)}
                            />
                            <span
                              className={`text-sm font-medium ${item.isActive ? "text-green-600" : "text-gray-500"}`}
                            >
                              {item.isActive ? "あり" : "なし"}
                            </span>
                          </div>

                          {/* アイテム名 */}
                          <div className="flex-1 mx-4">
                            {editingItem?.id === item.id ? (
                              <Input
                                value={editName}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => setEditName(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                              />
                            ) : (
                              <span
                                className={`text-gray-700 font-medium ${!item.isActive ? "line-through text-gray-400" : ""}`}
                              >
                                {item.name}
                              </span>
                            )}
                          </div>

                          {/* アクションボタン */}
                          <div className="flex items-center space-x-2">
                            {editingItem?.id === item.id ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={handleSaveEdit}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={handleCancelEdit}
                                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleStartEdit(item)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    アイテムがありません
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    左のフォームから新しいアイテムを追加できます
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 背景装飾 */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
