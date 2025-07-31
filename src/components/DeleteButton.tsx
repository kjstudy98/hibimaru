import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onDelete}
      className="text-red-600 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DeleteButton;
