"use client";

import {
  Pencil,
  ImageIcon,
  Settings,
  Bell,
  Shield,
  SlidersHorizontal,
  ChevronRight,
  Pause,
  Trash2,
} from "lucide-react";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { OwnProfileCard } from "@/components/ritual/profile-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/data/ritual";

const settingsItems = [
  { icon: Settings, label: "App Settings" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Privacy & Security" },
  { icon: SlidersHorizontal, label: "Preferences" },
];

export default function ProfilePage() {
  return (
    <RitualShell current="profile">
      <div className="p-4 space-y-5">
        {/* Heading */}
        <h1 className="font-heading text-2xl font-bold">Profile</h1>

        {/* Profile card */}
        <OwnProfileCard user={currentUser} />

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ImageIcon className="h-4 w-4" />
            Photos
          </Button>
        </div>

        {/* Upgrade card */}
        <div className="rounded-xl bg-gradient-to-br from-pink-600 to-amber-500 p-5 text-white space-y-2">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            Ritual Member
          </span>
          <h2 className="text-lg font-heading font-bold">Unlock Full Access</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            See who&apos;s interested in you, get unlimited matches, and unlock
            all photos on Day 1.
          </p>
          <Button size="sm" className="bg-white text-pink-600 hover:bg-white/90 mt-1">
            Upgrade Now
          </Button>
        </div>

        {/* Settings */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2">
            Settings
          </p>
          <div className="rounded-xl bg-card border border-border overflow-hidden divide-y divide-border">
            {settingsItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-left">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Account actions */}
        <div className="space-y-2 pb-4">
          <Button variant="outline" size="sm" className="w-full gap-1.5 text-muted-foreground">
            <Pause className="h-4 w-4" />
            Pause Account
          </Button>
          <Button variant="outline" size="sm" className="w-full gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </RitualShell>
  );
}
