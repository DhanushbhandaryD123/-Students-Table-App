# 🎓 Students Table App

Project Details

The Students Table App is a frontend React application that manages student records with full CRUD functionality. The application allows users to add, view, edit, and delete student information directly on the client side using in-memory state without requiring a backend.

The interface displays student data including name, email, and age in a structured table. Users can add new students through a form with validation to ensure that all fields are required and the email format is correct. When editing a student, the form is automatically pre-filled with existing data to make updates easier.

The application also includes features such as search, filtering by age range, sorting, and pagination to efficiently manage larger datasets. A confirmation dialog is shown before deleting a record to prevent accidental removal.

To improve the user experience, a simulated loading state is displayed when data is being processed. Additionally, users can export student data as a CSV file that can be opened in Excel, either for the filtered results or the full dataset.

The project demonstrates practical frontend development skills including state management, form validation, dynamic table rendering, and client-side data processing. The application is deployed online using Vercel or Netlify.

## ✨ Features

- ✅ View all students in a sortable, paginated table
- ✅ Add student with form validation
- ✅ Edit student with pre-filled data
- ✅ Delete student with confirmation dialog
- ✅ Search by name or email
- ✅ Filter by age range (clickable stat cards)
- ✅ Simulated loading skeleton
- ✅ Export filtered data to CSV (Excel-compatible)
- ✅ Fully in-memory — no backend required

---

## 🚀 Getting Started (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 🌐 Deploy to Vercel (Recommended)

### Option A — Via Vercel Dashboard (Easiest)
1. Push this repo to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** — done! 🎉

### Option B — Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🌐 Deploy to Netlify

### Option A — Via Netlify Dashboard
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy** 🎉

### Option B — Via Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 📤 Upload to GitHub

```bash
# 1. Initialize git (inside project folder)
git init

# 2. Add all files
git add .

# 3. First commit
git commit -m "Initial commit: Students Table App"

# 4. Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/students-app.git
git branch -M main
git push -u origin main
```

---

## 🏗️ Build for Production

```bash
npm run build
# Output will be in /dist folder
```

---

## 🗂️ Project Structure

```
students-app/
├── public/
├── src/
│   ├── App.jsx        # Main app with all components
│   └── main.jsx       # React entry point
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **In-memory state** — No backend needed
- **CSV export** — Native browser Blob API
