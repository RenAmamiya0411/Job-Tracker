import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardSkeleton from "@/parts/DashboardSkeleton";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

async function DashboardContent() {
  const session = await getServerSession(authOptions);

  const [total, applied, interview, offer, rejected, saved] = await Promise.all([
    prisma.job.count({ where: { userId: session!.user.id } }),
    prisma.job.count({ where: { userId: session!.user.id, status: "APPLIED" } }),
    prisma.job.count({ where: { userId: session!.user.id, status: "INTERVIEW" } }),
    prisma.job.count({ where: { userId: session!.user.id, status: "OFFER" } }),
    prisma.job.count({ where: { userId: session!.user.id, status: "REJECTED" } }),
    prisma.job.count({ where: { userId: session!.user.id, status: "SAVED" } })
  ]);

  const stats = [
    { label: "Total Applications", value: total },
    { label: "Applied", value: applied },
    { label: "Interviews", value: interview },
    { label: "Offers", value: offer },
    { label: "Rejected", value: rejected },
    { label: "Saved", value: saved }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Welcome back, {session!.user.name}</h1>
        <p className="text-text-secondary mt-1 text-sm">Here's a summary of your job search</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div className="bg-navy-surface border border-navy-border rounded-xl p-5" key={stat.label}>
            <p className="text-text-secondary text-sm">{stat.label}</p>
            <p className="text-3xl font-semibold text-text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
