"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { updateProfile, updateProfileTutor } from "@/actions/profile.actions";

interface EditProfileDialogProps {
  triggerText: string;
  profile: any;
  tutor: any;
  categories: string[];
}

export default function EditProfileDialog({
  triggerText,
  profile,
  tutor,
  categories,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    pricePerHour: 0,
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: profile?.user?.name || "",
        phone: profile?.user?.phone || "",
        bio: tutor?.profile?.bio || "",
        pricePerHour: tutor?.profile?.pricePerHour || 0,
      });
    }
  }, [open, profile, tutor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "pricePerHour" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRes = await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });
      const tutorRes = await updateProfileTutor({
        bio: formData.bio,
        pricePerHour: formData.pricePerHour,
        categories,
      });

      if (userRes.success && tutorRes.success) {
        toast.success("Profile updated!");
        setOpen(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(userRes.success ? tutorRes.message : userRes.message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerHour">Price Per Hour</Label>
              <Input
                id="pricePerHour"
                name="pricePerHour"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerHour}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600">
              {loading ? "Saving..." : <><Save className="w-4 h-4 mr-2"/> Save Changes</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
