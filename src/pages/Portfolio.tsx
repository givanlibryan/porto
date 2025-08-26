// src/pages/Portfolio.tsx
import { useEffect, useState } from "react";

type Props = { onLogout?: () => void };

export default function Portfolio({ onLogout }: Props) {
  // theme toggle (shared with login)
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark-mode", isDark); // harmless if unused
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-xs font-bold">
              GKL
            </span>
            <span className="font-semibold tracking-tight">Portfolio</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#about">About</a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#experience">Experience</a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#education">Education</a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs bg-white/70 dark:bg-slate-800/70"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-1.5 text-xs font-medium"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden ml-1 rounded-lg p-2 border border-slate-300 dark:border-slate-700"
              aria-label="Toggle menu"
            >
              {open ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 text-sm">
              <a onClick={() => setOpen(false)} className="py-1" href="#about">About</a>
              <a onClick={() => setOpen(false)} className="py-1" href="#experience">Experience</a>
              <a onClick={() => setOpen(false)} className="py-1" href="#education">Education</a>
              <a onClick={() => setOpen(false)} className="py-1" href="#contact">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main id="home">
        {/* Hero (no image) */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Hello, I’m</p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
                Givan Kusuma <span className="text-slate-500 dark:text-slate-300">Libryano</span>
              </h1>
              <p className="mt-5 text-slate-600 dark:text-slate-300 max-w-prose">
                Computer Engineering graduate passionate about building clean, reliable UIs. Organized, adaptable,
                and a team player with strong communication and leadership skills.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#contact" className="rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2.5 font-medium">
                  Contact me
                </a>
                <a href="#experience" className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5">
                  View experience
                </a>
              </div>
            </div>

            {/* Decorative CSS avatar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="h-56 w-56 sm:h-72 sm:w-72 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-2xl" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 grid place-items-center shadow-lg">
                    <span className="text-xl font-bold tracking-wider">GKL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-10 flex flex-wrap gap-2">
            {["HTML/CSS", "JavaScript/TypeScript", "React", "Tailwind", "Git/GitHub"].map(s => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-slate-300 dark:border-slate-700">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">About me</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              I graduated from Computer Engineering at Brawijaya University. I’m motivated, responsible, and organized
              with solid time management. I can work under pressure, learn fast, and adapt quickly. I enjoy collaborating
              and taking initiative to deliver results.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card><CardTitle>INTERNSHIP PROGRAM</CardTitle><CardBody>
              <P>IT Maintenance — IT Department</P><P>PT Amman Mineral Nusa Tenggara</P><P>2018</P>
            </CardBody></Card>

            <Card><CardTitle>ORGANIZATION</CardTitle><CardBody>
              <P>Unit Aktivitas Bulutangkis Universitas Brawijaya</P>
              <P>2017 Koordinator Dana dan Usaha</P>
              <P>2016 Staff Kaderisasi</P>
              <P>2015 Staff Dana dan Usaha</P>
            </CardBody></Card>

            <Card><CardTitle>COMMITTEE</CardTitle><CardBody>
              <P>2019 Staff — PIONIR IX</P>
              <P>2018 Staff — LIMA Badminton (Malang Subconf.)</P>
              <P>2017 Koordinator Divisi PDD — IBM 10</P>
              <P>2016 Koordinator Divisi PDD — Brawijaya Badminton Challenge</P>
            </CardBody></Card>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { level: "PRIMARY", school: "SDN 02 Maluk", years: "2002–2008" },
              { level: "JUNIOR HIGH", school: "SMPN 1 Sumbawa Besar", years: "2008–2011" },
              { level: "SENIOR HIGH", school: "SMAN 1 Sumbawa Besar", years: "2011–2014" },
              { level: "GRADUATE", school: "Computer Engineering, Univ. Brawijaya", years: "2014–2021" },
            ].map(item => (
              <Card key={item.level}>
                <CardTitle>{item.level}</CardTitle>
                <CardBody><P>{item.school}</P><P>{item.years}</P></CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact (emoji tile) */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="h-40 w-40 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center shadow-2xl">
                <span className="text-5xl">📬</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const t = e.currentTarget;
                const name = (t.elements.namedItem("name") as HTMLInputElement)?.value || "";
                const email = (t.elements.namedItem("email") as HTMLInputElement)?.value || "";
                const body = (t.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
                window.location.href = `mailto:givan@example.com?subject=Hello from ${encodeURIComponent(
                  name
                )}&body=${encodeURIComponent(body + "\n\nFrom: " + email)}`;
              }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold">Contact me</h2>

              <label className="mt-4 block text-sm">
                Name <span className="text-orange-500">*</span>
                <input
                  name="name" required
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200"
                />
              </label>

              <label className="mt-3 block text-sm">
                Email <span className="text-orange-500">*</span>
                <input
                  name="email" type="email" required
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200"
                />
              </label>

              <label className="mt-3 block text-sm">
                Message <span className="text-orange-500">*</span>
                <textarea
                  name="message" required rows={4}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-200"
                />
              </label>

              <div className="mt-4">
                <button className="rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2.5">
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-semibold">Givan Kusuma Libryano</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

/* small presentational helpers */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-6">
      {children}
    </div>
  );
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm tracking-wider text-slate-500 dark:text-slate-400">{children}</h3>;
}
function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 space-y-1">{children}</div>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-700 dark:text-slate-300">{children}</p>;
}
