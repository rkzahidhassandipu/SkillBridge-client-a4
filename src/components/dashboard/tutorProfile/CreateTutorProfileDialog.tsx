"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Props {
  createProfile: (payload: {
    bio: string;
    pricePerHour: number;
    categoryIds: string[];
  }) => Promise<any>;
  onCreated?: (newProfile: any) => void;
  subjectData?: Category[];
}


export default function CreateTutorProfileDialog({
  createProfile,
  onCreated,
  subjectData = [],
}: Props) {
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleCategory = (id: string) => {
    console.log("filter id", id);
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createProfile({
        bio,
        pricePerHour: price,
        categoryIds: selectedCategories,
      });

      setLoading(false);

     if (res.success) {
  toast.success("Tutor profile created successfully!");
  setOpen(false);

  onCreated?.(res.data); // ✅ pass the created profile

  setBio("");
  setPrice(0);
  setSelectedCategories([]);
}
 else {
        alert("Error: " + (res.message || "Unknown error"));
      }
    } catch (err: any) {
      setLoading(false);
      alert("Error: " + (err.message || "Unknown error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md">
          Create Tutor Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle>Create Your Tutor Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="w-full border p-2 rounded-md"
            required
            rows={3}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price per hour"
            className="w-full border p-2 rounded-md"
            required
          />

          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded-md">
            {subjectData.map((cat) => {
              const catId = String(cat.id);
              const isSelected = selectedCategories.includes(catId);

              return (
                <div
                  key={cat.id}
                  className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-blue-50 ${
                    isSelected
                      ? "bg-blue-100 border-blue-400"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleCategory(catId)}
                >
                  <Plus
                    className={`w-4 h-4 ${isSelected ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
