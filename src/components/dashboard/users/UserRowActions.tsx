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
import { User, UserRole, UserStatus } from "@/types/user";
import EditUserModal from "./EditUserModal";

interface UserRowActionsProps {
  user: User;
  onUpdateUser: (
    id: string,
    data: { role?: UserRole; status?: UserStatus }
  ) => void;
}

export default function UserRowActions({
  user,
  onUpdateUser,
}: UserRowActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔥 Convert Partial<User> → (id, data)
  const handleUpdateFromModal = (updated: Partial<User>) => {
    const payload: { role?: UserRole; status?: UserStatus } = {};

    if (updated.role) payload.role = updated.role;
    if (updated.status) payload.status = updated.status;

    onUpdateUser(user.id, payload);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
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
        </DropdownMenuContent>
      </DropdownMenu>

      <EditUserModal
        user={user}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={handleUpdateFromModal}
      />
    </>
  );
}