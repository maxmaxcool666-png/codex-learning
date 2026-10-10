// 01. 手機選單與 Header 高度：保留原生錨點與瀏覽紀錄。
(() => {
  const nav = document.querySelector("nav");
  const button = nav ? nav.querySelector(".menu-toggle") : null;
  const menu = document.getElementById("nav-links");
  if (!nav || !button || !menu) return;

  const desktop = window.matchMedia("(min-width: 48rem)");
  const header = nav.closest("header");

  // 實際高度寫入 CSS 變數，讓 sticky Header 與錨點間距一致。
  function updateHeaderHeight() {
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height", `${header.getBoundingClientRect().height}px`,
      );
    }
  }

  // 集中同步 class、ARIA 與高度；桌面模式不保留展開狀態。
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

  // outside click 只註冊一次；Header 內的點擊交由原有按鈕與連結處理。
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

  // Escape 收合手機選單並恢復焦點，不攔截其他原生鍵盤行為。
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      button.focus();
    }
  });

  // 切換導覽模式時清除 open 狀態，避免焦點留在被隱藏的元素。
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
    // Header 換行或選單展開也可能改變高度，不只監聽視窗 resize。
    const headerObserver = new ResizeObserver(updateHeaderHeight);
    headerObserver.observe(header);
  }
})();

// 02. Scroll Spy：只更新導覽狀態，錨點、網址與瀏覽紀錄由瀏覽器處理。
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

  // 同步 active 與 aria-current，確保只有目前區塊的連結被標示。
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

  // 以區塊頂端相對閱讀線的位置判定；頁尾優先規則處理 contact。
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
  // 建立 1px 閱讀帶；尺寸改變時先解除舊 Observer，避免重複觀察。
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
    // Header 高度改變時重建閱讀帶，使判定位置仍在 Header 下方。
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

// 03. 共用證書 Dialog：新增證書只需在按鈕提供 data-certificate-* 資料。
(() => {
  const dialog = document.getElementById("certificate-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const title = dialog.querySelector("#certificate-dialog-title");
  const image = dialog.querySelector(".certificate-image");
  const closeButton = dialog.querySelector(".certificate-close");
  if (!title || !image || !closeButton) return;

  let trigger = null;
  let pointerStartedOutside = false;

  // 每次開啟先更新標題、src 與 alt，再由 showModal 管理模態焦點。
  document.querySelectorAll("button[data-certificate-src]").forEach((button) => {
    button.addEventListener("click", () => {
      if (dialog.open) return;
      const data = button.dataset;
      if (!data.certificateTitle || !data.certificateSrc || !data.certificateAlt) return;

      trigger = button;
      title.textContent = data.certificateTitle;
      image.src = data.certificateSrc;
      image.alt = data.certificateAlt;
      dialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  // 不攔截 Escape / cancel，保留瀏覽器原生 Dialog 關閉與焦點管理。
  // 原生焦點恢復若未回到觸發按鈕才補回，避免關閉時額外捲動。
  dialog.addEventListener("close", () => {
    pointerStartedOutside = false;
    if (trigger && trigger.isConnected && document.activeElement !== trigger) {
      trigger.focus({ preventScroll: true });
    }
    trigger = null;
  });

  // backdrop 事件目標也會是 dialog；再比對邊界排除內部留白與圖片。
  function isBackdropClick(event) {
    if (event.target !== dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }

  // 起點與終點都在 Dialog 外才關閉，避免從圖片拖曳到外面造成誤關閉。
  dialog.addEventListener("pointerdown", (event) => {
    pointerStartedOutside = isBackdropClick(event);
  });
  dialog.addEventListener("pointercancel", () => {
    pointerStartedOutside = false;
  });
  dialog.addEventListener("click", (event) => {
    if (pointerStartedOutside && isBackdropClick(event)) dialog.close();
    pointerStartedOutside = false;
  });
})();
