"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types/user";
import EditUserModal from "./EditUserModal";

interface UserRowActionsProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
}

export default function UserRowActions({
  user,
  onUpdateUser,
}: UserRowActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* FIXED: Always render the modal, control visibility with 'open' prop */}
      <EditUserModal
        user={user}
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        onUpdate={onUpdateUser}
      />
    </>
  );
}