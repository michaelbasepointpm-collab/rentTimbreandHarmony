/* Harmony — interactions: sticky nav, mobile menu, scroll reveal, lightbox */
(function () {
  "use strict";

  // Current year in footer
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Sticky nav shadow on scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    // Close menu when a link is tapped
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // Lightbox for floor plans & gallery
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ----- Photo gallery modal (suite + studio sets, shared across units) ----- */
  var GALLERIES = {
    suite: {
      label: "Harmony one-bedroom suite",
      photos: [
        { src: "assets/images/suite/living-1.png",  cap: "Living & dining" },
        { src: "assets/images/suite/living-2.png",  cap: "Living room" },
        { src: "assets/images/suite/living-3.png",  cap: "Living room" },
        { src: "assets/images/suite/living-4.png",  cap: "Living room" },
        { src: "assets/images/suite/living-5.png",  cap: "Living area" },
        { src: "assets/images/suite/living-6.png",  cap: "Living area" },
        { src: "assets/images/suite/living-7.png",  cap: "Living area" },
        { src: "assets/images/suite/kitchen-1.png", cap: "Kitchen" },
        { src: "assets/images/suite/kitchen-2.png", cap: "Kitchen" },
        { src: "assets/images/suite/kitchen-3.png", cap: "Kitchen" },
        { src: "assets/images/suite/kitchen-4.png", cap: "Kitchen" },
        { src: "assets/images/suite/bedroom-1.png", cap: "Bedroom" },
        { src: "assets/images/suite/bedroom-2.png", cap: "Bedroom" },
        { src: "assets/images/suite/bedroom-3.png", cap: "Bedroom" },
        { src: "assets/images/suite/bath-1.png",    cap: "Bathroom" },
        { src: "assets/images/suite/bath-2.png",    cap: "Bathroom" },
        { src: "assets/images/suite/balcony.png",   cap: "Private balcony" },
        { src: "assets/images/suite/lobby.png",     cap: "Building lobby" }
      ]
    },
    studio: {
      label: "Harmony studio",
      photos: [
        { src: "assets/images/studio/living-1.png",      cap: "Living & sleeping" },
        { src: "assets/images/studio/living-kitchen.png", cap: "Living & kitchen" },
        { src: "assets/images/studio/living-2.png",      cap: "Living area" },
        { src: "assets/images/studio/living-3.png",      cap: "Living area" },
        { src: "assets/images/studio/living-4.png",      cap: "Living area" },
        { src: "assets/images/studio/living-5.png",      cap: "Living area" },
        { src: "assets/images/studio/entry-1.png",       cap: "Entry" },
        { src: "assets/images/studio/entry-2.png",       cap: "Entry" },
        { src: "assets/images/studio/bathroom.png",      cap: "Bathroom" },
        { src: "assets/images/studio/balcony.png",       cap: "Private patio" }
      ]
    }
  };

  var sgal = document.getElementById("suiteGallery");
  var sgImg = document.getElementById("sgImg");
  var sgCap = document.getElementById("sgCaption");
  var sgCount = document.getElementById("sgCounter");
  var sgIndex = 0;
  var sgSet = GALLERIES.suite;

  function sgShow(i) {
    var photos = sgSet.photos;
    var n = photos.length;
    sgIndex = (i + n) % n;
    var item = photos[sgIndex];
    sgImg.src = item.src;
    sgImg.alt = item.cap + " — " + sgSet.label;
    sgCap.textContent = item.cap;
    sgCount.textContent = sgIndex + 1 + " / " + n;
  }
  function sgOpen(key) {
    if (!sgal) return;
    sgSet = GALLERIES[key] || GALLERIES.suite;
    sgShow(0);
    sgal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function sgClose() {
    sgal.classList.remove("open");
    document.body.style.overflow = "";
    sgImg.src = "";
  }

  document.querySelectorAll("[data-gallery]").forEach(function (b) {
    b.addEventListener("click", function () {
      sgOpen(b.getAttribute("data-gallery"));
    });
  });
  var sgPrev = document.getElementById("sgPrev");
  var sgNext = document.getElementById("sgNext");
  var sgCloseBtn = document.getElementById("sgClose");
  if (sgPrev) sgPrev.addEventListener("click", function () { sgShow(sgIndex - 1); });
  if (sgNext) sgNext.addEventListener("click", function () { sgShow(sgIndex + 1); });
  if (sgCloseBtn) sgCloseBtn.addEventListener("click", sgClose);
  if (sgal) sgal.addEventListener("click", function (e) { if (e.target === sgal) sgClose(); });
  document.addEventListener("keydown", function (e) {
    if (!sgal || !sgal.classList.contains("open")) return;
    if (e.key === "Escape") sgClose();
    else if (e.key === "ArrowLeft") sgShow(sgIndex - 1);
    else if (e.key === "ArrowRight") sgShow(sgIndex + 1);
  });
})();
