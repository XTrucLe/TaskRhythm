import Logo from "../components/ui/Logo";
import { ThemeSwitch } from "../components/ui/ThemeSwitch";
import useRouting from "../hooks/useRouting";

export default function LandingPage() {
  const { goDashboard } = useRouting();

  return (
    <div
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Navbar */}
      <header
        className="flex justify-between items-center px-8 sticky top-0 z-50 shadow-[var(--shadow-lg)]"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <h1
          className="text-2xl font-bold flex"
          style={{ color: "var(--color-primary)" }}
        >
          <Logo />
        </h1>
        <nav className="hidden md:flex gap-8">
          <a href="#" style={{ color: "var(--color-text-secondary)" }}>
            Features
          </a>
          <a href="#" style={{ color: "var(--color-text-secondary)" }}>
            Pricing
          </a>
          <a href="#" style={{ color: "var(--color-text-secondary)" }}>
            About
          </a>
        </nav>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded font-semibold"
            style={{ backgroundColor: "var(--color-primary)", color: "white" }}
            onClick={() => goDashboard()}
          >
            Get Started
          </button>
          <ThemeSwitch />
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h2
          className="text-5xl font-extrabold mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          Organize Your Work,{" "}
          <span style={{ color: "var(--color-secondary)" }}>
            Boost Productivity
          </span>
        </h2>
        <p
          className="max-w-2xl mx-auto mb-8 text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          TaskManager helps teams track projects, manage deadlines, and
          collaborate effortlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "var(--color-primary)", color: "white" }}
          >
            Start Free Trial
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-16 max-w-6xl mx-auto">
        {[
          {
            title: "Track Progress",
            color: "var(--color-info)",
            desc: "Visualize tasks in Kanban or list view.",
          },
          {
            title: "Collaborate",
            color: "var(--color-success)",
            desc: "Work together in real-time.",
          },
          {
            title: "Meet Deadlines",
            color: "var(--color-warning)",
            desc: "Stay on top of due dates easily.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: f.color }}>
              {f.title}
            </h3>
            <p style={{ color: "var(--color-text-secondary)" }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section
        className="px-8 py-20 text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <h3
          className="text-3xl font-bold mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          Trusted by Teams Worldwide
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Alice", "Bob", "Charlie"].map((name, i) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-md"
              style={{ backgroundColor: "var(--color-background)" }}
            >
              <p
                className="italic mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                “TaskManager streamlined our workflow. We hit deadlines without
                stress!”
              </p>
              <span
                className="font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6">
        <h3
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          Ready to boost your team’s productivity?
        </h3>
        <button
          className="px-8 py-4 rounded-lg font-semibold text-lg"
          style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer
        className="p-8 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-muted)",
        }}
      >
        © 2025 TaskManager Inc. All rights reserved.
      </footer>
    </div>
  );
}
