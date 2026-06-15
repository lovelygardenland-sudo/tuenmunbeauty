const fs = require("fs");
const path = require("path");

const SITE = {
  name: "康姿健屯門美容",
  phone: "9770 9300",
  address: "屯門紅橋菁菱徑9號華利大廈12號（地舖）",
  whatsapp: "https://wa.me/85297709300",
  instagram: "https://www.instagram.com/hong_chi_kin/",
  facebook:
    "https://www.facebook.com/p/%E5%BA%B7%E5%A7%BF%E5%81%A5%E7%90%86%E7%99%82-100066932628186/",
  xiaohongshu: "https://xhslink.com/m/2Pn14z6LTRr",
};

const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/content.json"), "utf8")
);

function bodyToHtml(text) {
  return text
    .split(/\n\n+/)
    .map((p) => {
      const t = p.trim();
      if (!t) return "";
      return `<p>${t.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}

function seoHead(title, desc, image, type = "website") {
  return `  <meta name="description" content="${desc}">
  <meta name="keywords" content="屯門美容,康姿健,醫美,香港美容,2026護膚">
  <meta name="geo.region" content="HK">
  <meta name="geo.placename" content="屯門">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${image}">
  <meta property="og:locale" content="zh_HK">
  <meta name="twitter:card" content="summary_large_image">`;
}

function jsonLdSalon() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    telephone: "+85297709300",
    address: {
      "@type": "PostalAddress",
      streetAddress: "紅橋菁菱徑9號華利大廈12號",
      addressLocality: "屯門",
      addressCountry: "HK",
    },
    sameAs: [SITE.instagram, SITE.facebook, SITE.xiaohongshu],
  });
}

function jsonLdPost(item) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: item.title,
    description: item.excerpt,
    image: item.image,
    author: { "@type": "Organization", name: SITE.name },
    inLanguage: "zh-HK",
  });
}

function nav(active, prefix = "") {
  const items = [
    ["index.html", "首頁"],
    ["about.html", "關於我們"],
    ["services.html", "療程服務"],
    ["blog.html", "醫美知識"],
    ["contact.html", "聯絡我們"],
  ];
  return items
    .map(([href, label]) => {
      const full = prefix + href;
      const on =
        active === href ||
        (active.startsWith("services/") && href === "services.html") ||
        (active.startsWith("blog/") && href === "blog.html");
      return `<li><a href="${full}"${on ? ' class="active"' : ""}>${label}</a></li>`;
    })
    .join("\n      ");
}

function header(active, prefix = "") {
  return `<div class="top-bar">
    <span class="top-bar-tagline">✨ Your Skin is Your Best Accessory · 屯門量膚定制</span>
    <div class="top-bar-social">
      <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a>
      <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
      <a href="${SITE.xiaohongshu}" target="_blank" rel="noopener">小紅書</a>
      <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
<header class="site-header">
  <nav class="nav-container">
    <a href="${prefix}index.html" class="logo">
      <img src="${prefix}images/profile.jpg" alt="康姿健">
      康姿健<span>屯門美容</span>
    </a>
    <button class="nav-toggle" aria-label="開啟選單">☰</button>
    <ul class="nav-menu">
      ${nav(active, prefix)}
    </ul>
  </nav>
</header>`;
}

function footer(prefix = "") {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <h4>康姿健屯門美容</h4>
      <p>${SITE.address}</p>
      <p>電話：${SITE.phone}</p>
      <div class="social-links">
        <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a>
        <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a href="${SITE.xiaohongshu}" target="_blank" rel="noopener">小紅書</a>
        <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
    <div>
      <h4>快速連結</h4>
      <ul>
        <li><a href="${prefix}about.html">關於我們</a></li>
        <li><a href="${prefix}services.html">療程服務</a></li>
        <li><a href="${prefix}blog.html">醫美知識</a></li>
        <li><a href="${prefix}contact.html">聯絡我們</a></li>
      </ul>
    </div>
    <div>
      <h4>服務地區</h4>
      <p>屯門、元朗、天水圍、荃灣及新界西</p>
      <p>WhatsApp：${SITE.phone}</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 康姿健 HONG CHI KIN · 香港屯門美容</p>
  </div>
</footer>
<a href="${SITE.whatsapp}" class="float-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp 預約">💬</a>`;
}

function detailPage(item, folder) {
  const img = item.image.replace("images/", "../images/");
  const isService = folder === "services";
  return `<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title}｜康姿健屯門美容</title>
${seoHead(item.title, item.excerpt, img, "article")}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">${jsonLdPost({ ...item, image: img })}</script>
</head>
<body>
${header(`${folder}/${item.slug}.html`, "../")}
<article class="blog-article">
  <div class="blog-article-hero">
    <img src="${img}" alt="${item.title}">
    <div class="blog-article-overlay">
      <span class="blog-card-category">${item.category}</span>
      <h1>${item.title}</h1>
    </div>
  </div>
  <div class="blog-article-body content-block">
    ${
      item.price
        ? `<p class="price-badge">${item.price}</p>`
        : '<p class="blog-meta">2026 醫美知識 · 香港 25-40 歲女性 · 屯門康姿健</p>'
    }
    ${bodyToHtml(item.body)}
    <div class="blog-tags">${(item.tags || [])
      .map((t) => `<span class="blog-tag">#${t}</span>`)
      .join("")}</div>
    <div class="blog-cta">
      <p>想了解自己適合邊款療程？歡迎預約諮詢。</p>
      <a href="${SITE.whatsapp}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp ${SITE.phone}</a>
      <a href="../${isService ? "services.html" : "blog.html"}" class="btn btn-primary" style="margin-left:0.75rem">${isService ? "返回療程服務" : "返回醫美知識"}</a>
    </div>
  </div>
</article>
${footer("../")}
<script src="../js/main.js"></script>
</body>
</html>`;
}

function card(item, href, category) {
  return `      <article class="blog-card">
        <a href="${href}" class="blog-card-link">
          <div class="blog-card-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="blog-card-banner"><span>${category || item.category}</span></div>
          </div>
          <div class="blog-card-body">
            <h2>${item.title}</h2>
            <p>${item.excerpt}</p>
            ${item.price ? `<span class="price-tag">${item.price}</span>` : ""}
            <span class="read-more">${item.price ? "了解療程" : "閱讀更多"} &gt;</span>
          </div>
        </a>
      </article>`;
}

function layout(title, description, image, active, inner) {
  return `<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
${seoHead(title, description, image, "website")}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script type="application/ld+json">${jsonLdSalon()}</script>
</head>
<body>
${header(active)}
${inner}
${footer("")}
<script src="js/main.js"></script>
</body>
</html>`;
}

const root = path.join(__dirname, "..");
const svcDir = path.join(root, "services");
const blogDir = path.join(root, "blog");
fs.mkdirSync(svcDir, { recursive: true });
fs.mkdirSync(blogDir, { recursive: true });

content.services.forEach((s) => {
  fs.writeFileSync(path.join(svcDir, `${s.slug}.html`), detailPage(s, "services"));
});
content.knowledge.forEach((k) => {
  fs.writeFileSync(path.join(blogDir, `${k.slug}.html`), detailPage(k, "blog"));
});

const byCat = {};
content.services.forEach((s) => {
  if (!byCat[s.category]) byCat[s.category] = [];
  byCat[s.category].push(s);
});

const servicesMain = `<header class="blog-hero">
  <h1>療程服務</h1>
  <p>參考 Lumino eShop 的直觀卡片式瀏覽，一眼揀到適合療程</p>
</header>
<section class="section blog-section">
  <p class="section-subtitle" style="margin-top:-1rem">單次收費、明碼實價、絕無硬銷</p>
${Object.entries(byCat)
  .map(
    ([cat, items]) => `  <h2 class="section-title cat-title">${cat}</h2>
  <div class="blog-grid">
${items.map((s) => card(s, `services/${s.slug}.html`, cat)).join("\n")}
  </div>`
  )
  .join("\n\n")}
  <p style="text-align:center;margin-top:2.5rem">
    <a href="${SITE.whatsapp}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp 預約諮詢</a>
  </p>
</section>`;

fs.writeFileSync(
  path.join(root, "services.html"),
  layout(
    "療程服務｜康姿健屯門美容",
    "屯門康姿健療程服務：果酸、等離子、微針、激光、遠紅外線養生。單次收費，絕無硬銷。",
    "images/promo-03.png",
    "services.html",
    servicesMain
  )
);

const blogMain = `<header class="blog-hero">
  <h1>醫美知識</h1>
  <p>2026 最新護膚知識，專為香港 25-40 歲女性</p>
</header>
<section class="section blog-section">
  <div class="blog-grid">
${content.knowledge.map((k) => card(k, `blog/${k.slug}.html`)).join("\n")}
  </div>
</section>`;

fs.writeFileSync(
  path.join(root, "blog.html"),
  layout(
    "醫美知識｜康姿健屯門美容",
    "2026 醫美知識分享：護膚貼士、果酸知識、儀器原理、屯門美容攻略。",
    "images/promo-15.png",
    "blog.html",
    blogMain
  )
);

const featuredSvc = content.services.slice(0, 6);
const featuredKnow = content.knowledge.slice(0, 3);

const indexMain = `<section class="hero">
  <div class="hero-bg"><img src="images/promo-03.png" alt="康姿健療程"></div>
  <div class="hero-content">
    <span class="hero-badge">韓系少女感 · 醫美科技 · 單次收費</span>
    <h1>屯門醫美療程，量膚定制更安心</h1>
    <p>參考你喜歡的 Lumino 版面，重整為「療程服務 + 醫美知識」雙主軸，快速了解項目與效果。</p>
    <a href="services.html" class="btn btn-primary">立即查看療程</a>
    <a href="${SITE.whatsapp}" class="btn btn-outline" target="_blank" rel="noopener">WhatsApp 預約</a>
  </div>
</section>
<section class="section">
  <h2 class="section-title">熱門療程</h2>
  <p class="section-subtitle">eshop 式卡片瀏覽，適合直接比較項目</p>
  <div class="blog-grid">
${featuredSvc.map((s) => card(s, `services/${s.slug}.html`)).join("\n")}
  </div>
  <p style="text-align:center;margin-top:2rem"><a href="services.html" class="btn btn-primary">查看全部療程</a></p>
</section>
<section class="section features">
  <h2 class="section-title">為什麼選擇康姿健</h2>
  <ul class="feature-list">
    <li class="feature-item"><div class="feature-icon">✨</div><h3>量膚定制</h3><p>先分析膚況，再建議療程。</p></li>
    <li class="feature-item"><div class="feature-icon">💜</div><h3>少女感風格</h3><p>粉紫韓系視覺，療程資訊更易看。</p></li>
    <li class="feature-item"><div class="feature-icon">💰</div><h3>單次收費</h3><p>明碼實價，絕無硬銷。</p></li>
    <li class="feature-item"><div class="feature-icon">🏆</div><h3>專業認證</h3><p>IBDR 金獎 + ITEC LV4 資格。</p></li>
  </ul>
</section>
<section class="section">
  <h2 class="section-title">最新醫美知識</h2>
  <div class="blog-grid">
${featuredKnow.map((k) => card(k, `blog/${k.slug}.html`)).join("\n")}
  </div>
  <p style="text-align:center;margin-top:2rem"><a href="blog.html" class="btn btn-primary">查看更多文章</a></p>
</section>`;

fs.writeFileSync(
  path.join(root, "index.html"),
  layout(
    "康姿健｜屯門美容",
    "屯門康姿健醫美中心，韓系少女感版面，療程與醫美知識整合。適合香港25-40歲女性。",
    "images/promo-03.png",
    "index.html",
    indexMain
  )
);

const aboutMain = `<header class="page-header"><h1>關於我們</h1><p>專注量膚定制，讓療程回歸效果本質</p></header>
<section class="section"><div class="content-block">
<h2>康姿健理念</h2>
<p>我哋希望美容唔再有壓力，客人可以安心了解自己膚況，按需要做療程。全店單次收費、明碼實價、絕無硬銷。</p>
<h2>專業背景</h2>
<ul>
  <li>IBDR 香港國際美容技能大賽面部護理金獎</li>
  <li>英國 ITEC LV4 國際專業激光美容師資格</li>
  <li>持續引入醫美級設備：PLASER、COLLAZEN、Genelux Lite、Dr. Rainbow</li>
</ul>
<h2>服務對象</h2>
<p>主力服務香港 25-40 歲女士，特別關注暗瘡粉刺、敏感泛紅、色斑暗沉、初老鬆弛、熬夜疲勞肌等問題。</p>
</div></section>`;

fs.writeFileSync(
  path.join(root, "about.html"),
  layout(
    "關於我們｜康姿健屯門美容",
    "康姿健屯門美容：量膚定制、單次收費、絕無硬銷。專注香港25-40歲女性護膚與醫美需求。",
    "images/promo-12.png",
    "about.html",
    aboutMain
  )
);

const options = content.services
  .slice(0, 12)
  .map((s) => `<option value="${s.slug}">${s.title}</option>`)
  .join("\n              ");

const contactMain = `<header class="page-header"><h1>聯絡我們</h1><p>預約療程 / 查詢膚況，歡迎 WhatsApp 聯絡</p></header>
<section class="section">
  <div class="contact-grid">
    <div>
      <h2 class="section-title" style="text-align:left;font-size:1.5rem">聯絡資訊</h2>
      <ul class="contact-info">
        <li><span>📍</span><div><strong>地址</strong>${SITE.address}</div></li>
        <li><span>📞</span><div><strong>電話 / WhatsApp</strong><a href="${SITE.whatsapp}" target="_blank" rel="noopener">${SITE.phone}</a></div></li>
        <li><span>📸</span><div><strong>Instagram</strong><a href="${SITE.instagram}" target="_blank" rel="noopener">@hong_chi_kin</a></div></li>
        <li><span>📘</span><div><strong>Facebook</strong><a href="${SITE.facebook}" target="_blank" rel="noopener">康姿健理療</a></div></li>
        <li><span>📕</span><div><strong>小紅書</strong><a href="${SITE.xiaohongshu}" target="_blank" rel="noopener">康姿健美容</a></div></li>
      </ul>
    </div>
    <div>
      <h2 class="section-title" style="text-align:left;font-size:1.5rem">預約查詢</h2>
      <form id="contact-form" action="#" method="post">
        <div class="form-group"><label for="name">姓名 *</label><input id="name" name="name" required placeholder="請輸入姓名"></div>
        <div class="form-group"><label for="phone">聯絡電話 *</label><input id="phone" name="phone" required placeholder="請輸入電話"></div>
        <div class="form-group"><label for="interest">感興趣療程</label><select id="interest" name="interest"><option value="">請選擇</option>${options}</select></div>
        <div class="form-group"><label for="message">留言</label><textarea id="message" name="message" placeholder="請描述你的膚況和想預約時段"></textarea></div>
        <button class="btn btn-primary" type="submit">送出查詢</button>
      </form>
    </div>
  </div>
</section>`;

fs.writeFileSync(
  path.join(root, "contact.html"),
  layout(
    "聯絡我們｜康姿健屯門美容",
    "聯絡康姿健屯門美容，WhatsApp 預約療程，查詢醫美與護膚方案。",
    "images/promo-12.png",
    "contact.html",
    contactMain
  )
);

const urls = [
  "index.html",
  "about.html",
  "services.html",
  "blog.html",
  "contact.html",
  ...content.services.map((s) => `services/${s.slug}.html`),
  ...content.knowledge.map((k) => `blog/${k.slug}.html`),
];

fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join("\n")}\n</urlset>`
);

fs.writeFileSync(
  path.join(root, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: sitemap.xml\n"
);

console.log(
  `Built pages: ${content.services.length} services, ${content.knowledge.length} knowledge`
);
