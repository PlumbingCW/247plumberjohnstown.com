(function () {
  "use strict";

  /* Mobile drawer */
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("drawer-close");
  function openDrawer() {
    drawer.removeAttribute("hidden");
    overlay.classList.add("visible");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.style.overflow = "hidden";
  }
  function closeDrawer() {
    drawer.setAttribute("hidden", "");
    overlay.classList.remove("visible");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.style.overflow = "";
  }
  if (toggle && drawer && overlay) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
    overlay.addEventListener("click", closeDrawer);
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 768) { closeDrawer(); } });
  }

  /* FAQ accordion (max-height toggle) */
  var qs = document.querySelectorAll(".faq-q button");
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener("click", function () {
      var item = this.closest(".faq-item");
      var open = item.classList.toggle("open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Hide the floating call button while the footer is in view */
  var sticky = document.querySelector(".sticky-cta");
  var footer = document.querySelector(".site-footer");
  if (sticky && footer && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (window.innerWidth > 768) {
          if (en.isIntersecting) { sticky.classList.add("is-hidden"); } else { sticky.classList.remove("is-hidden"); }
        }
      });
    }, { threshold: 0.05 });
    io.observe(footer);
  }
})();
