"use server";

import { authOptions } from "@/lib/auth";
import { groq } from "@/lib/groq";
import { getServerSession } from "next-auth";

async function generate(prompt: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{role: "user", content: prompt}]
  })
  return completion.choices[0].message.content ?? ""
}

export async function generateCoverLetter(position: string, company: string, jobDescription: string, userName: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return generate(`
    You are a professional career coach who writes compelling cover letters. Write in a professional but personable tone. Keep it to 3-4 paragraphs.

    Write a cover letter for ${userName} applying for the ${position} position at ${company}.

    Job Description: ${jobDescription}

    Make it specific to the role and company.
    `);
}

export async function improveResumeBullets(bullets: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return generate(`You are a professional resume writer. Improve resume bullet points to be more impactful, quantified where possible, and action-oriented. Return the improved bullets in the same format as the input

    Bullet Points:
    ${bullets}`);
}

export async function generateInterviewAnswers(position: string, company: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return generate(`You are an expert interview coach. Generate 5 common interview questions for the role with suggested answer frameworks using the STAR method (Situation, Task, Action, Result).
    Role: ${position}
    Company: ${company}`);
}
