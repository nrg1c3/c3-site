# برومبتات الميديا بالذكاء الاصطناعي — مشاريع C3

> مبنية على الفيديوهين المرجع (Kling 4.0، 12 نوفمبر): «الدخول للفرع بالليل» و«الدفع على الكاونتر».
> البرومبتات بالإنجليزي لأن Kling بيفهمها أحسن. الشرح والمكان على الموقع بالعربي.

---

## أولاً: قواعد لازم تتطبق قبل أي توليد

1. **مفيش كلام ولا لوجوهات جوه الفيديو.** Kling بيبوّظ الكتابة: في الفيديو المرجع اليافطة طلعت «IMOZE». حط الكلام واللوجو بعدين في المونتاج (CapCut/Canva)، بخط الهوية.
2. **ممنوع لوجو فودافون أو بساطة أو أي شركة تانية**، حتى لو مولّد. ده من قسم «ممنوع» في `BRIEF.md`.
3. **ده مشهد توضيحي، مش شغل حقيقي.** على الموقع الفيديو المولّد يتحط في مكان «الجو العام» بس (خلفية الهيرو أو الإعلانات)، **وعمره ما يتحط في «من أعمالنا» أو «فريقنا في الموقع» أو «قبل/بعد»**. المعرض للصور الحقيقية بس.
4. **علامة KlingAI تتشال بالتصدير من الخطة المدفوعة**، مش بالقص أو الطمس.
5. **الناس في المشهد:** شكل مصري وطبيعي، لبس عادي، ومن غير ما يتعمل شبه أي حد حقيقي من الفريق.
6. **المقاسات:** كل مشهد يتعمل مرتين: **16:9** للموقع على الشاشات الكبيرة ويوتيوب، و**9:16** للموبايل والريلز والستوري. 1080p، و5 ثواني (أو 10 لو المشهد فيه حركة كاميرا طويلة).
7. **الهوية:** إضاءة نضيفة ومؤسسية. أبيض + أزرق `#1A4D97` + كحلي `#0E2A54`. لمسة أخضر للفروع، ولمسة سماوي للبادل. **مش أحمر** (الأحمر للإعلانات بس لو الإدارة طلبت).

### Negative prompt (يتحط مع كل برومبت)
```
text, letters, words, signage text, logo, brand name, watermark, subtitles, distorted hands, extra fingers, warped faces, blurry, low quality, flicker, red branding, vodafone
```

### جملة الستايل (تتحط في آخر كل برومبت)
```
Cinematic, realistic, shot on a full-frame camera, 35mm lens, natural skin tones, soft clean lighting, white and deep-blue color palette, modern Egyptian setting, smooth stabilized camera movement, no text, no logos.
```

---

## ثانياً: البرومبتات لكل مشروع

### 1) C3 — «بنشغّل مشروعك يوم بيوم» (الرئيسية)
**المكان:** خلفية هيرو الرئيسية + فيديو التعريف على فيسبوك.

**1-أ بنجهّز**
```
Early morning, an empty commercial shop in a Cairo street being prepared: a small team in plain navy work vests measures the floor and installs white ceiling panels, sunlight through the glass front, slow dolly-in from the doorway.
```
**1-ب بنشغّل**
```
Morning, a staff member in a white shirt raises the metal shutter of a bright modern service branch, switches on the lights, the first customers walk in and are greeted with a smile, camera follows from behind at shoulder height.
```
**1-ج بنوضّح**
```
A manager at a clean white desk reviews a tablet showing abstract colorful bar charts (no numbers, no text), nods with satisfaction, shallow depth of field, warm office light, slow push-in on the tablet.
```

### 2) فروع بساطة — المدفوعات (`basata.html`)
**المكان:** هيرو صفحة الفروع + بوستات الفروع على فيسبوك.

**2-أ الدخول للفرع بالليل** (نفس الفيديو المرجع الأول، بس من غير يافطة مكتوبة)
```
Night, a busy Cairo sidewalk with warm street lights, a young man walks along the storefronts and enters a bright modern service branch with a glowing blank blue sign above glass doors, camera follows behind him and passes through the door into a clean white interior.
```
**2-ب الدفع على الكاونتر** (نفس الفيديو المرجع التاني)
```
Inside a bright white service branch with light-wood counter, a smiling employee in a white shirt takes a mobile-wallet payment: the customer shows his phone, a handheld POS terminal prints a receipt, the employee hands it over, blue accent chairs in the background, medium shot.
```
**2-ج دفع فاتورة**
```
An older woman pays a household bill at a service counter, the employee taps a POS terminal and hands her a printed receipt, she smiles and puts it in her bag, warm friendly mood, eye-level shot.
```

### 3) استثمر في فرع بساطة (`basata.html#invest`)
**المكان:** قسم الاستثمار + إعلان الفرانشايز.

