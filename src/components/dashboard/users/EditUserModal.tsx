"use client";
import { useState } from "react";
import { User, UserRole, UserStatus } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { updateUserAction } from "@/actions/user.actions";

interface EditUserModalProps {
  user: User;
  open: boolean;                 // add this
  onClose: () => void;
  onUpdate: (updatedUser: Partial<User>) => void;
}

export default function EditUserModal({ user, open, onClose, onUpdate }: EditUserModalProps) {
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateUserAction(user.id, { role, status });
    if (result?.data) {
      onUpdate({ role, status });
      onClose();
    } else {
      console.error(result?.error?.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-medium">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger className="w-full mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="TUTOR">TUTOR</SelectItem>
                <SelectItem value="STUDENT">STUDENT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as UserStatus)}>
              <SelectTrigger className="w-full mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="BANNED">BANNED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

