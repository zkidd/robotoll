"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "Overview",
    links: [{ href: "/dashboard", text: "Dashboard" }],
  },
  {
    label: "Registry",
    links: [
      { href: "/dashboard/machines", text: "Machine Registry" },
      { href: "/dashboard/businesses", text: "Business Accounts" },
    ],
  },
  {
    label: "Activity",
    links: [{ href: "/dashboard/tasks", text: "Task Log" }],
  },
  {
    label: "Taxation",
    links: [
      { href: "/dashboard/jurisdictions", text: "Jurisdictions" },
      { href: "/dashboard/rates", text: "Tax Rate Config" },
      { href: "/dashboard/categories", text: "Task Categories" },
    ],
  },
  {
    label: "Billing",
    links: [
      { href: "/dashboard/billing", text: "Billing & Invoices" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-[52px] bg-dark-bg text-white flex items-center justify-between px-5 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-lg font-bold">RoboToll</Link>
          <span className="text-xs text-muted">Robotic Task Taxation Platform</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted text-[13px] hover:text-white transition-colors">
            &larr; Home
          </Link>
          <span className="text-[10px] font-bold uppercase bg-warning text-white px-2 py-0.5 rounded">
            Demo
          </span>
          <span className="text-[13px] text-[#d1d5db]">Admin User</span>
        </div>
      </header>

      <div className="flex pt-[52px] min-h-screen">
        {/* Sidebar */}
        <nav className="w-[220px] min-w-[220px] bg-surface border-r border-border fixed top-[52px] bottom-0 overflow-y-auto py-4">
          {navSections.map((section) => (
            <div key={section.label} className="mb-2">
              <div className="text-[10px] font-bold uppercase text-muted tracking-wider px-5 py-1">
                {section.label}
              </div>
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-[13px] px-5 py-1.5 border-l-3 transition-all ${
                      isActive
                        ? "text-primary font-semibold bg-primary-light border-primary"
                        : "text-foreground hover:bg-surface-warm border-transparent hover:border-primary"
                    }`}
                  >
                    {link.text}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 ml-[220px] p-6 max-w-[1200px]">
          {children}
        </main>
      </div>
    </>
  );
}
