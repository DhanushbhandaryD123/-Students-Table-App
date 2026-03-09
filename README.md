# 🎓 Students Table App

Project Details

Students Table App is a React-based frontend application designed to manage student records through a dynamic table interface. The application allows users to perform full CRUD operations including adding, editing, viewing, and deleting student data directly from the browser.

Student information such as name, email, and age is displayed in a structured table with action buttons for editing and deleting records. The add and edit forms include validation to ensure all fields are required and the email follows a valid format.

The application also includes advanced table functionality such as search, sorting, filtering by age range, and pagination to help manage larger datasets efficiently. A confirmation dialog is displayed before deleting a record to prevent accidental data loss.

To improve the user experience, a simulated loading state is implemented when data operations occur. Users can also export student data to a CSV file that can be opened in Excel, either for the filtered dataset or the entire table.

This project demonstrates practical frontend development concepts such as state management, dynamic table rendering, form validation, and client-side data handling using React.
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
vercel URL : https://students-table-app-one.vercel.app

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **In-memory state** — No backend needed
- **CSV export** — Native browser Blob API
