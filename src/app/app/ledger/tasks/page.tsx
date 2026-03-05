import { tasks, getUserById } from "@/data/ledger";
import type { TaskStatus } from "@/data/ledger/types";
import { TaskCard } from "@/components/ledger/task-card";

const columns: {
  status: TaskStatus;
  label: string;
  headerClass: string;
}[] = [
  {
    status: "backlog",
    label: "Backlog",
    headerClass: "bg-neutral-100/60 text-neutral-700",
  },
  {
    status: "in-progress",
    label: "In Progress",
    headerClass: "bg-blue-100/60 text-blue-700",
  },
  {
    status: "in-review",
    label: "In Review",
    headerClass: "bg-amber-100/60 text-amber-700",
  },
  {
    status: "done",
    label: "Done",
    headerClass: "bg-emerald-100/60 text-emerald-700",
  },
];

const tasksByStatus = columns.reduce(
  (acc, col) => {
    acc[col.status] = tasks.filter((t) => t.status === col.status);
    return acc;
  },
  {} as Record<TaskStatus, typeof tasks>
);

export default function TaskBoardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-heading font-semibold tracking-tight">Task Board</h1>
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto -mx-6 px-6 lg:-mx-8 lg:px-8">
        <div className="grid grid-cols-4 gap-4 min-w-[1120px]">
          {columns.map((col) => {
            const colTasks = tasksByStatus[col.status];
            return (
              <div key={col.status} className="flex flex-col">
                {/* Column header */}
                <div
                  className={`rounded-lg px-3 py-2 mb-3 text-sm font-medium ${col.headerClass}`}
                >
                  {col.label}{" "}
                  <span className="opacity-60">({colTasks.length})</span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      assignee={getUserById(task.assigneeId)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
