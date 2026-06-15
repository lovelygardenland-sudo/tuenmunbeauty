const fs = require("fs");
const path = require("path");

const SITE = {
  name: "康姿健屯門美容",
  brand: "康姿健",
  phone: "9770 9300",
  address: "屯門紅橋菁菱徑9號華利大廈12號（地舖）",
  area: "屯門",
  region: "HK",
  whatsapp: "https://wa.me/85297709300",
  instagram: "https://www.instagram.com/hong_chi_kin/",
  facebook: "https://www.facebook.com/p/%E5%BA%B7%E5%A7%BF%E5%81%A5%E7%90%86%E7%99%82-100066932628186/",
  xiaohongshu: "https://xhslink.com/m/2Pn14z6LTRr",
};

const extraPosts = [
  {
    id: 7,
    slug: "2026-hk-ol-skincare-guide",
    seoTitle: "【2026 香港OL護膚全攻略】25-35歲轉季敏感、暗瘡、熬夜肌點救？",
    topic: "【2026 香港OL護膚全攻略】25-35歲轉季敏感、暗瘡、熬夜肌點救？",
    excerpt:
      "香港濕熱天氣、冷氣乾燥、長工時熬夜——25至35歲OL最常面對三大肌膚危機。一文拆解轉季敏感、暗瘡粉刺同暗沉黃氣，教你點樣揀適合嘅專業護理。",
    image: "../images/post-4.jpg",
    category: "2026 護膚趨勢",
    body: `香港女性25至35歲，往往同時面對職場壓力、不規律作息同極端天氣。轉季時皮膚易敏感泛紅，夏天油脂分泌旺盛爆暗瘡，熬夜後又出現暗沉黃氣——呢啲都係康姿健最常見嘅客人困擾。

**三大肌膚危機，你中咗幾樣？**

1️⃣ **轉季敏感**：冷氣同戶外溫差大，角質層易受損，出現紅腫、痕癢。
2️⃣ **暗瘡粉刺**：濕熱天氣令油脂分泌增加，毛孔堵塞形成黑頭同石頭瘡。
3️⃣ **熬夜暗沉**：25歲後新陳代謝減慢，捱夜令膚色枯黃、痘印難退。

**2026 護膚新思維：量膚定制，唔好再一條配方走天涯**

康姿健引入西班牙 TEGODER 醫學級果酸系列，針對唔同膚質有專屬配方：油性肌用淨化平衡皮脂果酸、敏感肌用玫瑰亮白果酸、暗沉肌用 B3 淨白果酸。美容師會先做皮膚分析，再建議最適合你嘅療程。

**屯門 OL 護膚貼士**
- 洗面水溫唔好超過 38°C，避免洗走天然油脂
- 冷氣房每 2 小時補水噴霧
- 每星期一次專業深層清潔，勝過日日用磨砂

康姿健位於屯門紅橋華利大廈地舖，單次收費、絕無硬銷。歡迎 WhatsApp 9770 9300 預約免費皮膚諮詢。`,
    tags: ["2026護膚", "香港OL", "轉季敏感", "暗瘡護理", "屯門美容"],
  },
  {
    id: 8,
    slug: "2026-tuen-mun-beauty-salon-guide",
    seoTitle: "【2026 屯門美容院點揀？】單次收費無硬銷，量膚定制先係正路",
    topic: "【2026 屯門美容院點揀？】單次收費無硬銷，量膚定制先係正路",
    excerpt:
      "屯門區美容院選擇眾多，點樣揀一間真正適合自己？分享 5 大選擇準則：專業認證、量膚分析、明碼實價、正廠產品、真實口碑。",
    image: "../images/post-8.jpg",
    category: "2026 美容攻略",
    body: `屯門美容市場選擇越來越多，但好多女士分享：「最怕入到美容院就被疲勞轟炸、狂 sell 套票。」2026 年，越來越多香港女性偏向選擇透明、無壓力嘅護理體驗。

**揀屯門美容院 5 大準則**

✅ **專業認證**：美容師有否國際認證？康姿健持有英國 ITEC LV4 國際專業激光美容師資格，並榮獲 IBDR 2025 面部護理金獎。

✅ **量膚定制**：有否先做皮膚分析？唔同膚質需要唔同配方，一條龍療程未必適合你。

✅ **明碼實價**：單次收費、無隱藏收費，先係安心消費。

✅ **正廠正貨**：所用產品是否原廠供應？我哋使用西班牙 TEGODER、Bioskin 等醫學級品牌。

✅ **真實口碑**：可查閱 Instagram、Facebook 客人分享同獎項認證。

**康姿健三大承諾**
❌ 絕無硬銷　❌ 絕無隱藏收費　✅ 只有溫柔專業嘅護理體驗

地址：屯門紅橋菁菱徑9號華利大廈12號（地舖）。WhatsApp 9770 9300 預約。`,
    tags: ["屯門美容院", "2026美容", "單次收費", "無硬銷", "香港美容"],
  },
  {
    id: 9,
    slug: "2026-exosome-antiaging-guide",
    seoTitle: "【2026 外泌體護膚指南】25-40歲初老肌，細胞修復點樣揀療程？",
    topic: "【2026 外泌體護膚指南】25-40歲初老肌，細胞修復點樣揀療程？",
    excerpt:
      "25歲後膠原蛋白每年流失約 1%，30歲後加速。外泌體（Exosome）成為 2026 年再生醫學護膚熱話——點解咁多香港女士轉投細胞級修復？",
    image: "../images/post-1.jpg",
    category: "2026 抗衰老",
    body: `25至40歲係女性肌膚嘅轉捩點：膠原蛋白開始流失、新陳代謝減慢、細紋同色斑逐漸出現。2026 年，外泌體（Exosome）療程成為再生醫學護膚嘅焦點。

**咩係外泌體？**

外泌體係細胞分泌嘅微小囊泡，蘊含生長因子、蛋白質同核酸，能促進細胞修復同再生。被譽為「最強細胞修復因子」，可以滲透肌底，激活細胞更新。

**25-40 歲常見初老徵兆**
- 細紋：眼周、虎紋開始出現
- 鬆弛：輪廓線條變得模糊
- 暗沉：膚色不均、缺乏光澤
- 毛孔：粗大、失去彈性

**康姿健外泌體療程特色**
✨ 深層補水，強化肌膚屏障
✨ 促進膠原蛋白增生，緊緻提升
✨ 提亮膚色，改善色素沉澱
✨ 抗氧化，延緩衰老

除面部外泌體導入，我哋亦提供 BSK9 EXOSOMES 爆髮療程，針對脫髮、髮量稀少問題，由頭皮細胞層面改善。

屯門康姿健，單次收費、ITEC 認證美容師主理。WhatsApp 9770 9300 查詢。`,
    tags: ["外泌體", "2026抗衰老", "初老肌", "細胞修復", "屯門美容"],
  },
  {
    id: 10,
    slug: "2026-pore-acne-hk-guide",
    seoTitle: "【2026 毛孔急救大全】香港濕熱天氣，黑頭粉刺深層清潔方案",
    topic: "【2026 毛孔急救大全】香港濕熱天氣，黑頭粉刺深層清潔方案",
    excerpt:
      "香港全年濕熱，毛孔問題幾乎係都市女性共同煩惱。拆解黑頭、粉刺、粗大毛孔成因，同你分享專業深層清潔同果酸煥膚方案。",
    image: "../images/post-5.jpg",
    category: "2026 毛孔護理",
    body: `香港亞熱帶氣候，濕度長期偏高，加上都市污染同彩妝殘留，毛孔問題成為 25-40 歲女性最常見煩惱之一。

**毛孔問題三大成因**
1. **油脂分泌旺盛**：濕熱天氣刺激皮脂腺，油脂氧化形成黑頭
2. **角質堆積**：卸妝不徹底、清潔不足，老廢角質堵塞毛孔
3. **毛孔彈性下降**：25 歲後膠原流失，毛孔逐漸粗大變橢圓形

**2026 專業毛孔護理方案**

**方案一：深層清潔補濕人手 Facial**
西班牙醫學護膚品牌，由落妝、深層清潔到舒緩按摩，溫和清除毛孔污垢，即時改善膚質觸感。

**方案二：TEGODER 淨化平衡皮脂果酸 30**
30% 複合酸（水楊酸 + 杏仁酸），脂溶性水楊酸可鑽入皮脂底層，深層溶解粉刺黑頭，抗菌抗炎。

**方案三：PLASER 等離子儀**
打開肌膚吸收通道，提升護膚品滲透率 120%，同時殺菌收細毛孔。

**日常護膚貼士（香港版）**
- 夏天選擇清爽質地防曬，避免闷塞毛孔
- 卸妝後再用潔面，確保彩妝完全清除
- 避免用手擠粉刺，以免發炎留疤

康姿健屯門紅橋，單次收費無硬銷。預約 WhatsApp 9770 9300。`,
    tags: ["毛孔護理", "黑頭粉刺", "深層清潔", "香港美容", "屯門"],
  },
];

