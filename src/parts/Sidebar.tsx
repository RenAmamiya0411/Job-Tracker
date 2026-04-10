"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/jobs", label: "Jobs" },
  { href: "/settings", label: "Settings" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden md:flex w-56 min-h-screen bg-navy-surface border-r border-navy-border flex-col shrink-0">
        <div className="p-6 border-b border-navy-border">
          <h1 className="text-lg font-semibold text-text-primary">Job Tracker</h1>
          <p className="text-xs mt-0.5 text-text-muted">Application manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => (
            <Link
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "bg-navy-elevated text-amber-accent border border-navy-border" : "text-text-secondary hover:bg-navy-elevated hover:text-text-primary"}`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-border">
          <button
            className="w-full px-3 py-2 text-sm font-medium text-text-secondary  hover:bg-navy-elevated hover:text-text-primary rounded-lg transition-colors text-left"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-surface border-t border-navy-border z-40 flex">
        {links.map(link => (
          <Link
            className={`flex-1 py-3 text-xs font-medium text-center transition-colors ${
              pathname === link.href ? "text-amber-accent" : "text-text-secondary hover:text-text-primary"
            }`}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="flex-1 py-3 text-xs font-medium text-center text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </button>
      </nav>
    </>
  );
}