```
Daytime, in front of a newly finished modern branch with glass facade and a blank sign, a confident man in smart-casual clothes receives a set of keys from a team lead in a navy vest, they shake hands, slow orbit around them, hopeful mood.
```
> ⚠️ ممنوع أي رقم أو فلوس في المشهد (لا عدّ فلوس ولا شيكات)، زي قاعدة الأرقام المالية في `BRIEF.md`.

### 4) تشطيب وتجهيز الفروع (`fit-out.html`)
**المكان:** هيرو صفحة التشطيب + بوست «قبل ⬅️ بعد».

**4-أ التحوّل (أقوى مشهد)** — استخدم خاصية **Start/End frame** في Kling:
- أول فريم: صورة **حقيقية** للمحل وهو على الطوب.
- آخر فريم: صورة **حقيقية** لنفس المحل وهو جاهز.
```
Smooth time-lapse transformation of the same shop from bare brick walls and concrete floor to a finished modern branch with white walls, light-wood counters, LED ceiling panels and blue accent partitions, fixed camera, same angle.
```
> لو اتعمل من صورنا الحقيقية يبقى «تحوّل لمشروع حقيقي»، ويتكتب جنبه «فيديو توضيحي من صور المشروع».

**4-ب الشغل**
```
Close-up sequence of fit-out work: hands fixing a white ceiling panel, a worker painting a wall white with a roller, a carpenter aligning a wooden counter, workers wear plain navy vests without logos, shallow depth of field.
```

### 5) إنشاء ملاعب البادل (`court-building.html`)
**المكان:** هيرو صفحة إنشاء الملاعب + إعلان «تسليم مفتاح».

> الأفضل هنا **image-to-video من صورنا الحقيقية** (صورة اللحام وصورة الأرضية من فوق) عشان المشهد يبقى شبه ملاعبنا.

**5-أ الهيكل**
```
A welder in a high-visibility vest welds a dark-green steel padel court frame, bright sparks, slow motion, late afternoon light, low angle.
```
**5-ب الزجاج**
```
Two workers carefully lift and install a large tempered glass panel into a padel court frame, close-up of hands and suction lifters, then wide shot of the glass wall in place.
```
**5-ج النجيلة**
```
Aerial top-down shot of workers rolling out blue artificial turf on a new padel court, the camera slowly rises to reveal the full court.
```
**5-د الإضاءة (نهاية الإعلان)**
```
Dusk, a newly built panoramic padel court, the floodlights switch on one by one, the camera slowly pulls back and rises to a wide aerial view, the court glows against the evening sky.
```

### 6) ملاعبنا — The Grand Padel (`padel.html`)
**المكان:** هيرو صفحة ملاعبنا + ريلز إنستجرام @grandpadeleg.

> ملاعبنا الحقيقية: ملعبين أزرق + ملعب بانوراما أحمر، وجنبهم نجيلة خضرا. لو عايز المشهد يبقى شبهها، اعمل image-to-video من صورة الملاعب بالليل.

**6-أ الملاعب بالليل من فوق**
```
Night aerial drone shot slowly orbiting three floodlit padel courts side by side, two blue courts and one red panoramic court, players in the middle of rallies, surrounded by green artificial grass, city lights in the background.
```
**6-ب رالي**
```
Slow-motion close-up of a padel smash at night, ball hitting the racket, players in sportswear, glass wall reflections, floodlights, energetic mood.
```

### 7) أكاديمية Hero Padel (`padel.html#academy`)
```
Daytime, a padel coach trains a small group of kids on a blue court, gentle high-fives, a child hits a good forehand and celebrates, warm and joyful mood, handheld camera.
```
> لو الوشوش هتبقى حقيقية (مش مولّدة)، لازم موافقة أولياء الأمور.

---

## ثالثاً: إزاي الفيديو يتحط على الموقع (لما يجهز)

- **فين:** خلفية الهيرو في الصفحة بتاعته بس. الأقسام اللي عنوانها «من أعمالنا» أو «فريقنا» أو «قبل/بعد» للصور الحقيقية.
- **علامة صغيرة على الفيديو:** «مشهد توضيحي» / "Illustrative scene".
- **الشروط التقنية** (من `docs/A11Y-CHECKLIST.md`):
  - `muted` و`playsinline` و`loop`، ومعاه صورة `poster` من أوضح فريم.
  - ملفين: MP4 (H.264) و WebM، **أقل من 2 ميجا للمشهد**.
  - **ما يشتغلش لوحده** لو المستخدم طالب تقليل الحركة (`prefers-reduced-motion`) أو مفعّل توفير البيانات (Save-Data). ساعتها يظهر الـ poster بس.
  - مفيش صوت مهم: أي كلام في الفيديو لازم يكون **مكتوب على الصفحة** جنبه.
  - زرار إيقاف/تشغيل ظاهر بأيقونة + كلمة.
- **التسليم:** ابعت ملف الـ MP4 من غير علامة Kling، وأنا هضغطه وأعمل الـ poster وأحطه.