const sheetPosts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blog-posts.json"), "utf8")
);

const imageMap = {
  1: "../images/post-5.jpg",
  2: "../images/post-1.jpg",
  3: "../images/post-2.jpg",
  4: "../images/post-7.jpg",
  5: "../images/post-6.jpg",
  6: "../images/post-3.jpg",
};

const slugMap = {
  1: "tegoder-custom-peeling",
  2: "salipure-acne-peeling",
  3: "sensi-rose-peeling",
  4: "pmp-antiaging-peeling",
  5: "b3-whitening-peeling",
  6: "liquid-gold-facial-oil",
};

function bodyToHtml(text) {
  return text
    .split(/\n\n+/)
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("#")) {
        const tags = trimmed.match(/#[\w\u4e00-\u9fff]+/g) || [];
        return `<div class="blog-tags">${tags.map((t) => `<span class="blog-tag">${t}</span>`).join("")}</div>`;
      }
      return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}

function excerptFromBody(body, len = 120) {
  const clean = body.replace(/#[\w\u4e00-\u9fff]+/g, "").replace(/\s+/g, " ").trim();
  return clean.length > len ? clean.slice(0, len) + "…" : clean;
}

function seoHead({ title, description, image, url, type = "article" }) {
  const img = image || "../images/post-1.jpg";
  return `  <meta name="description" content="${description}">
  <meta name="keywords" content="屯門美容,康姿健,2026護膚,香港美容,${SITE.area}">
  <meta name="geo.region" content="HK">
  <meta name="geo.placename" content="屯門">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${img}">
  <meta property="og:locale" content="zh_HK">
  <meta name="twitter:card" content="summary_large_image">`;
}

function localBusinessJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    alternateName: "康姿健 HONG CHI KIN",
    image: "../images/profile.jpg",
    telephone: "+85297709300",
    address: {
      "@type": "PostalAddress",
      streetAddress: "紅橋菁菱徑9號華利大廈12號",
      addressLocality: "屯門",
      addressRegion: "新界",
      addressCountry: "HK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.391,
      longitude: 113.977,
    },
    areaServed: { "@type": "City", name: "香港" },
    priceRange: "$$",
    sameAs: [SITE.instagram, SITE.facebook, SITE.xiaohongshu],
  });
}

