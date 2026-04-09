import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import JobsClient from "@/parts/jobs/JobsClient";

export default async function JobsPage() {
  const session = await getServerSession(authOptions);

  const jobs = await prisma.job.findMany({
    where: { userId: session!.user.id },
    orderBy: { appliedAt: "desc" }
  });

  return <JobsClient jobs={jobs} />;
}
