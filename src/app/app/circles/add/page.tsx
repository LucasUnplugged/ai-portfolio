"use client";

import { CirclesShell } from "@/components/circles/circles-shell";
import { PersonForm } from "@/components/circles/person-form";

export default function AddPersonPage() {
  return (
    <CirclesShell current="add">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Add Person</h1>
        <PersonForm />
      </div>
    </CirclesShell>
  );
}