function blogPostJsonLd(post) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.topic,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: "../images/profile.jpg" },
    },
    datePublished: "2026-01-01",
    dateModified: "2026-06-15",
    inLanguage: "zh-HK",
    keywords: (post.tags || []).join(", "),
    about: { "@type": "Thing", name: "香港女性護膚" },
  });
}

function header(active) {
  const nav = [
    ["index.html", "首頁"],
    ["about.html", "關於我們"],
    ["services.html", "療程服務"],
    ["blog.html", "護膚知識"],
    ["gallery.html", "作品分享"],
    ["contact.html", "聯絡我們"],
  ];
  const prefix = active.startsWith("blog/") ? "../" : active === "blog.html" ? "" : "";
  return `<div class="top-bar">
    <span class="top-bar-tagline">Your Skin is Your Best Accessory · 屯門量膚定制美容</span>
    <div class="top-bar-social">
      <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
      <a href="${SITE.xiaohongshu}" target="_blank" rel="noopener" aria-label="小紅書">小紅書</a>
      <a href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a>
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
        ${nav
          .map(([href, label]) => {
            const full = prefix + href;
            const isActive =
              active === href ||
              (active === "blog.html" && href === "blog.html") ||
              (active.startsWith("blog/") && href === "blog.html");
            return `<li><a href="${full}"${isActive ? ' class="active"' : ""}>${label}</a></li>`;
          })
          .join("\n        ")}
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
          <li><a href="${prefix}blog.html">護膚知識</a></li>
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
      <p>© 2026 康姿健 HONG CHI KIN 版權所有 · 香港屯門美容</p>
    </div>
  </footer>
  <a href="${SITE.whatsapp}" class="float-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp 預約">💬</a>`;
}

