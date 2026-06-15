/**
 * 康姿健屯門美容 — 全站互動
 */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "";
      const phone = document.getElementById("phone")?.value || "";
      const interest = document.getElementById("interest")?.selectedOptions[0]?.text || "";
      const message = document.getElementById("message")?.value || "";
      const text = encodeURIComponent(
        `你好，我想預約查詢：\n姓名：${name}\n電話：${phone}\n療程：${interest}\n留言：${message}`
      );
      window.open(`https://wa.me/85297709300?text=${text}`, "_blank");
      contactForm.reset();
    });
  }
});
