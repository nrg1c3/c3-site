/* إعدادات الموقع — المكان الوحيد للروابط والأرقام
   Site configuration — the single place for links and numbers */
window.C3_CONFIG = {
  // واتساب واتصال — الرقم الوحيد لكل الفروع والخدمات
  WHATSAPP_NUMBER: "201500709489",
  WHATSAPP_DISPLAY: "01500709489",

  // بوت الحجز (n8n) — كل أزرار "احجز" بتفتحه. لو اتشال، الأزرار بترجع تفتح واتساب.
  BOOKING_URL: "https://api.nrg-egypt.com/webhook/5014eaed-9472-4f9d-9381-3d44c8b681c2/chat",

  // استقبال الفورمات (POST JSON). مسموح من nrg1c3.github.io بس.
  FORM_ENDPOINT: "https://api.nrg-egypt.com/webhook/site-contact",
  FORM_SITE: "c3"
};
