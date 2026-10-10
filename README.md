# 范祐綸｜個人作品集

## 專案簡介

這是范祐綸的個人 Portfolio，以純 HTML、CSS 與 JavaScript 製作，呈現就讀致理科技大學期間的資訊技術學習、證照認證與課程專題成果。

專案從 Git 與網頁基礎練習逐步發展而來，主要學習方向為網路技術、資料庫與前端開發。網站可直接在瀏覽器開啟，不需要安裝套件或執行建置指令。本文件目前未列出 Portfolio 正式部署網址。

## 目前網站功能與已完成項目

- 單頁式內容：首頁介紹、關於我、技能、證照／認證、作品集、學習／經歷與聯絡方式。
- 六組分類技能卡片與依機構分類的 14 張證照／認證。
- 證照／認證依發證機構展開／收合，使用原生 details／summary，支援鍵盤操作。
- 14 張證照皆可查看證書圖片，共用唯一的原生 dialog；支援關閉按鈕、Escape、點擊 backdrop 關閉，關閉後焦點回到查看按鈕。點擊圖片或 dialog 內容不會誤關閉。
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
- 原生 JavaScript：手機選單、Scroll Spy、Header 高度同步與共用證書查看器。
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
│   └── script.js    # 手機選單、Scroll Spy、Header 高度同步與證書查看器
├── assets/
│   └── certificates/ # 14 張真實證書 JPG 圖片
└── README.md        # 專案介紹與使用說明
```

### 檔案責任與整理原則

- `index.html`：真實個人資料、各區塊內容、SEO／Open Graph、證照分類、查看按鈕與唯一共用 dialog。以區塊註解標示維護位置。
- `css/style.css`：設計變數、視覺版面、鍵盤焦點、RWD 與 reduced-motion。使用 01～13 功能分類；保留既有規則順序與 cascade，不為編號排序移動規則。
- `js/script.js`：01 手機選單與 Header 高度、02 Scroll Spy、03 共用證書 Dialog。三個模組各自封裝；修改其中一項時也要檢查原生 hash 與鍵盤操作。
- `assets/certificates/`：目前 14 張真實證書圖片；檔名大小寫須與 HTML 路徑完全一致。
- `README.md`：功能、檔案責任、內容更新方式、測試與部署狀態的維護說明。

## 本機開啟方式

1. 從 GitHub 下載專案，或使用 Git 複製儲存庫：

   ```sh
   git clone https://github.com/maxmaxcool666-png/codex-learning.git
   ```

2. 開啟 `codex-learning` 資料夾，以瀏覽器直接開啟 `index.html`。
3. 保持 `index.html`、`css/`、`js/` 與 `assets/` 的相對位置，讓樣式、程式與證書圖片正確載入。

不需要 npm install 或 build。建議使用支援上述瀏覽器 API 的現代瀏覽器。若不支援 IntersectionObserver，導覽狀態改依 hash 更新；停用 JavaScript 時仍可使用展開的原生導覽連結。

## 證書圖片查看器

14 張證書圖片存放於 `assets/certificates/`。每張證照的「查看證書」按鈕以 `data-certificate-title`、`data-certificate-src`、`data-certificate-alt` 提供完整名稱、圖片相對路徑與替代文字。

JavaScript 讀取按鈕資料，更新唯一共用 dialog 的標題與圖片，再呼叫 `showModal()`。圖片保留原始比例，dialog 內容可在手機或較小視窗內捲動。

關閉按鈕使用 `close()`，Escape 保留瀏覽器原生行為；點擊起點與終點都位於 dialog 外的 backdrop 時才關閉。關閉後保留原生焦點恢復，必要時將焦點補回原本的查看按鈕。

初始圖片使用已存在的 Databases 證書與正確 alt，並設定 `loading="lazy"`；開啟時仍依所選按鈕更新資料，不使用假圖片或空來源。查看器需要 JavaScript 與支援原生 dialog 的瀏覽器。

## 內容維護流程

### 新增／更新證照與圖片

1. 先確認證照名稱、發證單位與日期，準備真實圖片並確認其中資訊適合公開。沒有圖片時不要建立假路徑或查看按鈕。
2. 將圖片放在 `assets/certificates/`，使用清楚的檔名，保留圖片比例與文字可讀性。
3. 在 `#certifications` 的正確機構分類中新增或更新 `article`，沿用 `h4`、發證單位與日期段落；TOEIC 使用「測驗日期」。新增項目時同步調整 summary 的數量與 README 的總數。
4. 沿用 `class="certificate-view"`、`type="button"`、`aria-haspopup="dialog"`、`aria-controls="certificate-dialog"`，並設定下表的三個資料屬性。
5. 既有通用 selector 會處理所有 `button[data-certificate-src]`；不新增 dialog，也不複製每張證書的 JavaScript。
6. 改名或替換圖片時，檢查所有引用；若更新初始 Databases 圖片，也要同步共用 dialog 的初始 src／alt。

