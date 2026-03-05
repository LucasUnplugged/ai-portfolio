import { ProjectCard } from "@/components/ledger/project-card";
import { projects, getUserById } from "@/data/ledger";
import type { User } from "@/data/ledger/types";

export default function ProjectsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-heading font-semibold tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {projects.length} projects
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const members = project.memberIds
            .map((id) => getUserById(id))
            .filter(Boolean) as User[];
          return (
            <ProjectCard
              key={project.id}
              project={project}
              members={members}
            />
          );
        })}
      </div>
    </div>
  );
}
