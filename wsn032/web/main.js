/* wsn032 · 樊振东个人介绍站 · 轻量交互
   1 移动端导航  2 光影箱  3 滚动显现  4 年份高亮 */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // 点击导航项后收起菜单
    header.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- 光影箱 ----
  var box = document.querySelector(".lightbox");

  if (box) {
    var lbImg = box.querySelector("img");
    var lbCap = box.querySelector(".lb-caption");
    var lbClose = box.querySelector(".lb-close");
    var lastFocus = null;

    function openBox(src, alt, caption) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = caption || alt || "";
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
      lbClose.focus();
      document.body.style.overflow = "hidden";
    }

    function closeBox() {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) { lastFocus.focus(); }
    }

    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        openBox(btn.getAttribute("data-lightbox"), img ? img.alt : "", btn.getAttribute("data-caption"));
      });
    });

    lbClose.addEventListener("click", closeBox);
    box.addEventListener("click", function (e) {
      if (e.target === box) { closeBox(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) { closeBox(); }
    });
  }

  // ---- 滚动显现 ----
  var reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  // ---- 时间线年份：滚动进入时高亮 ----
  var marks = document.querySelectorAll(".timeline li.major");
  if (marks.length && "IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.style.borderLeftColor = entry.isIntersecting ? "var(--accent)" : "";
      });
    }, { threshold: 0.5 });
    marks.forEach(function (el) { io2.observe(el); });
  }
})();
