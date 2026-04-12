"use client";

import { generateCoverLetter, generateInterviewAnswers, improveResumeBullets } from "@/actions/ai";
import { useState } from "react";
import { Job } from "@prisma/client";

interface Props {
  job: Job;
  userName: string;
}

type ActiveTool = "cover-letter" | "resume" | "interview" | null;

export default function AITools({ job, userName }: Props) {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setResult("");

    try {
      let output: string | null = "";

      if (activeTool === "cover-letter") {
        output = await generateCoverLetter(job.position, job.company, input, userName);
      } else if (activeTool === "resume") {
        output = await improveResumeBullets(input);
      } else if (activeTool === "interview") {
        output = await generateInterviewAnswers(job.position, job.company);
      }

      setResult(output ?? "");
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const tools = [
    { id: "cover-letter", label: "Cover Letter" },
    { id: "resume", label: "Resume bullets" },
    { id: "interview", label: "Interview prep" }
  ] as const;

  return (
    <div className="bg-navy-surface border border-navy-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">AI Tools</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id);
              setResult("");
              setInput("");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTool === tool.id
                ? "bg-amber-accent text-navy-base"
                : "bg-navy-elevated border border-navy-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>
      {activeTool === "cover-letter" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-1">Paste the job description</label>
          <textarea
            className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors placeholder:text-text-muted resize-none"
            rows={5}
            value={input}
            placeholder="Paste the full job description here..."
            onChange={e => setInput(e.target.value)}
          />
        </div>
      )}
      {activeTool === "resume" && (
        <div className="mb-4">
          <label className="block -text-sm font-medium text-text-secondary mb-1">Paste your resume bullet points</label>
          <textarea
            className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors placeholder:text-text-muted resize-none"
            rows={5}
            value={input}
            placeholder="• Built a REST API with Node.js&#10;• Managed a team of 3 developers&#10;• Reduced load time by 20%"
            onChange={e => setInput(e.target.value)}
          />
        </div>
      )}
      {activeTool === "interview" && (
        <p className="text-text-secondary text-sm mb-4">
          Generate common interview questions and STAR method answer frameworks for the{" "}
          <span className="text-text-primary font-medium">{job.position}</span> role at{" "}
          <span className="text-text-primary font-medium">{job.company}</span>
        </p>
      )}
      {activeTool && (
        <button
          className="bg-amber-accent hover:bg-amber-hover text-navy-base px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 mb-4"
          disabled={loading || (activeTool !== "interview" && !input.trim())}
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      )}
      {result && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Result</p>
            <button
              className="text-xs text-amber-accent hover:underline"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy to clipboard
            </button>
          </div>
          <div className="bg-navy-elevated border border-navy-border rounded-lg p-4 text-sm text-text-primary whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
