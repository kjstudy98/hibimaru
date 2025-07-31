import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ItemCard from "@/components/ItemCard";

interface Item {
  id: string;
  name: string;
  isActive: boolean;
}

interface ItemsCardProps {
  items: Item[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ items, onToggle, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>アイテム一覧 ({items.length}件)</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            アイテムがありません
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemsCard;
