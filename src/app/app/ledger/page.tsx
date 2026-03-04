import { FolderOpen, FileText, CheckSquare, Users } from "lucide-react";
import { StatCard } from "@/components/ledger/stat-card";
import { ProjectCard } from "@/components/ledger/project-card";
import { ActivityFeed } from "@/components/ledger/activity-feed";
import { users, getUserById, projects, documents, tasks, auditLog } from "@/data/ledger";

export default function LedgerDashboard() {
  const openTaskCount = tasks.filter((t) => t.status !== "done").length;
  const currentUser = users[0]; // Sarah Chen

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold font-heading tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, {currentUser.name.split(" ")[0]}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={projects.filter((p) => p.status === "active").length}
          description="+1 this quarter"
          icon={FolderOpen}
        />
        <StatCard
          title="Documents"
          value={documents.length}
          description={`Across ${projects.length} projects`}
          icon={FileText}
        />
        <StatCard
          title="Open Tasks"
          value={openTaskCount}
          description={`${tasks.filter((t) => t.status === "in-progress").length} in progress`}
          icon={CheckSquare}
        />
        <StatCard
          title="Team Members"
          value={users.length}
          description={`${users.filter((u) => u.status === "online").length} online`}
          icon={Users}
        />
      </div>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-heading">Projects</h2>
          <span className="text-sm text-muted-foreground">
            {projects.length} total
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => {
            const members = project.memberIds
              .map((id) => getUserById(id))
              .filter(Boolean) as typeof users;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                members={members}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold font-heading mb-4">
          Recent Activity
        </h2>
        <ActivityFeed entries={auditLog} users={users} maxEntries={8} />
      </section>
    </div>
  );
}
