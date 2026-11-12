(function () {
  "use strict";
  var cfg = window.C3_CONFIG || {};
  var lang = (document.documentElement.lang || "ar").indexOf("ar") === 0 ? "ar" : "en";
  var isAr = lang === "ar";

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

  document.querySelectorAll("[data-wa-display]").forEach(function (el) {
    el.textContent = cfg.WHATSAPP_DISPLAY;
  });
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

  // ---------- الفورمات ----------
  // <form data-lead-form data-type="..." data-title="...">
  //   الحقول اللي عليها data-label بتتجمع في message كسطور.
  //   name و phone بيتبعتوا كحقول منفصلة. website = حقل مخفي ضد السبام.
  var MSG = {
    ar: {
      sending: "جاري الإرسال…",
      ok: "تم استلام طلبك ✅ هنتواصل معاك قريب على رقمك.",
      fail: "حصلت مشكلة في الإرسال. ابعت طلبك على واتساب بدلها:",
      busy: "اتبعت طلبات كتير من الجهاز ده. جرّب كمان شوية أو ابعت على واتساب:",
      wa: "ابعت على واتساب"
    },
    en: {
      sending: "Sending…",
      ok: "Request received ✅ We'll contact you soon.",
      fail: "Something went wrong. Please send your request on WhatsApp instead:",
      busy: "Too many requests from this device. Try again later or use WhatsApp:",
      wa: "Send on WhatsApp"
    }
  }[lang];

  function collect(form) {
    var data = { name: "", phone: "", lines: [] };
    form.querySelectorAll("[data-label]").forEach(function (field) {
      var value = field.value.trim();
      if (field.tagName === "SELECT") value = field.selectedIndex > 0 ? field.options[field.selectedIndex].text : "";
      if (field.name === "name") data.name = value;
      else if (field.name === "phone") data.phone = value;
      else if (value) data.lines.push(field.getAttribute("data-label") + ": " + value);
    });
    return data;
  }

  function waText(form, d) {
    var lines = [form.getAttribute("data-title") || ""];
    if (d.name) lines.push((isAr ? "الاسم: " : "Name: ") + d.name);
    if (d.phone) lines.push((isAr ? "الموبايل: " : "Mobile: ") + d.phone);
    return lines.concat(d.lines).join("\n");
  }

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    var waAlt = form.querySelector("[data-form-wa]");

    function show(kind, text, withWa) {
      status.className = "form-status is-" + kind;
      status.textContent = text;
      if (withWa) {
        var a = document.createElement("a");
        a.className = "btn btn-wa";
        a.target = "_blank";
        a.rel = "noopener";
        a.href = waLink(waText(form, collect(form)));
        a.textContent = MSG.wa;
        status.appendChild(document.createElement("br"));
        status.appendChild(a);
      }
    }

    // زرار واتساب البديل جنب الإرسال: بيتحدّث بالبيانات وقت الضغط
    if (waAlt) {
      waAlt.addEventListener("click", function () {
        waAlt.href = waLink(waText(form, collect(form)));
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = collect(form);
      var payload = {
        site: cfg.FORM_SITE,
        name: d.name,
        phone: d.phone,
        type: (form.querySelector("select[name=type]") || {}).value || form.getAttribute("data-type"),
        message: d.lines.join("\n"),
        page: location.pathname,
        lang: lang,
        website: (form.querySelector("[name=website]") || {}).value || ""
      };
      button.disabled = true;
      show("info", MSG.sending);
      fetch(cfg.FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) {
            show("ok", MSG.ok);
            form.reset();
          } else {
            show("error", res && res.error === "too_many" ? MSG.busy : MSG.fail, true);
          }
        })
        .catch(function () { show("error", MSG.fail, true); })
        .then(function () { button.disabled = false; });
    });
  });
})();
