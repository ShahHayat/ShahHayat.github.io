# Shah Makhdoom Hayat — Web Resume & Portfolio

A modern, high-performance, dark-theme interactive web resume built with HTML5, CSS custom properties, glassmorphism, and vanilla JavaScript. Designed specifically for hosting on **GitHub Pages** (`ShahHayat.github.io`).

Live Preview: [shahhayat.github.io](https://shahhayat.github.io)

---

## Features
- **Dark Modern Tech Aesthetic**: OLED black background with ambient cyber grid, glowing cyan/indigo indicators, and glassmorphism cards.
- **Interactive Experience Timeline**: Detailed engineering highlights across **Onsurity**, **Flipkart**, and **LTIMindtree**.
- **Real-time Keyword Search**: Dynamic search bar to filter work achievements by technology (e.g. AWS, Redis, InfluxDB, ELK, Migration).
- **Skill Matrix & Filtering**: Filterable tech stack matrix (Backend, Databases, Tools/Cloud).
- **Theme Toggle**: Light / Dark mode toggle with persistent `localStorage` preference.
- **Print & PDF Export Optimized**: Pre-styled `@media print` layout for generating clean 1-2 page PDF resumes.
- **Responsive Layout**: Optimized for mobile, tablet, and desktop viewports.

---

## 🚀 How to Host on GitHub Pages (`ShahHayat.github.io`)

### Step 1: Open Terminal in this Project Folder
```bash
cd /Users/shah/.gemini/antigravity/scratch/ShahHayat.github.io
```

### Step 2: Initialize Git & Connect your GitHub Repo
If you haven't initialized git yet:
```bash
git init
git add .
git commit -m "Initial commit: Dark modern tech interactive web resume"
```

Set the main branch and add your repository remote:
```bash
git branch -M main
git remote add origin https://github.com/ShahHayat/ShahHayat.github.io.git
```

### Step 3: Push to GitHub
```bash
git push -u origin main
```

---

## ⚡ Enabling GitHub Pages in GitHub Settings

1. Go to your repository on GitHub: **`https://github.com/ShahHayat/ShahHayat.github.io`**
2. Click **Settings** (top navigation tab of your repository).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` and folder `/ (root)`
   - Click **Save**.
5. Wait 1–2 minutes! Your live site will automatically be published at:
   👉 **`https://shahhayat.github.io`**

---

## 📁 Repository File Structure
```
.
├── index.html       # Main HTML5 layout & resume content
├── styles.css       # Dark Modern Tech styling & print stylesheet
├── app.js           # Interactivity (search, filters, theme toggle, copy toast)
└── README.md        # Deployment instructions & documentation
```
