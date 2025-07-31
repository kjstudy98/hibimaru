import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import DeleteButton from "@/components/DeleteButton";

interface Item {
  id: string;
  name: string;
  isActive: boolean;
}

interface ItemCardProps {
  item: Item;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onToggle, onDelete }) => {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Switch
              checked={item.isActive}
              onCheckedChange={() => onToggle(item.id)}
            />
            <span
              className={`text-sm font-medium ${item.isActive ? "text-green-600" : "text-gray-500"}`}
            >
              {item.isActive ? "あり" : "なし"}
            </span>
          </div>

          <span
            className={`text-gray-700 font-medium flex-1 mx-4 ${!item.isActive ? "line-through text-gray-400" : ""}`}
          >
            {item.name}
          </span>

          <DeleteButton onDelete={() => onDelete(item.id)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
