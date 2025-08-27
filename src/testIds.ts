// Central registry for stable test IDs.
export const tid = {
  app: {
    root: 'app-root',
    viewLogin: 'app-view-login',
    viewPortfolio: 'app-view-portfolio',
    viewReset: 'app-view-reset',
  },

  login: {
    root: 'login-root',
    card: 'login-card',
    title: 'login-title',
    subtitle: 'login-subtitle',
    themeToggle: 'login-theme-toggle',
    form: 'login-form',
    email: 'login-email',
    password: 'login-password',
    showPassword: 'login-toggle-show',
    remember: 'login-remember',
    forgot: 'login-forgot',
    submit: 'login-submit',
    guest: 'login-guest',
    error: 'login-error',
    notice: 'login-notice',
  },

  reset: {
    root: 'reset-root',
    invalid: 'reset-invalid',
    form: 'reset-form',
    pw1: 'reset-pw1',
    pw2: 'reset-pw2',
    submit: 'reset-submit',
    error: 'reset-error',
    notice: 'reset-notice',
  },

  portfolio: {
    root: 'portfolio-root',
    header: 'portfolio-header',
    nav: 'portfolio-nav',
    themeToggle: 'portfolio-theme-toggle',
    guestBadge: 'portfolio-guest-badge',
    logout: 'portfolio-logout',
    mobileMenu: 'portfolio-mobile-menu',
    mobilePanel: 'portfolio-mobile-panel',

    section: {
      hero: 'section-hero',
      about: 'section-about',
      experience: 'section-experience',
      education: 'section-education',
      contact: 'section-contact',
    },

    hero: {
      avatar: 'hero-avatar',
      ctaContact: 'hero-cta-contact',
      ctaExperience: 'hero-cta-experience',
      skills: 'hero-skills',
      skillBadge: (i: number) => `hero-skill-${i}`,
    },

    experience: {
      grid: 'experience-grid',
      card: (i: number) => `experience-card-${i}`,
    },

    education: {
      grid: 'education-grid',
      card: (i: number) => `education-card-${i}`,
    },

    contactForm: {
      form: 'contact-form',
      name: 'contact-name',
      email: 'contact-email',
      message: 'contact-message',
      submit: 'contact-submit',
      notice: 'contact-notice',
    },

    footer: 'portfolio-footer',

    // Presentational helpers
    card: 'ui-card',
    cardTitle: 'ui-card-title',
    cardBody: 'ui-card-body',
  },
} as const;
