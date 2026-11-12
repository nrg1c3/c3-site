(function () {
  "use strict";
  var cfg = window.C3_CONFIG || {};
  var lang = (document.documentElement.lang || "ar").indexOf("ar") === 0 ? "ar" : "en";
  var isAr = lang === "ar";
  var TIMEOUT_MS = 15000;

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

  // لينك إنستجرام من config.js
  document.querySelectorAll("[data-instagram]").forEach(function (a) {
    if (cfg.INSTAGRAM_URL) a.href = cfg.INSTAGRAM_URL;
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

  // تنبيه من غير صوت: اهتزاز (لو الجهاز بيدعمه) + لون + أيقونة + حركة (في CSS)
  function buzz(ok) {
    try { if (navigator.vibrate) navigator.vibrate(ok ? 80 : [60, 60, 60]); } catch (e) { /* مش مدعوم */ }
  }

  // ---------- الفورمات ----------
  // <form data-lead-form data-type="..." data-title="...">
  //   الحقول اللي عليها data-label بتتجمع في message كسطور (والاختيارات fieldset[data-label]).
  //   name و phone بيتبعتوا منفصلين. website = حقل مخفي ضد السبام. consent = موافقة إجبارية.
  var MSG = {
    ar: {
      sending: "جاري الإرسال…",
      ok: "طلبك وصل. هنكلمك قريب.",
      invalid: "في خانة ناقصة. كمّلها وابعت تاني.",
      fail: "الطلب ما وصلش. ابعته على واتساب.",
      timeout: "النت بطيء والطلب ما وصلش. ابعته على واتساب.",
      offline: "مفيش نت دلوقتي. ابعته على واتساب لما النت يرجع.",
      busy: "اتبعت طلبات كتير من الجهاز ده. ابعته على واتساب.",
      wa: "ابعت على واتساب"
    },
    en: {
      sending: "Sending…",
      ok: "Request received. We'll contact you soon.",
      invalid: "A field is missing. Please fill it in and send again.",
      fail: "Your request didn't go through. Send it on WhatsApp.",
      timeout: "The connection is slow and your request didn't go through. Send it on WhatsApp.",
      offline: "You're offline. Send it on WhatsApp when you're back online.",
      busy: "Too many requests from this device. Send it on WhatsApp.",
      wa: "Send on WhatsApp"
    }
  }[lang];

  var WA_ICON = '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.21 4.24-9.46 9.47-9.46a9.4 9.4 0 0 1 6.69 2.78 9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.24 9.46-9.45 9.46zm8.05-17.52A11.32 11.32 0 0 0 12.04.65C5.77.65.66 5.75.66 12.03c0 2 .52 3.96 1.52 5.69L.57 23.35l5.77-1.51a11.36 11.36 0 0 0 5.7 1.45h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.34-8.05z"/></svg>';

  function collect(form) {
    var data = { name: "", phone: "", lines: [] };
    form.querySelectorAll("[data-label]").forEach(function (field) {
      var label = field.getAttribute("data-label");
      var value;
      if (field.tagName === "FIELDSET") {
        var checked = field.querySelector("input:checked");
        value = checked ? checked.value : "";
      } else {
        value = field.value.trim();
      }
      if (field.name === "name") data.name = value;
      else if (field.name === "phone") data.phone = value;
      else if (value) data.lines.push(label + ": " + value);
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
        a.innerHTML = WA_ICON;
        a.appendChild(document.createTextNode(MSG.wa));
        status.appendChild(document.createElement("br"));
        status.appendChild(a);
      }
      if (kind === "ok" || kind === "error") buzz(kind === "ok");
    }

    // زرار واتساب البديل: بيتحدّث بالبيانات وقت الضغط
    if (waAlt) {
      waAlt.addEventListener("click", function () {
        waAlt.href = waLink(waText(form, collect(form)));
      });
    }

    // يشيل علامة الغلط أول ما المستخدم يصلّح
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
        e.target.removeAttribute("aria-invalid");
      }
      if (e.target.name === "consent" && e.target.checked) {
        e.target.closest(".consent").classList.remove("is-invalid");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // التحقق: جملة واحدة + الخانة الغلط بتتعلّم ويروح عليها الفوكس
      var firstBad = null;
      form.querySelectorAll("input, textarea, select").forEach(function (el) {
        if (el.name === "website") return;
        var bad = !el.checkValidity();
        if (el.type === "checkbox") el.closest(".consent").classList.toggle("is-invalid", bad);
        else if (bad) el.setAttribute("aria-invalid", "true");
        else el.removeAttribute("aria-invalid");
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        show("error", MSG.invalid);
        firstBad.focus();
        return;
      }

      if (navigator.onLine === false) {
        show("error", MSG.offline, true);
        return;
      }

      var d = collect(form);
      var typeRadio = form.querySelector("input[name=type]:checked");
      var payload = {
        site: cfg.FORM_SITE,
        name: d.name,
        phone: d.phone,
        type: typeRadio ? typeRadio.value : form.getAttribute("data-type"),
        message: d.lines.join("\n"),
        page: location.pathname,
        lang: lang,
        website: (form.querySelector("[name=website]") || {}).value || ""
      };

      var controller = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT_MS);
      var timedOut = false;
      if (controller) controller.signal.addEventListener("abort", function () { timedOut = true; });

      button.disabled = true;
      show("info", MSG.sending);
      fetch(cfg.FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
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
        .catch(function () { show("error", timedOut ? MSG.timeout : MSG.fail, true); })
        .then(function () { clearTimeout(timer); button.disabled = false; });
    });
  });

  // ---------- النت الضعيف: service worker عشان الصفحات تفتح من غير نت ----------
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    var script = document.currentScript || document.querySelector('script[src$="main.js"]');
    var base = new URL("../../", script.src);
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(new URL("sw.js", base).href, { scope: base.pathname }).catch(function () {});
    });
  }
})();
