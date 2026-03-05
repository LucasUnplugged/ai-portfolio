"use client";

import { CirclesShell } from "@/components/circles/circles-shell";
import { PersonForm } from "@/components/circles/person-form";
import { CirclesPortfolioMenu } from "@/components/circles/portfolio-menu";

export default function AddPersonPage() {
  return (
    <CirclesShell current="add">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-semibold">Add Contact</h1>
          <CirclesPortfolioMenu />
        </div>
        <PersonForm />
      </div>
    </CirclesShell>
  );
}
