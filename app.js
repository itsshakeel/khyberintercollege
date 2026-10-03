/* Khyber Inter College Kohat — interactions */

(function () {
  "use strict";

  /* ── Footer year ── */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ── Sticky navbar shadow ── */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    })
  );

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ── Animated counters ── */
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ── Testimonial slider ── */
  const track = document.getElementById("tTrack");
  const slides = track.querySelectorAll(".testimonial");
  const dotsWrap = document.getElementById("tDots");
  let current = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll("button");

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 6000);
  }
  show(0);
  restart();

  /* ── Admission form (demo) ── */
  const form = document.getElementById("applyForm");
  const success = document.getElementById("formSuccess");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const program = form.querySelector('[name="program"]').value;
    if (!name || !phone || !program) {
      success.hidden = false;
      success.style.background = "#fdecec";
      success.style.borderColor = "#f3b3b3";
      success.style.color = "#a33";
      success.textContent = "Please fill in your name, phone number and program.";
      return;
    }
    success.style.background = "";
    success.style.borderColor = "";
    success.style.color = "";
    success.hidden = false;
    success.textContent =
      "✓ Thank you, " + name + "! Your request for " + program + " has been received. We'll call you at " + phone + " shortly.";
    form.reset();
  });
})();
