import { Activity } from "@prisma/client";

interface Props {
  activities: Activity[];
}

const typeColors: Record<string, string> = {
  created: "bg-green-950 text-green-400",
  status: "bg-blue-950 text-blue-400",
  updated: "bg-amber-950 text-amber-accent"
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function ActivityTimeline({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="bg-navy-surface border border-navy-border rounded-xl p-6 mt-6">
        <h2 className="text-sm font-medium text-text-primary mb-2">Activity</h2>
        <p className="text-text-muted text-sm">No activity yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-navy-surface border border-navy-border rounded-xl p-6 mt-6">
      <h2 className="text-sm font-medium text-text-primary mb-4">Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div className="flex gap-3" key={activity.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${typeColors[activity.type] ?? "bg-navy-border"}`}
              />
              {index < activities.length - 1 && <div className="w-px flex-1 bg-navy-border mt-1" />}
            </div>
            <div className="pb-4">
              <p className="text-sm text-text-primary">{activity.message}</p>
              <p className="text-xs text-text-muted mt-0.5">{timeAgo(new Date(activity.createdAt))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
