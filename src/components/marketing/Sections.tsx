export function Problem() {
  const cards = [
    { icon: "🏛", title: "For Governments", text: "Every robotic task that replaces a human one erodes the tax base. Without a structured approach, jurisdictions lose billions in revenue with no way to track what machines are doing." },
    { icon: "🏭", title: "For Businesses", text: "A patchwork of emerging local, state, and federal robotic taxes creates compliance chaos. Companies need a single system to track obligations across every jurisdiction they operate in." },
    { icon: "⚖", title: "For Society", text: "Public services depend on tax revenue. A per-task tax on robotic work ensures automation funds the infrastructure and safety nets that communities rely on." },
  ];
  return (
    <section className="py-22 bg-surface-warm" id="problem">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHeader title="Automation is replacing taxable labor" subtitle="As robotic systems take on tasks once performed by workers, governments lose payroll and income tax revenue. Businesses gain efficiency but face an uncertain regulatory landscape. RoboToll creates a fair, transparent framework that works for everyone." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div key={c.title} className="bg-surface border border-border rounded-md p-7 text-left">
              <div className="text-2xl mb-3.5 grayscale contrast-50">{c.icon}</div>
              <h3 className="text-base font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Distinction() {
  return (
    <section className="py-22" id="why-these">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHeader title="Not all automation is the same" subtitle="RoboToll focuses on machines that perform a complete, one-for-one replacement of a human worker's job — not tools that assist humans. A Da Vinci surgical robot still requires a surgeon at the controls. A self-checkout kiosk replaces the cashier entirely. That distinction is what makes these systems taxable." />
        <div className="flex flex-col md:flex-row items-stretch gap-0 max-w-3xl mx-auto">
          <div className="flex-1 p-6 rounded-md bg-success/[0.08] border border-success/30">
            <div className="text-xs font-bold text-success uppercase tracking-wider mb-2">Taxable — Full Replacement</div>
            <p className="text-sm text-muted leading-relaxed">The machine performs the entire job. No human operator required. The worker&apos;s role is eliminated.</p>
          </div>
          <div className="flex items-center justify-center px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">vs.</div>
          <div className="flex-1 p-6 rounded-md bg-danger/[0.06] border border-danger/25">
            <div className="text-xs font-bold text-danger uppercase tracking-wider mb-2">Not Taxable — Assistive Tool</div>
            <p className="text-sm text-muted leading-relaxed">The machine helps a human do their job better. The worker is still present and essential. Think surgical robots, power tools, or diagnostic AI.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MachineTypes() {
  const machines = [
    {
      icon: "💳", title: "Self-Checkout Kiosks & Stations", replaces: "Cashier", border: "border-t-accent-mid",
      text: "A self-checkout station does everything a human cashier does — scans items, processes payments, bags groceries, handles coupons, and issues receipts. There is no human in the loop.",
      before: "Before: 1 cashier per lane, $15-22/hr", after: "After: 0 cashiers, 4-6 kiosks per attendant",
      examples: ["NCR SelfServ", "Diebold Nixdorf", "Toshiba SCO"],
    },
    {
      icon: "🚗", title: "Driverless Cars & Robot Deliveries", replaces: "Driver / Delivery Worker", border: "border-t-accent-dark",
      text: "An autonomous vehicle replaces the taxi driver, the rideshare driver, the truck driver, or the delivery courier. Every trip or delivery is a complete replacement of a paid driving job.",
      before: "Before: 1 driver per vehicle, $18-35/hr", after: "After: 0 drivers, remote fleet monitoring",
      examples: ["Waymo", "Cruise", "Nuro", "Gatik"],
    },
    {
      icon: "🤖", title: "Humanoid Robots", replaces: "Retail / Warehouse / Service Worker", border: "border-t-accent-dark",
      text: "Humanoid robots are built to operate in human workspaces — stocking shelves, greeting customers, assembling products, preparing food. A drop-in replacement for a human worker.",
      before: "Before: 1 worker per role, $14-25/hr", after: "After: 0 workers, 1 robot per shift",
      examples: ["Figure AI", "Tesla Optimus", "Agility Digit", "1X Neo"],
    },
  ];
  return (
    <section className="py-22 bg-surface-warm" id="machine-types">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHeader title="Three categories of taxable robotic systems" subtitle="Each replaces a human role entirely — the cashier, the driver, the worker." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {machines.map((m) => (
            <div key={m.title} className={`bg-surface border border-border rounded-md p-7 border-t-3 ${m.border}`}>
              <div className="text-[28px] mb-3 grayscale contrast-50">{m.icon}</div>
              <h3 className="text-base font-bold mb-1.5">{m.title}</h3>
              <div className="inline-block text-[11px] font-bold text-danger bg-danger/[0.08] px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2.5">Replaces: {m.replaces}</div>
              <p className="text-[13px] text-muted leading-relaxed mb-3.5">{m.text}</p>
              <div className="bg-surface-warm rounded px-3 py-2.5 mb-3.5">
                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="text-muted flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-danger inline-block" />{m.before}</span>
                  <span className="text-muted flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />{m.after}</span>
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {m.examples.map((e) => (
                  <span key={e} className="text-[11px] font-medium bg-surface-warm text-muted px-2 py-0.5 rounded-sm">{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: 1, title: "Machines Report Tasks", text: "Robotic systems report every task via REST API, MQTT, SDK, or batch upload. Each task includes type, duration, location, and machine ID." },
    { num: 2, title: "Tasks Are Classified", text: "Each task is mapped to a standardized category (Customer Service, Transaction Processing, Autonomous Transport, etc.)." },
    { num: 3, title: "Jurisdictions Apply Rates", text: "Federal, state, and local governments each set their own per-task or per-unit rates. All three layers are calculated automatically." },
    { num: 4, title: "Businesses Are Billed", text: "Businesses receive consolidated invoices with full breakdowns by jurisdiction, machine, and task category." },
  ];
  return (
    <section className="py-22" id="how-it-works">
      <div className="max-w-[1080px] mx-auto px-6">
        <SectionHeader title="How it works" subtitle="Four steps from task to tax revenue." />
        <div className="flex flex-col md:flex-row items-start">
          {steps.map((s, i) => (
            <div key={s.num} className="flex-1 text-center px-4 flex flex-col items-center">
              {i > 0 && <span className="text-xl text-border mb-2 hidden md:block rotate-0">→</span>}
              <div className="w-10 h-10 bg-foreground text-background text-base font-bold rounded-full flex items-center justify-center mb-3.5">{s.num}</div>
              <h3 className="text-[15px] font-bold mb-1.5">{s.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TaxLayers() {
  const examples = [
    {
      label: "Driverless Vehicle — 4.2 mile trip",
      rows: [
        { level: "Federal", jurisdiction: "", detail: "$0.02/mi × 4.2 mi", amount: "$0.084", dot: "bg-federal" },
        { level: "State (Arizona)", jurisdiction: "", detail: "$0.05/mi × 4.2 mi", amount: "$0.210", dot: "bg-state" },
        { level: "Local (Phoenix)", jurisdiction: "", detail: "$0.037/mi × 4.2 mi", amount: "$0.155", dot: "bg-local" },
      ],
      total: "$0.449",
    },
    {
      label: "Self-Checkout — Transaction Processing",
      rows: [
        { level: "Federal", jurisdiction: "", detail: "$0.03/task", amount: "$0.030", dot: "bg-federal" },
        { level: "State (Texas)", jurisdiction: "", detail: "$0.05/task", amount: "$0.050", dot: "bg-state" },
        { level: "Local (Austin)", jurisdiction: "", detail: "$0.00/task", amount: "$0.000", dot: "bg-local" },
      ],
      total: "$0.080",
    },
  ];
  return (
    <section className="py-22 bg-dark-bg text-[#e8e0d8]" id="tax-layers">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-13">
          <h2 className="text-3xl font-bold tracking-tight mb-3.5">Three layers of taxation, one platform</h2>
          <p className="text-[15px] text-muted leading-relaxed">Every robotic task can be taxed at the federal, state, and local level. RoboToll calculates all three automatically.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {examples.map((ex) => (
            <div key={ex.label} className="bg-dark-surface border border-dark-border rounded-md overflow-hidden">
              <div className="px-4.5 py-3.5 border-b border-dark-border">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">{ex.label}</span>
              </div>
              <div className="py-1">
                {ex.rows.map((r) => (
                  <div key={r.level} className="flex items-center justify-between px-4.5 py-2.5 text-[13px]">
                    <div className="flex items-center gap-2 text-accent-light min-w-[150px]">
                      <span className={`w-2 h-2 rounded-full ${r.dot}`} />
                      {r.level}
                    </div>
                    <div className="text-muted text-xs flex-1 text-center">{r.detail}</div>
                    <div className="font-semibold text-accent-light min-w-[56px] text-right tabular-nums">{r.amount}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4.5 py-2.5 text-[13px] border-t border-dark-border bg-white/[0.02]">
                  <div className="font-bold text-[#e8e0d8]">Total Tax</div>
                  <div />
                  <div className="font-bold text-[#e8e0d8] min-w-[56px] text-right">{ex.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ForGovernment() {
  const features = [
    { icon: "⚙", title: "Configure Tax Rates", text: "Set per-task or per-unit rates for each task category. Schedule future rate changes with automatic effective dates." },
    { icon: "📈", title: "Real-Time Revenue Dashboards", text: "Monitor tax collection by business, machine type, and time period. See revenue flow in real time." },
    { icon: "📝", title: "Compliance Monitoring", text: "Track which businesses are current, past due, or non-compliant. Trigger automated collection notices." },
    { icon: "🔗", title: "API Integration", text: "Connect RoboToll to your existing government revenue systems via secure REST APIs." },
    { icon: "📋", title: "Category Management", text: "Propose new task categories or modify existing ones. Define which machine types fall under each activity." },
    { icon: "🔒", title: "Role-Based Access", text: "Viewer, rate manager, and administrator roles ensure the right people have the right control." },
  ];
  return (
    <section className="py-22 bg-surface-warm" id="for-government">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-13">
          <div className="inline-block text-[11px] font-bold text-federal bg-federal/[0.08] uppercase tracking-widest px-3 py-1.5 rounded-sm mb-3.5">For Government Agencies</div>
          <h2 className="text-3xl font-bold tracking-tight mb-3.5">Set rates. Collect revenue. Monitor compliance.</h2>
          <p className="text-[15px] text-muted leading-relaxed">A self-service portal for federal, state, and local agencies to define tax policies for robotic tasks in their jurisdiction.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-surface border border-border rounded-md p-6">
              <div className="text-[22px] mb-2.5 grayscale contrast-50">{f.icon}</div>
              <h3 className="text-[15px] font-bold mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-11">
          <a href="#cta" className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-hover transition-colors">Request Government Access</a>
        </div>
      </div>
    </section>
  );
}

export function ForBusiness() {
  const features = [
    { icon: "💻", title: "Machine Registry", text: "Register every robotic system you own — humanoid, self-checkout, driverless. Track by location, type, and status." },
    { icon: "⚡", title: "Automatic Tax Calculation", text: "Every task your machines perform is automatically assessed at the correct federal, state, and local rates." },
    { icon: "💰", title: "Consolidated Billing", text: "Receive a single invoice covering all jurisdictions, machines, and task types." },
    { icon: "🔍", title: "Full Audit Trail", text: "Every task, every tax calculation, every payment — fully logged and exportable." },
    { icon: "🚀", title: "Simple Integration", text: "REST API, MQTT, Python/Go/Node SDKs, or batch CSV upload. Get reporting in minutes." },
    { icon: "📊", title: "Cost Forecasting", text: "Model the tax impact of expanding your fleet or entering new jurisdictions." },
  ];
  return (
    <section className="py-22" id="for-business">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-13">
          <div className="inline-block text-[11px] font-bold text-success bg-success/[0.08] uppercase tracking-widest px-3 py-1.5 rounded-sm mb-3.5">For Businesses</div>
          <h2 className="text-3xl font-bold tracking-tight mb-3.5">One platform for multi-jurisdiction compliance.</h2>
          <p className="text-[15px] text-muted leading-relaxed">Register your machines, connect your fleet, and let RoboToll handle the tax calculation and reporting.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-surface border border-border rounded-md p-6">
              <div className="text-[22px] mb-2.5 grayscale contrast-50">{f.icon}</div>
              <h3 className="text-[15px] font-bold mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-11">
          <a href="#cta" className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-hover transition-colors">Register Your Business</a>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { number: "1,247", label: "Machines Registered" },
    { number: "14.2M", label: "Tasks Tracked" },
    { number: "23", label: "Active Jurisdictions" },
    { number: "$28.4M", label: "Tax Revenue Collected" },
  ];
  return (
    <section className="py-22 bg-dark-bg">
      <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-[44px] font-bold tracking-tight text-accent-light">{s.number}</div>
            <div className="text-[13px] text-muted mt-1 font-medium uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-22" id="cta">
      <div className="max-w-[520px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3.5">Ready to get started?</h2>
        <p className="text-[15px] text-muted leading-relaxed mb-7">Whether you&apos;re a government agency looking to implement robotic task taxation or a business that needs to stay compliant, RoboToll has you covered.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#for-government" className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-hover transition-colors">Government Agency Access</a>
          <a href="#for-business" className="text-primary border border-primary text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-light transition-colors">Business Registration</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark-bg text-muted pt-14 pb-7">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="text-lg font-bold text-[#e8e0d8] mb-2">RoboToll</div>
            <p className="text-[13px] leading-relaxed">The robotic task toll platform for the automation age.</p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-accent-light mb-3.5">Platform</h4>
            <a href="#how-it-works" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">How It Works</a>
            <a href="#machine-types" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Machine Types</a>
            <a href="#tax-layers" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Tax Structure</a>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-accent-light mb-3.5">For Government</h4>
            <a href="#for-government" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Overview</a>
            <a href="#" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Rate Configuration</a>
            <a href="#" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">API Docs</a>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-accent-light mb-3.5">For Business</h4>
            <a href="#for-business" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Overview</a>
            <a href="#" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Machine Registry</a>
            <a href="#" className="block text-[13px] mb-1.5 hover:text-[#e8e0d8] transition-colors">Billing Portal</a>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-dark-border pt-5 text-xs">
          <span>&copy; 2026 RoboToll. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#e8e0d8] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#e8e0d8] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#e8e0d8] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-xl mx-auto mb-13">
      <h2 className="text-3xl font-bold tracking-tight mb-3.5">{title}</h2>
      <p className="text-[15px] text-muted leading-relaxed">{subtitle}</p>
    </div>
  );
}
