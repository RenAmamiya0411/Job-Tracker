"use client";

import { createJob } from "@/actions/jobs";
import { useState } from "react";

const statusOptions = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

interface Props {
  onClose: () => void;
}

export default function AddJobModal({ onClose }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createJob(formData);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-navy-surface border border-navy-border rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Add job</h2>
          <button className="text-text-muted hover:text-text-primary transition-colors" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Company <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="company"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Position <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="position"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
            <select
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="status"
              defaultValue="APPLIED"
            >
              {statusOptions.map(s => (
                <option key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
            <input
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="location"
              type="text"
              placeholder="Remote, Manila, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Salary</label>
            <input
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="salary"
              type="text"
              placeholder="₱50,000 / month"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Job URL</label>
            <input
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors"
              name="url"
              type="url"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Notes</label>
            <textarea
              className="w-full bg-navy-elevated border border-navy-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-amber-accent transition-colors resize-none"
              name="notes"
              rows={3}
              placeholder="Any notes about this application..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary border border-navy-border rounded-lg hover:bg-navy-elevated transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 text-sm font-medium bg-amber-accent hover:bg-amber-hover text-navy-base rounded-lg transition-colors disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
