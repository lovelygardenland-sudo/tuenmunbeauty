/**
 * 更新全站頁面 header/footer — 執行: node js/update-pages.js
 */
const fs = require("fs");
const path = require("path");

const SITE = {
  facebook: "https://www.facebook.com/p/%E5%BA%B7%E5%A7%BF%E5%81%A5%E7%90%86%E7%99%82-100066932628186/",
  instagram: "https://www.instagram.com/hong_chi_kin/",
  xiaohongshu: "https://xhslink.com/m/2Pn14z6LTRr",
  whatsapp: "https://wa.me/85297709300",
  phone: "9770 9300",
  address: "屯門紅橋菁菱徑9號華利大廈12號（地舖）",
};

function header(active) {
  const nav = [
    ["index.html", "首頁"],
    ["about.html", "關於我們"],
    ["services.html", "療程服務"],
    ["blog.html", "護膚知識"],
    ["gallery.html", "作品分享"],
    ["contact.html", "聯絡我們"],
  ];
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
      <a href="index.html" class="logo">
        <img src="images/profile.jpg" alt="康姿健">
        康姿健<span>屯門美容</span>
      </a>
      <button class="nav-toggle" aria-label="開啟選單">☰</button>
      <ul class="nav-menu">
        ${nav.map(([href, label]) => `<li><a href="${href}"${active === href ? ' class="active"' : ""}>${label}</a></li>`).join("\n        ")}
      </ul>
    </nav>
  </header>`;
}

function footer() {
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
          <li><a href="about.html">關於我們</a></li>
          <li><a href="services.html">療程服務</a></li>
          <li><a href="blog.html">護膚知識</a></li>
          <li><a href="contact.html">聯絡我們</a></li>
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

const seoExtra = `
  <meta name="geo.region" content="HK">
  <meta name="geo.placename" content="屯門">
  <meta property="og:locale" content="zh_HK">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"康姿健屯門美容","telephone":"+85297709300","address":{"@type":"PostalAddress","streetAddress":"紅橋菁菱徑9號華利大廈12號","addressLocality":"屯門","addressRegion":"新界","addressCountry":"HK"},"areaServed":"香港","sameAs":["${SITE.instagram}","${SITE.facebook}","${SITE.xiaohongshu}"]}</script>`;

const pages = ["index.html", "about.html", "services.html", "gallery.html", "contact.html"];

pages.forEach((file) => {
  const fp = path.join(__dirname, "..", file);
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(/<html lang="[^"]*">/, '<html lang="zh-Hant-HK">');
  if (!html.includes("geo.region")) {
    html = html.replace("</title>", `</title>${seoExtra}`);
  }
  html = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, header(file).split("\n").slice(1).join("\n").replace(/^  /, ""));
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer());
  if (!html.includes("float-whatsapp")) {
    html = html.replace("</body>", `  <a href="${SITE.whatsapp}" class="float-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp 預約">💬</a>\n</body>`);
  }
  fs.writeFileSync(fp, html);
});

console.log("Updated", pages.length, "pages");
