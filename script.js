// =========================
// THEME TOGGLE
// =========================

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

function updateThemeIcon() {
  themeToggle.textContent =
    root.getAttribute("data-theme") === "dark" ? "🌙" : "☀️";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const next =
    root.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";

  root.setAttribute("data-theme", next);

  localStorage.setItem("theme", next);

  updateThemeIcon();
});

// =========================
// MOBILE NAV
// =========================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });

}

// =========================
// SCROLL BAR
// =========================

const progress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  const doc = document.documentElement;

  const progressValue =
    (doc.scrollTop /
      (doc.scrollHeight - doc.clientHeight)) *
    100;

  progress.style.width = progressValue + "%";

  if (doc.scrollTop > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =========================
// REVEAL ANIMATION
// =========================

const revealElements =
  document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        animateStats(entry.target);

        observer.unobserve(entry.target);
      }

    });

  },

  {
    threshold: 0.2,
  }

);

revealElements.forEach((el) => observer.observe(el));

// =========================
// COUNTER
// =========================

function animateStats(section) {

  const stats =
    section.querySelectorAll(".stat-num");

  stats.forEach((item) => {

    const target = Number(item.dataset.target);

    let current = 0;

    const increment = Math.ceil(target / 60);

    function update() {

      current += increment;

      if (current >= target) {

        if (target === 99) {

          item.textContent = "99.9";

        } else {

          item.textContent =
            target.toLocaleString() + "+";

        }

        return;

      }

      item.textContent =
        current.toLocaleString();

      requestAnimationFrame(update);

    }

    update();

  });

}

// =========================
// ACTIVE NAV
// =========================

const sections =
  document.querySelectorAll("section[id]");

const navItems =
  document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const top =
      section.offsetTop - 120;

    if (pageYOffset >= top) {

      current = section.id;

    }

  });

  navItems.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      "#" + current
    ) {
      link.classList.add("active");
    }

  });

});

// =========================
// PROJECT FILTER
// =========================

const filterButtons =
  document.querySelectorAll(".filter");

const cards =
  document.querySelectorAll(".card");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    document
      .querySelector(".filter.active")
      .classList.remove("active");

    button.classList.add("active");

    const filter =
      button.dataset.filter;

    cards.forEach((card) => {

      if (
        filter === "all" ||
        card.dataset.cat === filter
      ) {

        card.classList.remove("hide");

      } else {

        card.classList.add("hide");

      }

    });

  });

});

// =========================
// TYPING EFFECT
// =========================

const roles = [

  "Enterprise Network Engineer",

  "Cisco Specialist",

  "Cloud Networking Engineer",

  "AWS & Azure Engineer",

  "Network Security Engineer",

  "Python Automation Engineer"

];

const typed =
  document.getElementById("typed");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {

  const currentRole =
    roles[roleIndex];

  typed.textContent =
    currentRole.substring(0, charIndex);

  if (!deleting) {

    charIndex++;

    if (charIndex >
      currentRole.length) {

      deleting = true;

      setTimeout(type, 1200);

      return;

    }

  } else {

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex >= roles.length) {

        roleIndex = 0;

      }

    }

  }

  setTimeout(
    type,
    deleting ? 40 : 90
  );

}

type();

// =========================
// CONTACT FORM
// =========================

const form =
  document.getElementById("contactForm");

const note =
  document.getElementById("formNote");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  note.textContent =
    "Thank you! Your message has been received.";

  form.reset();

});

// =========================
// FOOTER
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();