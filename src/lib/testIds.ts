// src/lib/testIds.ts
export const tid = {
  app: {
    root: 'app-root',
    viewLogin: 'app-view-login',
    viewPortfolio: 'app-view-portfolio',
    viewReset: 'app-view-reset',
  },

  login: {
    root: 'login-root',
    themeToggle: 'login-theme-toggle',
    card: 'login-card',
    title: 'login-title',
    subtitle: 'login-subtitle',
    form: 'login-form',
    email: 'login-email',
    password: 'login-password',
    showPassword: 'login-show-password',
    remember: 'login-remember',
    forgot: 'login-forgot',
    error: 'login-error',
    submit: 'login-submit',
    guest: 'login-guest',
    notice: 'login-notice',
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
    footer: 'portfolio-footer', // <-- added

    section: {
      hero: 'portfolio-section-hero',
      about: 'portfolio-section-about',
      experience: 'portfolio-section-experience',
      education: 'portfolio-section-education',
      contact: 'portfolio-section-contact',
    },

    hero: {
      ctaContact: 'portfolio-hero-cta-contact',
      ctaExperience: 'portfolio-hero-cta-experience',
      avatar: 'portfolio-hero-avatar',
      skills: 'portfolio-hero-skills',
      skillBadge: (i: number) => `portfolio-hero-skill-${i}`,
    },

    experience: {
      grid: 'portfolio-experience-grid',
      card: (i: number) => `portfolio-experience-card-${i}`,
    },

    education: {
      grid: 'portfolio-education-grid',
      card: (i: number) => `portfolio-education-card-${i}`,
    },

    contactForm: {
      form: 'portfolio-contact-form',
      notice: 'portfolio-contact-notice',
      name: 'portfolio-contact-name',
      email: 'portfolio-contact-email',
      message: 'portfolio-contact-message',
      submit: 'portfolio-contact-submit',
    },

    card: 'portfolio-card',
    cardTitle: 'portfolio-card-title',
    cardBody: 'portfolio-card-body',
  },

  reset: {
    root: 'reset-root',
    invalid: 'reset-invalid',
    error: 'reset-error',
    notice: 'reset-notice',
    form: 'reset-form',
    pw1: 'reset-pw1',
    pw2: 'reset-pw2',
    submit: 'reset-submit',
  },
} as const;
