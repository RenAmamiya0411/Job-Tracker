import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ActivityTimeline from "@/parts/jobs/ActivityTimeline";
import AITools from "@/parts/jobs/AITools";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const statusColors: Record<string, string> = {
  SAVED: "bg-blue-950 text-blue-400",
  APPLIED: "bg-navy-elevated text-text-secondary",
  INTERVIEW: "bg-green-950 text-green-400",
  OFFER: "bg-amber-950 text-amber-accent",
  REJECTED: "bg-red-950 text-red-400"
};

export default async function JobDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const [job, activities] = await Promise.all([
    prisma.job.findUnique({
      where: { id: params.id, userId: session!.user.id }
    }),
    prisma.activity.findMany({
      where: { jobId: params.id },
      orderBy: { createdAt: "desc" }
    })
  ]);

  if (!job) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link className="text-text-muted hover:text-text-primary text-sm transition-colors" href="/jobs">
          {" "}
          ← Back to jobs{" "}
        </Link>
      </div>

      <div className="bg-navy-surface border border-navy-border rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">{job.position}</h1>
            <p className="text-text-secondary mt-1">{job.company}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${statusColors[job.status]}`}>
            {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-navy-border">
          {job.location && (
            <div>
              <p className="text-xs text-text-muted mb-1">Location</p>
              <p className="text-xs text-text-primary">{job.location}</p>
            </div>
          )}
          {job.salary && (
            <div>
              <p className="text-xs text-text-muted mb-1">Salary</p>
              <p className="text-xs text-text-primary">{job.salary}</p>
            </div>
          )}
          {job.url && (
            <div>
              <p className="text-xs text-text-muted mb-1">Job URL</p>
              <a
                className="text-sm text-amber-accent hover:underline truncate block"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Posting
              </a>
            </div>
          )}
          <div>
            <p className="text-xs text-text-muted mb-1">Applied</p>
            <p className="text-sm text-text-primary">{new Date(job.appliedAt).toLocaleDateString()}</p>
          </div>
        </div>
        {job.notes && (
          <div className="mt-4 pt-4 border-t border-navy-border">
            <p className="text-xs text-text-muted mb-2">Notes</p>
            <p className="text-sm text-text-primary whitespace-pre-wrap">{job.notes}</p>
          </div>
        )}
      </div>

      <AITools job={job} userName={session!.user.name!} />
      <ActivityTimeline activities={activities} />
    </div>
  );
}