function articlePage(post) {
  const slug = post.slug || slugMap[post.id];
  const excerpt = post.excerpt || excerptFromBody(post.body);
  const seoTitle = post.seoTitle || post.topic;
  const htmlBody = post.body.includes("**")
    ? post.body
        .split(/\n\n+/)
        .map((p) => {
          if (p.startsWith("**") && p.endsWith("**")) return `<h2>${p.slice(2, -2)}</h2>`;
          if (p.match(/^\d️⃣|^[✅❌✨🌟]/)) return `<p>${p.replace(/\n/g, "<br>")}</p>`;
          return `<p>${p.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")}</p>`;
        })
        .join("\n")
    : bodyToHtml(post.body);

  return `<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seoTitle}｜康姿健屯門美容</title>
${seoHead({ title: seoTitle, description: excerpt, image: post.image })}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">${blogPostJsonLd({ ...post, excerpt })}</script>
  <script type="application/ld+json">${localBusinessJsonLd()}</script>
</head>
<body>
${header("blog/" + slug + ".html")}
  <article class="blog-article">
    <div class="blog-article-hero">
      <img src="${post.image}" alt="${post.topic}">
      <div class="blog-article-overlay">
        <span class="blog-card-category">${post.category || "2026 護膚知識"}</span>
        <h1>${post.topic}</h1>
      </div>
    </div>
    <div class="blog-article-body content-block">
      <p class="blog-meta">2026 護膚知識 · 適合香港 25-40 歲女性 · 屯門康姿健</p>
      ${htmlBody}
      <div class="blog-cta">
        <p>想了解自己適合邊款療程？歡迎預約免費皮膚諮詢。</p>
        <a href="${SITE.whatsapp}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp 預約 ${SITE.phone}</a>
        <a href="../blog.html" class="btn btn-primary" style="margin-left:0.75rem">返回護膚知識</a>
      </div>
    </div>
  </article>
${footer("../")}
  <script src="../js/main.js"></script>
</body>
</html>`;
}

// Build sheet posts
const allPosts = [
  ...sheetPosts.map((p) => ({
    ...p,
    slug: slugMap[p.id],
    image: imageMap[p.id],
    excerpt: excerptFromBody(p.body),
    category: "TEGODER 果酸",
    tags: (p.body.match(/#[\w\u4e00-\u9fff]+/g) || []).map((t) => t.slice(1)),
  })),
  ...extraPosts,
];

const blogDir = path.join(__dirname, "../blog");
fs.mkdirSync(blogDir, { recursive: true });

allPosts.forEach((post) => {
  const slug = post.slug || slugMap[post.id];
  fs.writeFileSync(path.join(blogDir, slug + ".html"), articlePage(post));
});

// Blog index cards
const cards = allPosts
  .map((post) => {
    const slug = post.slug || slugMap[post.id];
    const img = post.image.replace("../", "");
    const cat = post.category || "2026 護膚知識";
    const shortTitle = (post.seoTitle || post.topic).replace(/【[^】]+】/, "").trim();
    return `      <article class="blog-card">
        <a href="blog/${slug}.html" class="blog-card-link">
          <div class="blog-card-image">
            <img src="${img}" alt="${post.topic}" loading="lazy">
            <div class="blog-card-banner">
              <span>${cat}</span>
            </div>
          </div>
          <div class="blog-card-body">
            <h2>【2026】${shortTitle.slice(0, 60)}${shortTitle.length > 60 ? "…" : ""}</h2>
            <p>${post.excerpt}</p>
            <span class="read-more">閱讀更多 &gt;</span>
          </div>
        </a>
      </article>`;
  })
  .join("\n");

const blogIndex = `<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 護膚知識博客｜康姿健屯門美容 — 香港女性護膚攻略</title>
${seoHead({
  title: "2026 護膚知識博客｜康姿健屯門美容",
  description: "2026年最新護膚知識分享，專為香港25-40歲女性而設。果酸煥膚、外泌體、毛孔護理、抗衰老攻略。屯門康姿健美容博客。",
  image: "images/post-1.jpg",
  type: "website",
})}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script type="application/ld+json">${localBusinessJsonLd()}</script>
</head>
<body>
${header("blog.html")}
  <header class="blog-hero">
    <h1>護膚知識</h1>
    <p>2026 年最新美容趨勢 · 專為香港 25-40 歲女性</p>
  </header>

  <section class="section blog-section">
    <p class="section-subtitle" style="margin-top:-1rem">屯門康姿健專業分享 — 量膚定制、果酸煥膚、外泌體、毛孔護理</p>
    <div class="blog-grid">
${cards}
    </div>
  </section>
${footer("")}
  <script src="js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "../blog.html"), blogIndex);

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>index.html</loc><priority>1.0</priority></url>
  <url><loc>about.html</loc><priority>0.8</priority></url>
  <url><loc>services.html</loc><priority>0.9</priority></url>
  <url><loc>blog.html</loc><priority>0.9</priority></url>
  <url><loc>gallery.html</loc><priority>0.7</priority></url>
  <url><loc>contact.html</loc><priority>0.8</priority></url>
${allPosts.map((p) => `  <url><loc>blog/${p.slug || slugMap[p.id]}.html</loc><priority>0.7</priority></url>`).join("\n")}
</urlset>`;
fs.writeFileSync(path.join(__dirname, "../sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(__dirname, "../robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: sitemap.xml\n"
);

console.log("Built", allPosts.length, "blog posts + blog.html + sitemap.xml");
