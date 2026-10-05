# 范祐綸｜個人作品集

## 專案簡介

這是范祐綸的個人 Portfolio，以純 HTML、CSS 與 JavaScript 製作，呈現就讀致理科技大學期間的資訊技術學習、證照認證與課程專題成果。

專案從 Git 與網頁基礎練習逐步發展而來，主要學習方向為網路技術、資料庫與前端開發。網站可直接在瀏覽器開啟，不需要安裝套件或執行建置指令。本文件目前未列出 Portfolio 正式部署網址。

## 目前網站功能與已完成項目

- 單頁式內容：首頁介紹、關於我、技能、證照／認證、作品集、學習／經歷與聯絡方式。
- 六組分類技能卡片與依機構分類的 14 張證照／認證。
- 證照／認證依發證機構展開／收合，使用原生 details／summary，支援鍵盤操作。
- 兩個已公開上線的綠遊智行課程作品，分別呈現期中靜態網站與期末 Joomla CMS 網站。
- RWD：手機卡片單欄，768px 起技能、證照與作品兩欄，1024px 起技能三欄。
- Sticky Header：捲動時仍可使用導覽，錨點間距依 Header 高度同步。
- 手機收合選單：按鈕開關、Escape 關閉、點導覽連結及 Header 外區域自動收合；768px 起維持完整水平導覽。
- Scroll Spy：透過 IntersectionObserver 更新 active 與 aria-current，包含頁尾聯絡區塊的處理。
- 原生錨點與網址 hash 導覽，保留瀏覽器上一頁／下一頁操作。
- 無障礙基礎：跳到主要內容、鍵盤焦點樣式、選單 ARIA 狀態與 prefers-reduced-motion。
- SEO description 與基本 Open Graph 分享資訊。
- Email 與 GitHub 聯絡連結；外部新分頁連結加入安全的 rel 屬性。

## 使用技術

- HTML5：語意化內容結構與無障礙標記。
- CSS：設計變數、Grid、Flexbox、響應式版面與減少動態效果支援。
- 原生 JavaScript：手機選單、Scroll Spy、Header 高度同步。
- IntersectionObserver、ResizeObserver 與 matchMedia：觀察區塊、尺寸與導覽模式。
- Git／GitHub：版本控制、保存開發紀錄與同步原始碼。

網站不使用框架、npm、CDN、後端或資料庫。Codex 是開發與學習時使用的輔助工具，不是執行網站的必要依賴。

## 專案結構

```text
codex-learning/
├── index.html       # 網站內容、導覽與 SEO／Open Graph 資訊
├── css/
│   └── style.css    # 視覺樣式、RWD 與無障礙樣式
├── js/
│   └── script.js    # 手機選單、Scroll Spy 與 Header 高度同步
└── README.md        # 專案介紹與使用說明
```

## 本機開啟方式

1. 從 GitHub 下載專案，或使用 Git 複製儲存庫：

   ```sh
   git clone https://github.com/maxmaxcool666-png/codex-learning.git
   ```

2. 開啟 `codex-learning` 資料夾，以瀏覽器直接開啟 `index.html`。
3. 保持 `index.html`、`css/` 與 `js/` 的相對位置，讓樣式與程式正確載入。

不需要 npm install 或 build。建議使用支援上述瀏覽器 API 的現代瀏覽器。若不支援 IntersectionObserver，導覽狀態改依 hash 更新；停用 JavaScript 時仍可使用展開的原生導覽連結。

## Git／GitHub 使用說明

Git 用來記錄每個開發階段，GitHub 用來保存與分享原始碼。修改後先以 `git diff` 檢視內容、`git diff --check` 檢查格式，再由開發者確認暫存檔案、建立 commit 並 push。`git status` 可確認是否還有未提交變更。

## 相關課程作品

### 綠遊智行－低碳智慧出行網站（期中專題）

網站設計與管理課程專題，使用 HTML、CSS 製作，介紹低碳旅遊與永續出行概念，已透過 GitHub Pages 公開部署。

[查看期中網站](https://maxmaxcool666-png.github.io/HW1/)

### 綠遊智行－低碳智慧出行網站（期末延伸專題）

網站設計與管理課程期末專題，延伸期中主題，使用 XAMPP 建立本機伺服器環境並架設 Joomla，練習 CMS 內容編輯、網站管理與系統環境設定，現已公開上線。

[查看期末網站](https://greentravel.rf.gd/)

上述作品皆為課程專題，不是正式商業平台或營運產品。上述課程作品網址皆不是本 Portfolio 的正式網址。

## 後續可擴充項目

以下為規劃項目，尚未實作：

- Dark Mode 與系統主題偏好支援。
- 確認 Portfolio 正式部署網址後補上 og:url。
- 有合適的真實素材後加入作品截圖與 Open Graph 分享圖片。
- 持續補充真實學習成果與專案內容。
- 持續進行跨瀏覽器、手機尺寸、鍵盤與無障礙驗證。

## 作者資訊

- 作者：范祐綸
- 學校：致理科技大學
- 學習方向：網路技術、資料庫與前端開發
- GitHub：[maxmaxcool666-png](https://github.com/maxmaxcool666-png)
- Email：[maxmaxcool666@gmail.com](mailto:maxmaxcool666@gmail.com)