| 資料屬性 | 用途 | 現有 Databases 範例 |
|---|---|---|
| `data-certificate-title` | 完整證照名稱／dialog 標題 | `Information Technology Specialist - Databases` |
| `data-certificate-src` | 相對於 index.html 的圖片路徑 | `assets/certificates/its-databases.jpg` |
| `data-certificate-alt` | 完整證照名稱加「證書」 | `Information Technology Specialist - Databases 證書` |

### 新增作品

1. 在 `#projects` 內沿用現有 `article` 結構，提供真實名稱、類型、說明、實際使用技術與狀態。
2. 沿用 `project-type`、`project-description`、`project-tags`、`project-status` 等 class，保持目前卡片樣式。
3. 只有確實存在公開網址時才加入連結；新分頁連結保留 `target="_blank"` 與 `rel="noopener noreferrer"`。沒有網址時使用一般狀態文字，不使用 `href="#"`。
4. 維持 `#projects` 與 `projects-title`，不要因新增卡片修改導覽或 Scroll Spy 的區塊設定；相關 README 說明同步更新。

## 本機測試流程

1. 直接以現代瀏覽器開啟 `index.html`，確認樣式、JavaScript 與圖片載入，Console 沒有錯誤。
2. 檢查 320px、375px、768px、1024px 與較寬桌面：沒有水平捲軸，手機卡片單欄、768px 起證照／作品兩欄、1024px 起技能三欄。
3. 檢查 sticky Header、手機選單開關、Header 外點擊、Escape、點連結後收合，以及手機／桌面切換。
4. 點每個內部錨點，確認 hash 更新、標題不被 Header 遮住；捲動與到頁底時確認 active／aria-current，並測試上一頁／下一頁。
5. 展開五個證照分類，逐張檢查 14 個查看按鈕的標題與圖片；測試關閉按鈕、Escape、backdrop、圖片／內容不誤關閉與焦點回到觸發按鈕。
6. 使用 Tab／Shift+Tab 與 Enter／空白鍵檢查 skip link、summary、導覽與 dialog。啟用系統減少動態效果後確認 smooth scroll 與卡片位移停用。
7. 確認外部作品與聯絡連結，再執行下節的 Git 差異與 JavaScript 語法檢查。

## Git／GitHub 使用說明

Git 用來記錄每個開發階段，GitHub 用來保存與分享原始碼。修改後先以 `git diff` 檢視內容、`git diff --check` 檢查格式，再由開發者確認暫存檔案、建立 commit 並 push。`git status` 可確認是否還有未提交變更。

### 提交前的唯讀檢查

依序執行以下指令；這些指令不會暫存、提交或推送修改：

```sh
git status
git diff --check
node --check js/script.js
git diff --stat
git diff -- index.html css/style.css js/script.js README.md
git ls-files --others --exclude-standard assets/certificates/
git ls-files assets/certificates/
```

`node --check` 只檢查語法，不能取代瀏覽器功能測試。未追蹤圖片不會出現在一般 `git diff` 中，需額外檢查清單；確認所有變更與圖片都在本輪範圍內後，再由維護者決定 add／commit／push。

## GitHub Pages 部署狀態

本 Portfolio 尚未確認正式部署，README 不列出未確認的 Demo 或 Portfolio 正式網址。期中／期末課程作品的公開網址不代表本 Portfolio 已上線。

網站使用相對資源路徑，可規劃以 `main` branch 的 repository root 作為 GitHub Pages 發布來源；這是部署規劃，不表示 GitHub 設定或部署已完成。部署後需再確認正式網址、CSS／JS／14 張圖片載入與所有互動，取得正式 URL 後才補上 `og:url`；沒有真實分享素材時不填假的 `og:image`。

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
