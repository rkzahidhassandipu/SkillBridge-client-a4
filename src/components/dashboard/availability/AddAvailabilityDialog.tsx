"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { updateAvailabilityAction } from "@/actions/availability.actions";
import { toast } from "sonner";
import { Props } from "@/types";

export default function AddAvailabilityDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");   
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(day, startTime, endTime)
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const resetForm = () => {
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  const handleSave = async () => {
    if (!day || !startTime || !endTime) {
      toast.error("All fields are required");
      return;
    }
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    try {
      const res = await updateAvailabilityAction([
        { day, startTime, endTime },
      ]);

      console.log(res)
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Availability added");
      onSuccess({ day, startTime, endTime });
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add Slot
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle>New Availability</DialogTitle>
          <DialogDescription>
            Select your working hours for the week.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Day Dropdown */}
          <div className="space-y-2">
            <Label>Day</Label>
            <Select value={day} onValueChange={(val) => setDay(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Pick a day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Range */}
          <div className="flex items-end gap-2">
            <div className="space-y-2 flex-1">
              <Label>
                <Clock className="inline mr-1 h-3 w-3" />
                Start
              </Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <ArrowRight className="mb-2 h-4 w-4 text-muted-foreground" />

            <div className="space-y-2 flex-1">
              <Label>
                <Clock className="inline mr-1 h-3 w-3" />
                End
              </Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save Slot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
