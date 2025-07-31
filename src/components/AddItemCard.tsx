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
import { Plus } from "lucide-react";

interface AddItemCardProps {
  onAddItem?: (itemName: string) => void;
}

const AddItemCard: React.FC<AddItemCardProps> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");

  const handleAddItem = () => {
    if (itemName.trim()) {
      onAddItem?.(itemName.trim());
      setItemName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          新しいアイテムを追加
        </CardTitle>
        <CardDescription>
          新しいアイテムをリストに追加しましょう
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="アイテム名を入力してください"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          onClick={handleAddItem}
          disabled={!itemName.trim()}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          アイテムを追加
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddItemCard;
