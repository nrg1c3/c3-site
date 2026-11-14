/* Service worker — عشان الصفحات تفتح وتتقرا لو النت ضعيف أو مقطوع.
   ملفات الموقع (الصفحات و CSS و JS والصور): الشبكة الأول، ولو فشلت من الكاش،
   عشان أي تحديث يوصل كامل من أول زيارة. الخطوط: من الكاش الأول (مش بتتغيّر).
   غيّر VERSION لو عايز تمسح الكاش القديم كله. */
var VERSION = "c3-v6";
var PAGES = ["index", "basata", "fit-out", "court-building", "padel", "contact", "privacy"];
var PRECACHE = ["./", "assets/css/style.css", "assets/js/config.js", "assets/js/main.js", "assets/img/c3-logo.svg"]
  .concat(PAGES.map(function (p) { return p + ".html"; }))
  .concat(PAGES.map(function (p) { return "en/" + p + ".html"; }));

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function store(req, res) {
  // بنخزّن الردود السليمة بس، عشان صفحة 404 أو 500 ما تمسحش النسخة الكويسة
  if (res && (res.ok || res.type === "opaque")) {
    var copy = res.clone();
    caches.open(VERSION).then(function (c) { c.put(req, copy); });
  }
  return res;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== self.location.origin && !isFont) return; // واتساب، البوت، السيرفر: من غير كاش

  if (isFont) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { return store(req, res); });
    }));
    return;
  }

  e.respondWith(fetch(req).then(function (res) { return store(req, res); }).catch(function () {
    return caches.match(req).then(function (hit) {
      if (hit || req.mode !== "navigate") return hit;
      // صفحة مش متخزّنة والنت مقطوع: الرئيسية بنفس اللغة
      return caches.match(url.pathname.indexOf("/en/") !== -1 ? "en/index.html" : "index.html");
    });
  }));
});
