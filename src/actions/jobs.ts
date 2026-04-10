"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const url = formData.get("url") as string;
  const notes = formData.get("notes") as string;

  await prisma.job.create({
    data: {
      company,
      position,
      status: status as any,
      location: location || null,
      salary: salary || null,
      url: url || null,
      notes: notes || null,
      userId: session.user.id
    }
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}

export async function deleteJob(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.job.delete({
    where: { id, userId: session.user.id }
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}

export async function updateJob(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.job.update({
    where: { id, userId: session.user.id },
    data: { status: status as any }
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}

export async function updateJobDetails(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const url = formData.get("url") as string;
  const notes = formData.get("notes") as string;

  await prisma.job.update({
    where: { id, userId: session.user.id },
    data: {
      company,
      position,
      status: status as any,
      location: location || null,
      salary: salary || null,
      url: url || null,
      notes: notes || null
    }
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}
