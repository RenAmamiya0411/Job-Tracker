"use client";

import { deleteJob, updateJob } from "@/actions/jobs";
import { useState } from "react";
import AddJobModal from "./AddJobModal";
import { Job } from "@prisma/client";
import ConfirmModal from "./ConfirmModal";
import EditJobModal from "./EditJobModal";
import { toast } from "sonner";
import Link from "next/link";

const statusColors: Record<string, string> = {
  SAVED: "bg-blue-950 text-blue-400",
  APPLIED: "bg-navy-elevated text-text-secondary",
  INTERVIEW: "bg-green-950 text-green-400",
  OFFER: "bg-amber-950 text-amber-accent",
  REJECTED: "bg-red-950 text-red-400"
};

const statusOptions = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];
const filteredOptions = ["ALL", ...statusOptions];

interface Props {
  jobs: Job[];
}

export default function JobsClient({ jobs }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? jobs : jobs.filter(j => j.status === filter);

  async function handleDelete() {
    if (!confirmId) return;
    await deleteJob(confirmId);
    toast.success("Job deleted successfully");
    setConfirmId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Jobs</h1>
          <p className="text-text-secondary text-sm mt-1">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          className="bg-amber-accent hover:bg-amber-hover text-navy-base px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          onClick={() => setShowModal(true)}
        >
          + Add Job
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filteredOptions.map(f => (
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? "bg-amber-accent text-navy-base"
                : "bg-navy-elevated border border-navy-border text-text-secondary hover:text-text-primary"
            }`}
            key={f}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm">
            {filter === "ALL" ? "No applications yet." : `No ${filter.toLowerCase()} applications`}
          </p>
          {filter === "ALL" && (
            <button className="mt-4 text-amber-accent hover:underline text-sm" onClick={() => setShowModal(true)}>
              Add your first job
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(job => (
            <div
              className="bg-navy-surface border border-navy-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              key={job.id}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <Link href={`/jobs/${job.id}`}>
                    <h3 className="font-medium text-text-primary truncate">{job.position}</h3>
                  </Link>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[job.status]}`}>
                    {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{job.company}</p>
                <div className="flex gap-4 mt-2 text-xs text-text-muted">
                  {job.location && <span>{job.location}</span>}
                  {job.salary && <span>{job.salary}</span>}
                  <span>{new Date(job.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:shrink-0">
                <select
                  className="bg-navy-elevated border border-navy-border rounded-lg px-2 py-1 text-xs text-text-secondary outline-none focus:border-amber-accent transition-colors flex-1 sm:flex-none"
                  defaultValue={job.status}
                  onChange={async e => {
                    await updateJob(job.id, e.target.value);
                    toast.success("Status updated");
                  }}
                >
                  {statusOptions.map(s => (
                    <option key={s} value={s}>
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                <button
                  className="text-text-muted hover:text-text-primary transition-colors text-xs px-2"
                  onClick={() => setEditJob(job)}
                >
                  Edit
                </button>
                <button
                  className="text-text-muted hover:text-red-400 transition-colors text-sm px-2"
                  onClick={() => setConfirmId(job.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && <AddJobModal onClose={() => setShowModal(false)} />}
      {editJob && <EditJobModal job={editJob} onClose={() => setEditJob(null)} />}
      {confirmId && (
        <ConfirmModal
          message="This will permanently delete this job application."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}
