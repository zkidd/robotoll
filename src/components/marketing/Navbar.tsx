import Link from "next/link";

export function Navbar() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 bg-dark-bg text-accent-light z-[101] h-9">
        <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-center gap-2 h-9 text-xs font-medium tracking-wide">
          <span className="text-muted">
            Zak Kidd details the impending fiscal crisis of labor automation
          </span>
          <a
            href="https://www.taxthetask.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light font-semibold hover:text-[#e8e0d8] transition-colors"
          >
            Read more at taxthetask.com &rarr;
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-9 left-0 right-0 bg-background/92 backdrop-blur-xl border-b border-border z-100 h-14">
        <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="text-lg font-bold text-foreground tracking-tight">
            RoboToll
          </Link>
          <div className="hidden md:flex gap-7">
            <a href="#how-it-works" className="text-sm font-medium text-muted hover:text-foreground transition-colors">How It Works</a>
            <a href="#for-government" className="text-sm font-medium text-muted hover:text-foreground transition-colors">For Government</a>
            <a href="#for-business" className="text-sm font-medium text-muted hover:text-foreground transition-colors">For Business</a>
            <a href="#machine-types" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Machines</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-foreground px-3 py-1.5">
              Log In
            </Link>
            <a href="#cta" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-primary-hover transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
