// Anurag Mergu — portfolio interactions
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Top bar background once the page scrolls
  const topbar = document.querySelector(".topbar");
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Count-up for the hero stats
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    // Lock the width to the final number so the "+" doesn't jump around while counting
    cancelAnimationFrame(el._raf);
    el.textContent = target;
    el.style.display = "inline-block";
    el.style.minWidth = "";
    el.style.minWidth = el.getBoundingClientRect().width + "px";
    el.textContent = 0;
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 2)));
      if (t < 1) el._raf = requestAnimationFrame(tick);
    };
    el._raf = requestAnimationFrame(tick);
  };

  // Reveal elements as they enter the viewport
  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach((el) => io.observe(el));

    // Stats recount from 0 every time they scroll back into view
    const stats = document.querySelector(".stats");
    if (stats) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) stats.querySelectorAll("[data-count]").forEach(countUp);
      }, { threshold: 0.5 }).observe(stats);
    }
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll("[data-count]").forEach(countUp);
  }

  // Typing effect for the hero role: type a word, pause, delete, next word
  const typed = document.querySelector(".typed");
  if (typed && !reduceMotion) {
    const words = JSON.parse(typed.dataset.words);
    let w = 0, i = words[0].length, deleting = true;
    const step = () => {
      const word = words[w];
      typed.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 90;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      else i += deleting ? -1 : 1;
      setTimeout(step, delay);
    };
    setTimeout(step, 2200); // start after the first word has been on screen for a moment
  }

  // Hero photo: fade into focus every time it scrolls back into view
  const photo = document.querySelector(".hero__photo");
  if (photo && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      photo.classList.toggle("is-visible", entry.isIntersecting);
    }, { threshold: 0.2 }).observe(photo);
  } else if (photo) {
    photo.classList.add("is-visible");
  }

  // Back-to-top arrow: show once the visitor is near the bottom of the page
  const toTop = document.getElementById("toTop");
  const updateToTop = () => {
    const fromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    toTop.classList.toggle("is-shown", fromBottom < 500 && window.scrollY > 300);
  };
  updateToTop();

  // "#top" points at the fixed header, which the browser won't scroll to, so scroll manually
  document.querySelectorAll('a[href="#top"]').forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }));
  window.addEventListener("scroll", updateToTop, { passive: true });
  window.addEventListener("resize", updateToTop);

  // Highlight the nav link for the section in view
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  // Subtle parallax on the big PORTFOLIO word
  const word = document.querySelector(".hero__word");
  if (word && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) word.style.transform = `translateX(-50%) translateY(${y * 0.25}px)`;
    }, { passive: true });
  }
})();
