(function () {
  "use strict";
  var cfg = window.C3_CONFIG || {};
  var isAr = (document.documentElement.lang || "ar").indexOf("ar") === 0;

  function waLink(text) {
    var url = "https://wa.me/" + cfg.WHATSAPP_NUMBER;
    return text ? url + "?text=" + encodeURIComponent(text) : url;
  }

  // روابط واتساب: <a data-wa data-wa-text="...">
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa-text") || "");
    a.target = "_blank";
    a.rel = "noopener";
  });

  // أزرار الحجز: <a data-booking>
  var bookingText = isAr ? "مرحبًا، عايز أحجز ملعب بادل." : "Hello, I'd like to book a padel court.";
  document.querySelectorAll("[data-booking]").forEach(function (a) {
    a.href = cfg.BOOKING_URL ? cfg.BOOKING_URL : waLink(bookingText);
    a.target = "_blank";
    a.rel = "noopener";
  });

  // رقم واتساب المعروض
  document.querySelectorAll("[data-wa-display]").forEach(function (el) {
    el.textContent = cfg.WHATSAPP_DISPLAY;
  });

  // السنة في الفوتر
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // منيو الموبايل
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // فورم طلب عرض السعر → رسالة واتساب جاهزة
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var lines = [isAr ? "طلب عرض سعر — إنشاء/تشطيب ملعب بادل" : "Quote request — padel court construction/finishing", ""];
      form.querySelectorAll("[data-label]").forEach(function (field) {
        var value = field.value.trim();
        if (field.tagName === "SELECT" && field.selectedIndex > 0) {
          value = field.options[field.selectedIndex].text;
        } else if (field.tagName === "SELECT") {
          value = "";
        }
        if (value) lines.push(field.getAttribute("data-label") + ": " + value);
      });
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }
})();
