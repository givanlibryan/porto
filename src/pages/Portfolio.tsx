import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { tid } from '../testIds';

type Props = { onLogout?: () => void; guest?: boolean };

export default function Portfolio({ onLogout, guest }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const skills = ['HTML/CSS', 'JavaScript/TypeScript', 'React', 'Tailwind', 'Git/GitHub'];

  return (
    <div
      data-testid={tid.portfolio.root}
      className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100"
    >
      {/* Header / Nav */}
      <header
        data-testid={tid.portfolio.header}
        className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
              GKL
            </span>
            <span className="font-semibold tracking-tight">Portfolio</span>
          </a>

          <nav
            data-testid={tid.portfolio.nav}
            className="hidden items-center gap-6 text-sm md:flex"
          >
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#about">
              About
            </a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#experience">
              Experience
            </a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#education">
              Education
            </a>
            <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              data-testid={tid.portfolio.themeToggle}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="rounded-xl border border-slate-300 bg-white/70 px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800/70"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>

            {guest && (
              <span
                data-testid={tid.portfolio.guestBadge}
                className="rounded-full border border-slate-300 px-2 py-1 text-[11px] dark:border-slate-700"
              >
                Guest
              </span>
            )}

            {onLogout && (
              <button
                data-testid={tid.portfolio.logout}
                onClick={onLogout}
                className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
              >
                Logout
              </button>
            )}

            <button
              data-testid={tid.portfolio.mobileMenu}
              onClick={() => setOpen((o) => !o)}
              className="ml-1 rounded-lg border border-slate-300 p-2 md:hidden dark:border-slate-700"
              aria-label="Toggle menu"
            >
              {open ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <div
            data-testid={tid.portfolio.mobilePanel}
            className="border-t border-slate-200 bg-white/90 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/90"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
              <a onClick={() => setOpen(false)} className="py-1" href="#about">
                About
              </a>
              <a onClick={() => setOpen(false)} className="py-1" href="#experience">
                Experience
              </a>
              <a onClick={() => setOpen(false)} className="py-1" href="#education">
                Education
              </a>
              <a onClick={() => setOpen(false)} className="py-1" href="#contact">
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="home">
        {/* Hero */}
        <section
          data-testid={tid.portfolio.section.hero}
          className="mx-auto max-w-6xl px-4 py-16 sm:py-24"
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm tracking-widest text-slate-500 uppercase dark:text-slate-400">
                Hello, I’m
              </p>
              <h1 className="mt-2 text-4xl leading-tight font-extrabold sm:text-5xl">
                Givan Kusuma <span className="text-slate-500 dark:text-slate-300">Libryano</span>
              </h1>
              <p className="mt-5 max-w-prose text-slate-600 dark:text-slate-300">
                Computer Engineering graduate passionate about building clean, reliable UIs.
                Organized, adaptable, and a team player with strong communication and leadership
                skills.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  data-testid={tid.portfolio.hero.ctaContact}
                  href="#contact"
                  className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  Contact me
                </a>
                <a
                  data-testid={tid.portfolio.hero.ctaExperience}
                  href="#experience"
                  className="rounded-xl border border-slate-300 px-4 py-2.5 dark:border-slate-700"
                >
                  View experience
                </a>
              </div>
            </div>

            {/* Decorative CSS avatar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative" data-testid={tid.portfolio.hero.avatar}>
                <div className="h-56 w-56 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-2xl sm:h-72 sm:w-72" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full border border-slate-200 bg-white/80 shadow-lg sm:h-28 sm:w-28 dark:border-slate-800 dark:bg-slate-900/70">
                    <span className="text-xl font-bold tracking-wider">GKL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div data-testid={tid.portfolio.hero.skills} className="mt-10 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={s}
                data-testid={tid.portfolio.hero.skillBadge(i)}
                className="rounded-full border border-slate-300 px-2.5 py-1 text-xs dark:border-slate-700"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <section
          data-testid={tid.portfolio.section.about}
          id="about"
          className="mx-auto max-w-6xl px-4 py-12"
        >
          <Card>
            <CardTitle>About me</CardTitle>
            <CardBody>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                I graduated from Computer Engineering at Brawijaya University. I’m motivated,
                responsible, and organized with solid time management. I can work under pressure,
                learn fast, and adapt quickly. I enjoy collaborating and taking initiative to
                deliver results.
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Experience */}
        <section
          data-testid={tid.portfolio.section.experience}
          id="experience"
          className="mx-auto max-w-6xl px-4 py-12"
        >
          <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
          <div data-testid={tid.portfolio.experience.grid} className="grid gap-6 md:grid-cols-3">
            <Card dataTestId={tid.portfolio.experience.card(0)}>
              <CardTitle>INTERNSHIP PROGRAM</CardTitle>
              <CardBody>
                <P>IT Maintenance — IT Department</P>
                <P>PT Amman Mineral Nusa Tenggara</P>
                <P>2018</P>
              </CardBody>
            </Card>

            <Card dataTestId={tid.portfolio.experience.card(1)}>
              <CardTitle>ORGANIZATION</CardTitle>
              <CardBody>
                <P>Unit Aktivitas Bulutangkis Universitas Brawijaya</P>
                <P>2017 Koordinator Dana dan Usaha</P>
                <P>2016 Staff Kaderisasi</P>
                <P>2015 Staff Dana dan Usaha</P>
              </CardBody>
            </Card>

            <Card dataTestId={tid.portfolio.experience.card(2)}>
              <CardTitle>COMMITTEE</CardTitle>
              <CardBody>
                <P>2019 Staff — PIONIR IX</P>
                <P>2018 Staff — LIMA Badminton (Malang Subconf.)</P>
                <P>2017 Koordinator Divisi PDD — IBM 10</P>
                <P>2016 Koordinator Divisi PDD — Brawijaya Badminton Challenge</P>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Education */}
        <section
          data-testid={tid.portfolio.section.education}
          id="education"
          className="mx-auto max-w-6xl px-4 py-12"
        >
          <h2 className="mb-6 text-2xl font-semibold">Education</h2>
          <div data-testid={tid.portfolio.education.grid} className="grid gap-6 md:grid-cols-4">
            {[
              { title: 'PRIMARY', body: ['SDN 02 Maluk', '2002–2008'] },
              { title: 'JUNIOR HIGH', body: ['SMPN 1 Sumbawa Besar', '2008–2011'] },
              { title: 'SENIOR HIGH', body: ['SMAN 1 Sumbawa Besar', '2011–2014'] },
              { title: 'GRADUATE', body: ['Computer Engineering, Univ. Brawijaya', '2014–2021'] },
            ].map((item, i) => (
              <Card key={item.title} dataTestId={tid.portfolio.education.card(i)}>
                <CardTitle>{item.title}</CardTitle>
                <CardBody>
                  {item.body.map((line) => (
                    <P key={line}>{line}</P>
                  ))}
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          data-testid={tid.portfolio.section.contact}
          id="contact"
          className="mx-auto max-w-6xl px-4 py-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex justify-center">
              <div className="grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-2xl">
                <span className="text-5xl">📬</span>
              </div>
            </div>

            <form
              data-testid={tid.portfolio.contactForm.form}
              onSubmit={async (e) => {
                e.preventDefault();
                setNotice(null);

                if (guest) {
                  setNotice({ type: 'err', msg: 'Please sign in to send a message.' });
                  return;
                }

                setSending(true);
                try {
                  const t = e.currentTarget as HTMLFormElement;
                  const name =
                    (t.elements.namedItem('name') as HTMLInputElement)?.value?.trim() || '';
                  const email =
                    (t.elements.namedItem('email') as HTMLInputElement)?.value?.trim() || '';
                  const message =
                    (t.elements.namedItem('message') as HTMLTextAreaElement)?.value?.trim() || '';

                  if (!name || !email || !message) {
                    setNotice({ type: 'err', msg: 'Please fill out all fields.' });
                    setSending(false);
                    return;
                  }

                  const { data: userData } = await supabase.auth.getUser();
                  const user_id = userData.user?.id ?? null;

                  const { error } = await supabase
                    .from('contact_messages')
                    .insert([{ name, email, message, user_id }]);

                  if (error) throw error;

                  setNotice({ type: 'ok', msg: 'Message sent. Thank you!' });
                  t.reset();
                } catch (err: unknown) {
                  const msg =
                    typeof err === 'string'
                      ? err
                      : err && typeof err === 'object' && 'message' in err
                        ? String((err as { message?: unknown }).message)
                        : 'Failed to send message.';
                  setNotice({ type: 'err', msg });
                } finally {
                  setSending(false);
                }
              }}
              className="rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <h2 className="text-xl font-semibold">Contact me</h2>

              {notice && (
                <div
                  data-testid={tid.portfolio.contactForm.notice}
                  className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                    notice.type === 'ok'
                      ? 'border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-200'
                      : 'border border-red-300 bg-red-50 text-red-800 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-200'
                  }`}
                >
                  {notice.msg}
                </div>
              )}

              <label className="mt-4 block text-sm">
                Name <span className="text-orange-500">*</span>
                <input
                  data-testid={tid.portfolio.contactForm.name}
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-200"
                />
              </label>

              <label className="mt-3 block text-sm">
                Email <span className="text-orange-500">*</span>
                <input
                  data-testid={tid.portfolio.contactForm.email}
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-200"
                />
              </label>

              <label className="mt-3 block text-sm">
                Message <span className="text-orange-500">*</span>
                <textarea
                  data-testid={tid.portfolio.contactForm.message}
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-slate-200"
                />
              </label>

              <div className="mt-4">
                <button
                  data-testid={tid.portfolio.contactForm.submit}
                  disabled={sending || !!guest}
                  title={guest ? 'Sign in required' : undefined}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-white disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
                >
                  {sending ? 'Sending…' : guest ? 'Sign in to send' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer
        data-testid={tid.portfolio.footer}
        className="border-t border-slate-200 py-10 dark:border-slate-800"
      >
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-semibold">Givan Kusuma Libryano</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* small presentational helpers with test IDs */
function Card({ children, dataTestId }: { children: React.ReactNode; dataTestId?: string }) {
  return (
    <div
      data-testid={dataTestId ?? tid.portfolio.card}
      className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/50"
    >
      {children}
    </div>
  );
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      data-testid={tid.portfolio.cardTitle}
      className="text-sm tracking-wider text-slate-500 dark:text-slate-400"
    >
      {children}
    </h3>
  );
}
function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <div data-testid={tid.portfolio.cardBody} className="mt-2 space-y-1">
      {children}
    </div>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-700 dark:text-slate-300">{children}</p>;
}
