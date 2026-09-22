/* ============================================================
   Breaking MAG — main.js
   Theme toggle, navigation, reveal-on-scroll, filters, counters,
   back-to-top.
   ============================================================ */
document.documentElement.classList.add("js");

/* ---------- Theme toggle (dark default, persisted) ---------- */
const THEME_KEY = "breakingmag-theme";
const THEME_STORAGE = typeof Storage !== "undefined" ? localStorage : null;

const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
};

const savedTheme = THEME_STORAGE ? THEME_STORAGE.getItem(THEME_KEY) : null;
document.documentElement.setAttribute("data-theme", savedTheme || "dark");

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    if (THEME_STORAGE) THEME_STORAGE.setItem(THEME_KEY, next);
});
applyTheme(document.documentElement.getAttribute("data-theme"));

/* ---------- Nav bar: scroll state + mobile toggle ---------- */
const nav = document.getElementById("nav");
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const toTop = document.getElementById("toTop");

navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const onScroll = () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 20);
    toTop.hidden = window.scrollY < 400;
};
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Back to top ---------- */
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => io.observe(el));

/* ---------- Counter animation ---------- */
const counters = document.querySelectorAll(".stat__num[data-count]");
const cio = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || "";
            const dur = 1100;
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            cio.unobserve(el);
        });
    },
    { threshold: 0.6 }
);
counters.forEach((el) => cio.observe(el));

/* ---------- Tool cards filtering ---------- */
const filterBtns = document.querySelectorAll(".filter .chip");
const cards = document.querySelectorAll("#toolCards .card");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("chip--active"));
        btn.classList.add("chip--active");
        const f = btn.dataset.filter;
        cards.forEach((card) => {
            const show = f === "all" || card.dataset.category === f;
            card.classList.toggle("is-hidden", !show);
        });
    });
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();