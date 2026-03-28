export function Hero() {
  return (
    <section className="pt-40 pb-20 bg-background">
      <div className="max-w-[1080px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-block text-xs font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-sm uppercase tracking-wider mb-5">
            The future of automation taxation
          </div>
          <h1 className="text-4xl lg:text-[40px] font-bold leading-[1.15] tracking-tight mb-5">
            Tax every robotic task.<br />At every level of government.
          </h1>
          <p className="text-base text-muted leading-relaxed mb-8 max-w-[480px]">
            Track work performed by self-checkout kiosks, driverless vehicles, and
            humanoid robots. Apply federal, state, and local taxes per task.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#for-government" className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-hover transition-colors">
              I represent a government agency
            </a>
            <a href="#for-business" className="text-primary border border-primary text-sm font-semibold px-6 py-3 rounded-md hover:bg-primary-light transition-colors">
              I own robotic systems
            </a>
          </div>
        </div>

        {/* Mock Dashboard */}
        <div className="bg-dark-bg border border-dark-border rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-dark-surface px-4 py-2.5 flex items-center gap-1.5 border-b border-dark-border">
            <span className="w-2 h-2 rounded-full bg-danger" />
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted text-[11px] ml-2 tracking-wide">RoboToll Dashboard</span>
          </div>
          <div className="p-4">
            <div className="flex gap-2.5 mb-4">
              {[
                { label: "Machines", value: "1,247" },
                { label: "Tasks (30d)", value: "482,319" },
                { label: "Tax Revenue", value: "$2.41M" },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 bg-white/[0.04] border border-dark-border rounded px-3 py-2.5">
                  <div className="text-[10px] text-muted uppercase font-semibold tracking-wider">{stat.label}</div>
                  <div className="text-xl font-bold text-[#e8e0d8] mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Self-Checkout", width: "72%", color: "bg-accent-mid" },
                { label: "Driverless", width: "55%", color: "bg-accent-dark" },
                { label: "Humanoid", width: "40%", color: "bg-primary" },
              ].map((bar) => (
                <div key={bar.label} className={`h-6 rounded-sm ${bar.color} flex items-center px-2.5`} style={{ width: bar.width }}>
                  <span className="text-white/90 text-[11px] font-semibold">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
