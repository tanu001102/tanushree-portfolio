/**
 * TANUSHREE C R - DARK ANIME & LO-FI PORTFOLIO ENGINE
 * Features:
 * - Amber & Sand Embers Particle Simulation
 * - Cybernetic Terminal Engine
 * - Dynamic Typewriter & Scroll Spies
 * - Project Architecture Dossiers & PDF Resume Viewer
 * - Scroll Reveal Animations
 * - Back to Top Button
 * - Active Navigation Highlighting
 * - Mobile Navigation Toggle
 */

// --- 1. FLOATING WARM BEIGE PARTICLES ENGINE ---
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.35 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#ebdbb2' : '#fabd2f'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += Math.sin(Date.now() * p.pulse * 0.05) * 0.005;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// --- 2. DYNAMIC TYPEWRITER EFFECT ---
function initTypewriter() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;

  const roles = [
    'MCA Student 🎓',
    'Python Developer 🐍',
    'AI/ML Enthusiast 🤖',
    'Data Analytics Enthusiast 📊',
    'Software Developer ⚡'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

// --- 3. PROJECT DATABASE & MODAL CONTROLLER ---
const projectData = {
  'ai-chatbot': {
    title: 'AI-Powered Chatbot',
    category: 'AI & Conversational Application',
    icon: '<i class="fa-solid fa-robot" style="font-size: 4rem; color: var(--accent-sand);"></i>',
    github: '#',
    summary: 'Developed a conversational AI application using Python and Google Gemini API to generate context-aware responses. The application features an interactive Gradio web interface for seamless user interaction and text-to-speech functionality using gTTS for audio output of responses.',
    architecture: [
      'AI-Powered Conversational Responses: Built using the Google Gemini API to generate intelligent, context-aware responses to user queries.',
      'Google Gemini API Integration: Integrated API calls with application logic to support interactive user requests and dynamic response generation.',
      'Interactive Web Interface: Developed using Gradio to provide a clean, intuitive interface for users to interact with the chatbot.',
      'Text-to-Speech Functionality: Implemented using gTTS (Google Text-to-Speech) to convert chatbot responses to audio output.',
      'Tested Conversational Workflows: Performed thorough testing to identify issues and refine the overall user interaction experience.'
    ],
    techStack: ['Python', 'Google Gemini API', 'Gradio', 'gTTS', 'REST APIs']
  },
  'disease-prediction': {
    title: 'Symptom-Based Disease Prediction System',
    category: 'Machine Learning & Healthcare',
    icon: '<i class="fa-solid fa-heartbeat" style="font-size: 4rem; color: var(--accent-sand);"></i>',
    github: '#',
    summary: 'Developed a machine learning classification application to predict potential diseases based on user-provided symptoms. Uses Random Forest classification with comprehensive data preprocessing and validation.',
    architecture: [
      'Data Preprocessing & Feature Preparation: Cleaned and transformed raw symptom data into ML-ready features using Pandas and NumPy.',
      'Data Validation: Implemented validation checks to ensure data quality and consistency before model training.',
      'Random Forest Classification: Trained a Random Forest classifier using Scikit-learn for robust multi-class disease prediction.',
      'Machine Learning Model Evaluation: Evaluated model performance using accuracy metrics, classification reports, and cross-validation.',
      'Symptom-Based Prediction: Built an inference pipeline that takes user symptoms as input and returns predicted disease classifications.'
    ],
    techStack: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Data Preprocessing']
  }
};

function openProjectModal(id) {
  const data = projectData[id];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const cat = document.getElementById('modal-category');
  const summary = document.getElementById('modal-summary');
  const archList = document.getElementById('modal-architecture');
  const stack = document.getElementById('modal-stack');
  const githubLink = document.getElementById('modal-github');
  const imgPlaceholder = document.getElementById('modal-img-placeholder');

  title.textContent = data.title;
  cat.textContent = data.category;
  summary.textContent = data.summary;
  imgPlaceholder.innerHTML = data.icon;

  archList.innerHTML = '';
  data.architecture.forEach(item => {
    const li = document.createElement('li');
    li.style.marginBottom = '8px';
    li.innerHTML = item;
    archList.appendChild(li);
  });

  stack.innerHTML = '';
  data.techStack.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tech-badge';
    span.textContent = t;
    stack.appendChild(span);
  });

  githubLink.href = data.github;
  if (data.github === '#') {
    githubLink.onclick = function(e) {
      e.preventDefault();
      showToast('GitHub repository URL will be added soon.');
    };
  } else {
    githubLink.onclick = null;
  }

  modal.classList.add('active');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
}

