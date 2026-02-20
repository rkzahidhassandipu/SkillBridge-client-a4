"use client";

import React, { useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  Edit2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProfileImageUpload from "./ProfileImageUpload";
import { updateProfile } from "@/actions/profile.actions";
import { ProfileData } from "@/types";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  profile: ProfileData;
}

interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
}


const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.user.name || "",
    phone: profile.user.phone || "",
    image: profile.user.image || "",
  });

  const getInitials = (name?: string) =>
    !name
      ? "U"
      : name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare payload with only fields that have values
      const updatePayload: UpdateUserProfilePayload = {};
      if (formData.name) updatePayload.name = formData.name;
      if (formData.phone) updatePayload.phone = formData.phone;
      if (formData.image) updatePayload.image = formData.image;

      const res = await updateProfile(updatePayload);

      if (res.success) {
        toast.success("Profile updated successfully!");
        setEditing(false);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.user.name || "",
      phone: profile.user.phone || "",
      image: profile.user.image || "",
    });
    setEditing(false);
  };

  const handleImageUpload = async (url: string) => {
    const payload: UpdateUserProfilePayload = {
      image: url,
      phone: formData.phone || undefined,
      name: formData.name || undefined,
    };
    setFormData({ ...formData, image: url });

    try {
      const res = await updateProfile(payload);
      if (res.success) {
        toast.success("Profile image updated!");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update image");
      }
    } catch {
      toast.error("Failed to update image");
    }
  };

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  return (
    <Card className="max-w-3xl mx-auto shadow-sm border-slate-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-4">
          <ProfileImageUpload
            imageUrl={formData.image}
            onUpload={handleImageUpload}
             userId={profile.user.id} 
            initials={getInitials(profile.user.name)}
          />
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-950">
              {profile.user.name || "Unknown User"}
            </CardTitle>
            <CardDescription className="text-base text-slate-500 mt-1">
              Manage your personal information
            </CardDescription>
            <div className="flex items-center mt-3 gap-2">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                {profile.user.role}
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium text-green-700 border-green-200 bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                {profile.user.status}
              </Badge>
            </div>
          </div>
        </div>

        {!editing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(true)}
            className="gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-2">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <Label>Email</Label>
              <Input
                value={profile.user.email}
                className="bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200"
                readOnly
              />
            </div>

            <Separator className="my-2 mb-6" />
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            {/* Contact */}
            <div className=" rounded-xl">
              <div className="flex items-center gap-3 mb-6 px-5">
                <div className=" rounded-full bg-primary/10 text-primary">
                  <UserCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Contact Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <div className="p-3 rounded-full bg-slate-100">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 font-medium uppercase">
                      Email
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {profile.user.email}
                    </p>
                  </div>
                  {(profile.user as any).emailVerified && (
                    <Badge variant="outline">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <div className="p-3 rounded-full bg-slate-100">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">
                      Phone
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {profile.user.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Account Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="p-3 rounded-full bg-slate-100">
                    <Shield className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">
                      User ID
                    </p>
                    <p className="font-mono text-sm font-medium truncate text-slate-800">
                      {profile.user.id}
                    </p>
                  </div>
                </div>
                {profile.user.createdAt && (
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="p-3 rounded-full bg-slate-100">
                      <Calendar className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Member Since
                      </p>
                      <p className="text-base font-semibold text-slate-900">
                        {formatDate(profile.user.createdAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileView;
