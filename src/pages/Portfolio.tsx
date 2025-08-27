import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { tid } from '@/lib/testIds';

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
      className="from-brand-50 text-brand-900 dark:from-brand-950 dark:to-brand-900 dark:text-brand-100 min-h-screen bg-gradient-to-b to-white"
    >
      {/* Header / Nav */}
      <header
        data-testid={tid.portfolio.header}
        className="border-brand-200/60 dark:border-brand-800/80 dark:bg-brand-950/60 sticky top-0 z-50 border-b bg-white/70 backdrop-blur"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="from-accent-400 to-brand-500 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white">
              GKL
            </span>
            <span className="font-semibold tracking-tight">Portfolio</span>
          </a>

          <nav
            data-testid={tid.portfolio.nav}
            className="hidden items-center gap-6 text-sm md:flex"
          >
            <a className="hover:text-brand-700 dark:hover:text-brand-200" href="#about">
              About
            </a>
            <a className="hover:text-brand-700 dark:hover:text-brand-200" href="#experience">
              Experience
            </a>
            <a className="hover:text-brand-700 dark:hover:text-brand-200" href="#education">
              Education
            </a>
            <a className="hover:text-brand-700 dark:hover:text-brand-200" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              data-testid={tid.portfolio.themeToggle}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="border-brand-300 text-brand-800 dark:border-brand-700 dark:bg-brand-800/70 dark:text-brand-100 rounded-xl border bg-white/70 px-3 py-1.5 text-xs"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>

            {guest && (
              <span
                data-testid={tid.portfolio.guestBadge}
                className="border-brand-300 text-brand-800 dark:border-brand-700 dark:text-brand-100 rounded-full border px-2 py-1 text-[11px]"
              >
                Guest
              </span>
            )}

            {onLogout && (
              <button
                data-testid={tid.portfolio.logout}
                onClick={onLogout}
                className="bg-brand-700 dark:bg-brand-100 dark:text-brand-900 rounded-xl px-3 py-1.5 text-xs font-medium text-white"
              >
                Logout
              </button>
            )}

            <button
              data-testid={tid.portfolio.mobileMenu}
              onClick={() => setOpen((o) => !o)}
              className="border-brand-300 text-brand-800 dark:border-brand-700 dark:text-brand-100 ml-1 rounded-lg border p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <div
            data-testid={tid.portfolio.mobilePanel}
            className="border-brand-200 dark:border-brand-800 dark:bg-brand-950/90 border-t bg-white/90 backdrop-blur md:hidden"
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
              <p className="text-brand-600 dark:text-brand-300 text-sm tracking-widest uppercase">
                Hello, I’m
              </p>
              <h1 className="mt-2 text-4xl leading-tight font-extrabold sm:text-5xl">
                Givan Kusuma <span className="text-brand-600 dark:text-brand-300">Libryano</span>
              </h1>
              <p className="text-brand-700 dark:text-brand-300 mt-5 max-w-prose">
                Computer Engineering graduate passionate about building clean, reliable UIs.
                Organized, adaptable, and a team player with strong communication and leadership
                skills.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  data-testid={tid.portfolio.hero.ctaContact}
                  href="#contact"
                  className="bg-brand-700 dark:bg-brand-100 dark:text-brand-900 rounded-xl px-4 py-2.5 font-medium text-white"
                >
                  Contact me
                </a>
                <a
                  data-testid={tid.portfolio.hero.ctaExperience}
                  href="#experience"
                  className="border-brand-300 text-brand-800 dark:border-brand-700 dark:text-brand-100 rounded-xl border px-4 py-2.5"
                >
                  View experience
                </a>
              </div>
            </div>

            {/* Decorative CSS avatar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative" data-testid={tid.portfolio.hero.avatar}>
                <div className="from-accent-400 via-brand-500 to-brand-700 h-56 w-56 rounded-3xl bg-gradient-to-br shadow-2xl sm:h-72 sm:w-72" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="border-brand-200 dark:border-brand-800 dark:bg-brand-900/70 grid h-24 w-24 place-items-center rounded-full border bg-white/80 shadow-lg sm:h-28 sm:w-28">
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
                className="border-brand-300 text-brand-800 dark:border-brand-700 dark:text-brand-100 rounded-full border px-2.5 py-1 text-xs"
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
              <p className="text-brand-700 dark:text-brand-300 leading-relaxed">
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
              <div className="from-accent-400 to-brand-500 grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br shadow-2xl">
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
              className="border-brand-200 dark:border-brand-800 dark:bg-brand-900/50 rounded-2xl border bg-white/70 p-6 sm:p-8"
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
                Name <span className="text-amber-500">*</span>
                <input
                  data-testid={tid.portfolio.contactForm.name}
                  name="name"
                  required
                  className="border-brand-300 focus:ring-brand-600 dark:border-brand-700 dark:bg-brand-800 dark:focus:ring-brand-300 mt-1 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2"
                />
              </label>

              <label className="mt-3 block text-sm">
                Email <span className="text-amber-500">*</span>
                <input
                  data-testid={tid.portfolio.contactForm.email}
                  name="email"
                  type="email"
                  required
                  className="border-brand-300 focus:ring-brand-600 dark:border-brand-700 dark:bg-brand-800 dark:focus:ring-brand-300 mt-1 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2"
                />
              </label>

              <label className="mt-3 block text-sm">
                Message <span className="text-amber-500">*</span>
                <textarea
                  data-testid={tid.portfolio.contactForm.message}
                  name="message"
                  required
                  rows={4}
                  className="border-brand-300 focus:ring-brand-600 dark:border-brand-700 dark:bg-brand-800 dark:focus:ring-brand-300 mt-1 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2"
                />
              </label>

              <div className="mt-4">
                <button
                  data-testid={tid.portfolio.contactForm.submit}
                  disabled={sending || !!guest}
                  title={guest ? 'Sign in required' : undefined}
                  className="bg-brand-700 dark:bg-brand-100 dark:text-brand-900 rounded-xl px-4 py-2.5 text-white disabled:opacity-60"
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
        className="border-brand-200 dark:border-brand-800 border-t py-10"
      >
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-semibold">Givan Kusuma Libryano</p>
          <p className="text-brand-600 dark:text-brand-400 text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* helpers with test IDs */
function Card({ children, dataTestId }: { children: React.ReactNode; dataTestId?: string }) {
  return (
    <div
      data-testid={dataTestId ?? tid.portfolio.card}
      className="border-brand-200 dark:border-brand-800 dark:bg-brand-900/50 rounded-2xl border bg-white/70 p-6"
    >
      {children}
    </div>
  );
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      data-testid={tid.portfolio.cardTitle}
      className="text-brand-600 dark:text-brand-300 text-sm tracking-wider"
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
  return <p className="text-brand-700 dark:text-brand-300">{children}</p>;
}
