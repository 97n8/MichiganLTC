/* Michigan LTC Network — shared site behavior */
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Mark the current page in the navigation
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .footer-grid a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || /^(https?:|mailto:|#)/.test(href)) return;
    var target = href.split("#")[0].split("/").pop() || "index.html";
    if (target === here && a.closest(".nav-links")) {
      a.setAttribute("aria-current", "page");
    }
  });

  // Reveal-on-scroll
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealed.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealed.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