// --- 4. RESUME PDF MODAL CONTROLLER ---
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  modal.classList.add('active');
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  modal.classList.remove('active');
}

// --- 5. TOAST NOTIFICATION UTILITY ---
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function copyToClipboard(text, msg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    showToast('Copied: ' + text);
  });
}

// --- 6. INTERACTIVE TERMINAL ENGINE ---
function initTerminal() {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return;

  const commands = {
    help: `Available commands:
  • about          - View profile & credentials
  • skills         - Display technical matrix & competencies
  • projects       - List featured projects
  • internships    - View internship experience
  • education      - Display academic records
  • certifications - View professional certifications
  • languages      - View spoken language proficiencies
  • contact        - Show contact information
  • resume         - Open official PDF resume viewer
  • clear          - Clean terminal output`,
    about: `Tanushree C R // MCA Student | AI/ML & Software Developer
Affiliation : S-VYASA Deemed to be University, Bengaluru (MCA – AI, ML & Data Science)
Status      : 2025 - 2027 (Currently Pursuing)
BCA         : RNS First Grade College, Bengaluru (CGPA: 8.16/10)
Core Focus  : Python Development, AI/ML, Data Analytics, Software Development.
Bio         : MCA student specializing in Artificial Intelligence, Machine Learning,
              and Data Science with hands-on internship experience in AI application
              development and data analysis.`,
    projects: `Featured Projects:
  1. AI-Powered Chatbot
     • Python, Google Gemini API, Gradio, gTTS
     • Conversational AI with text-to-speech and interactive web interface
  2. Symptom-Based Disease Prediction System
     • Python, Scikit-learn, Random Forest
     • ML classification for disease prediction based on user symptoms`,
    skills: `Technical Matrix:
  [Languages]          : Python, SQL, JavaScript, HTML5, CSS3
  [AI/ML & Data Sci.]  : Scikit-learn, Random Forest, Classification, Model Training,
                         Model Evaluation, Data Cleaning, EDA, Data Visualization
  [Frameworks]         : Flask, Gradio, REST APIs, Google Gemini API, gTTS
  [Databases]          : MySQL, PostgreSQL, SQL Queries
  [Tools]              : Jupyter Notebook, Google Colab, Git Fundamentals
  [Core Competencies]  : Programming Fundamentals, Database Fundamentals,
                         Debugging, Troubleshooting, Application Testing`,
    internships: `Internship Experience:
  1. AI / Software Development Intern — Mevi Technologies (Feb 2025)
     • Developed Python AI chatbot using Google Gemini API
     • Built interactive Gradio interface with gTTS text-to-speech
     • Tested application functionality and refined workflows
  2. Data Analysis Intern — Bharat Electronics Limited / BEL (Dec 2024)
     • Analyzed datasets using Python for patterns & insights
     • Performed data cleaning, preprocessing & EDA
     • Conducted data validation and quality checks
     • Created data visualizations for decision-making`,
    education: `Academic Credentials:
  - S-VYASA Deemed to be University, Bengaluru
    Master of Computer Applications (MCA) – AI, ML & Data Science
    2025 – 2027 (Currently Pursuing)
  - RNS First Grade College, Bengaluru
    Bachelor of Computer Applications (BCA)
    CGPA: 8.16 / 10 (2022 – 2025)
  - Mahesh PU College, Bengaluru
    Pre-University Course (PUC)
    Percentage: 91% (2020 – 2022)`,
    certifications: `Verified Certifications:
  • Data Analytics          — Agastya Academy
  • Python for Data Science — Mevi Technologies
  • Disease Prediction using Machine Learning — Bharat Electronics Limited (BEL)`,
    languages: `Spoken Languages:
  • English (Professional Working Proficiency)
  • Kannada (Native)
  • Hindi (Working Proficiency)`,
    resume: () => {
      openResumeModal();
      return '>> Opening Tanushree_CR_Resume.pdf resume viewer...';
    },
    contact: `Contact Information:
  • Email    : tanutanushree967@gmail.com
  • Phone    : +91 9513870072
  • LinkedIn : https://linkedin.com/in/tanushree-cr
  • GitHub   : [Placeholder — will be added soon]
  • Location : Bengaluru, India`,
    clear: () => {
      body.innerHTML = '';
      return '';
    },
    sudo: 'Permission denied: Nice try, wanderer. 🍵',
    hello: 'Hello! Welcome to my portfolio terminal. Type "help" to see available commands.',
    hi: 'Hi there! 👋 Type "help" to explore my portfolio through the terminal.'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      if (!cmd) return;

      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="terminal-prompt">guest@tanushree:~$</span> ${escapeHtml(cmd)}`;
      body.appendChild(promptLine);

      let response = '';
      if (commands[cmd]) {
        if (typeof commands[cmd] === 'function') {
          response = commands[cmd]();
        } else {
          response = commands[cmd];
        }
      } else {
        response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
      }

      if (response) {
        const outLine = document.createElement('div');
        outLine.className = 'terminal-output';
        outLine.textContent = response;
        body.appendChild(outLine);
      }

      body.scrollTop = body.scrollHeight;
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// --- 7. SCROLL REVEAL ANIMATIONS ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about-card, .skill-box, .project-card, .timeline-item, .contact-info-card, .contact-form-card, .cert-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// --- 8. ACTIVE NAVIGATION HIGHLIGHTING ---
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActive() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
}

// --- 9. BACK TO TOP BUTTON ---
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

// --- 10. MOBILE NAVIGATION TOGGLE ---
function toggleMobileNav() {
  const navLinks = document.getElementById('nav-links');
  const toggleIcon = document.getElementById('mobile-toggle-icon');

  if (navLinks) {
    navLinks.classList.toggle('mobile-open');
    if (navLinks.classList.contains('mobile-open')) {
      toggleIcon.className = 'fa-solid fa-xmark';
    } else {
      toggleIcon.className = 'fa-solid fa-bars';
    }
  }
}

// Close mobile nav when a link is clicked
function initMobileNavClose() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('nav-links');
      const toggleIcon = document.getElementById('mobile-toggle-icon');
      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
      }
    });
  });
}

// --- 11. NAV SHADOW ON SCROLL ---
function initNavShadow() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.top = '8px';
    } else {
      nav.style.top = '18px';
    }
  });
}

// --- 12. CLOSE MOBILE NAV ON OUTSIDE CLICK ---
function initOutsideNavClose() {
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav-links');
    const toggle = document.getElementById('mobile-toggle');
    const toggleIcon = document.getElementById('mobile-toggle-icon');
    if (nav && nav.classList.contains('mobile-open')) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('mobile-open');
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
      }
    }
  });
}

// --- 13. STAGGERED REVEAL FOR SKILL CHIPS ---
function initChipStagger() {
  const boxes = document.querySelectorAll('.skill-box');
  boxes.forEach((box, bi) => {
    const chips = box.querySelectorAll('.skill-chip');
    chips.forEach((chip, ci) => {
      chip.style.transitionDelay = `${(bi * 50) + (ci * 30)}ms`;
    });
  });
}

// --- 14. COPY EMAIL SHORTCUT ---
function initEmailCopy() {
  const emailVal = document.querySelector('.info-text-group .val a[href^="mailto"]');
  if (emailVal) {
    emailVal.title = 'Click to copy email';
    emailVal.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('tanutanushree967@gmail.com', '✅ Email copied to clipboard!');
    });
  }
}

// --- 15. INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initTerminal();
  initScrollReveal();
  initActiveNav();
  initBackToTop();
  initMobileNavClose();
  initNavShadow();
  initOutsideNavClose();
  initChipStagger();
  initEmailCopy();

  // Filter Projects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'none';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Openers
  document.querySelectorAll('[data-project-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  // Modal Closers — backdrop click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  // Modal Closers — close button
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape — close any open modal
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
    // '?' — show terminal keyboard tip
    if (e.key === '?' && !e.target.closest('input, textarea')) {
      showToast('💡 Tip: Use the interactive terminal in the Skills section!');
    }
  });

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      showToast('📨 Submitting your message via FormSubmit...');
    });
  }

  // Smooth hover glow effect on about cards
  document.querySelectorAll('.about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(43,37,32,0.9), rgba(34,30,26,0.65))`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
});
