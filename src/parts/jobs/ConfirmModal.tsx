"use client";

import { createPortal } from "react-dom";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  const modal = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-navy-surface border border-navy-border rounded-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-base font-semibold text-text-primary mb-2">Are you sure?</h2>
        <p className="text-text-secondary text-sm mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary border border-navy-border rounded-lg hover:bg-navy-elevated transition-colors"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
