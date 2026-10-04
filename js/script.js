// 手機導覽選單；連結仍使用瀏覽器原生錨點行為。
(() => {
  const nav = document.querySelector("nav");
  const button = nav ? nav.querySelector(".menu-toggle") : null;
  const menu = document.getElementById("nav-links");
  if (!nav || !button || !menu) return;

  const desktop = window.matchMedia("(min-width: 48rem)");
  const header = nav.closest("header");

  function updateHeaderHeight() {
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height", `${header.getBoundingClientRect().height}px`,
      );
    }
  }

  function setMenuOpen(open) {
    const isOpen = open && !desktop.matches;
    nav.classList.toggle("menu-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "關閉導覽選單" : "開啟導覽選單");
    // 在原生錨點跳轉前，同步選單收合後的 Header 高度。
    updateHeaderHeight();
  }

  button.addEventListener("click", () => {
    setMenuOpen(button.getAttribute("aria-expanded") !== "true");
  });

  // 只註冊一次；Header 內的點擊交由按鈕與導覽連結原有邏輯處理。
  document.addEventListener("click", (event) => {
    if (desktop.matches || button.getAttribute("aria-expanded") !== "true") return;
    if ((header || nav).contains(event.target)) return;

    // 只有焦點仍在即將隱藏的清單中時才移回按鈕。
    if (menu.contains(document.activeElement)) button.focus();
    setMenuOpen(false);
  });

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (!desktop.matches) {
        // 避免焦點留在即將隱藏的連結內，不阻止原生 hash 跳轉。
        if (menu.contains(document.activeElement)) button.focus();
        setMenuOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      button.focus();
    }
  });

  desktop.addEventListener("change", () => {
    setMenuOpen(false);
    if (desktop.matches && document.activeElement === button) {
      nav.querySelector('a[href="#home"]').focus();
    } else if (!desktop.matches && menu.contains(document.activeElement)) {
      button.focus();
    }
  });

  setMenuOpen(false);
  button.hidden = false;
  nav.classList.add("menu-enabled");
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  if ("ResizeObserver" in window && header) {
    const headerObserver = new ResizeObserver(updateHeaderHeight);
    headerObserver.observe(header);
  }
})();

// Scroll Spy 只更新導覽狀態；錨點、網址與瀏覽紀錄由瀏覽器處理。
(() => {
  const sectionIds = [
    "home", "about", "skills", "certifications",
    "projects", "experience", "contact",
  ];
  const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section) => section && links.some(
      (link) => link.getAttribute("href") === `#${section.id}`,
    ));

  if (sections.length === 0) return;

  function setCurrentSection(id) {
    links.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // 初始載入與不支援 Observer 時，使用有效 hash；否則顯示首頁。
  function updateFromHash() {
    const section = sections.find((item) => `#${item.id}` === location.hash);
    setCurrentSection(section ? section.id : sections[0].id);
  }

  updateFromHash();
  if (!("IntersectionObserver" in window)) {
    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("pageshow", updateFromHash);
    return;
  }

  const footer = document.querySelector("footer");
  const header = document.querySelector("header");
  const contactSection = sections.find((section) => section.id === "contact");

  // 閱讀線至少在 sticky Header 下方，並保留視窗四分之一的判斷方式。
  function getReadingLine() {
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.min(window.innerHeight - 1,
      Math.max(window.innerHeight * 0.25, headerHeight + 16));
  }

  function updateFromPosition() {
    const readingLine = getReadingLine();
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= readingLine) current = section;
    });

    // Footer 進入視窗就選取聯絡方式，不等待最後幾個像素再次觸發回呼。
    const footerRect = footer ? footer.getBoundingClientRect() : null;
    const footerVisible = footerRect && footerRect.top < window.innerHeight &&
      footerRect.bottom > 0;
    const atBottom = window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (contactSection && (footerVisible || atBottom)) current = contactSection;
    setCurrentSection(current.id);
  }

  let sectionObserver;
  function observeSections() {
    if (sectionObserver) sectionObserver.disconnect();
    const topMargin = Math.floor(getReadingLine());
    const bottomMargin = Math.max(0, window.innerHeight - topMargin - 1);
    sectionObserver = new IntersectionObserver(updateFromPosition, {
      rootMargin: `-${topMargin}px 0px -${bottomMargin}px 0px`,
      threshold: 0,
    });
    sections.forEach((section) => sectionObserver.observe(section));
    updateFromPosition();
  }

  // Footer 進入或離開視窗時更新，無需等到 intersectionRatio 達到 1。
  if (footer) {
    const footerObserver = new IntersectionObserver(updateFromPosition, {
      threshold: 0,
    });
    footerObserver.observe(footer);
  }

  observeSections();
  if ("ResizeObserver" in window && header) {
    const readingLineObserver = new ResizeObserver(observeSections);
    readingLineObserver.observe(header);
  }
  window.addEventListener("resize", observeSections);
  window.addEventListener("hashchange", () => {
    updateFromHash();
    requestAnimationFrame(updateFromPosition);
  });
  window.addEventListener("load", updateFromPosition);
  window.addEventListener("pageshow", updateFromPosition);
})();
