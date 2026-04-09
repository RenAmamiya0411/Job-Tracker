import { authOptions } from "@/lib/auth";
import ThemeToggle from "@/parts/ThemeToggle";
import { getServerSession } from "next-auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your preferences</p>
      </div>

      <div className="max-w-md space-y-6">
        <div className="bg-navy-surface border border-navy-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text-primary mb-1">Account</h2>
          <p className="text-text-secondary text-sm">{session!.user.name}</p>
          <p className="text-text-muted text-xs mt-0.5">{session!.user.email}</p>
        </div>

        <div className="bg-navy-surface border border-navy-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text-primary mb-3">Appearance</h2>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
