/* Service worker — عشان الصفحات تفتح وتتقرا لو النت ضعيف أو مقطوع.
   الصفحات: الشبكة الأول، ولو فشلت من الكاش. الملفات الثابتة: من الكاش وبتتحدّث في الخلفية.
   غيّر VERSION لو عايز تمسح الكاش القديم كله. */
var VERSION = "c3-v3";
var PAGES = ["index", "basata", "fit-out", "court-building", "padel", "contact", "privacy"];
var PRECACHE = ["./", "assets/css/style.css", "assets/js/config.js", "assets/js/main.js"]
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

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== self.location.origin && !isFont) return; // واتساب، البوت، السيرفر: من غير كاش

  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); });
    }));
    return;
  }

  // الملفات الثابتة: من الكاش فوراً، وبتتحدّث في الخلفية (stale-while-revalidate)
  e.respondWith(caches.open(VERSION).then(function (c) {
    return c.match(req).then(function (hit) {
      var update = fetch(req).then(function (res) {
        if (res.ok || res.type === "opaque") c.put(req, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || update;
    });
  }));
});
