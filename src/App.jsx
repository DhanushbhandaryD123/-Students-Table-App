import { useState, useEffect, useRef } from "react";

/* ─── Inject global styles ─────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --bg:#f7f5f0;
  --surface:#ffffff;
  --panel:#f0ede6;
  --border:#e2ddd4;
  --ink:#1a1714;
  --ink2:#6b6560;
  --accent:#d4541a;
  --accent-soft:#fdeee6;
  --accent2:#1a7ad4;
  --green:#1a9d5a;
  --green-soft:#e6f7ee;
  --red:#d41a1a;
  --red-soft:#fde6e6;
  --yellow:#c49a0a;
  --yellow-soft:#fdf7e0;
  --radius:12px;
  --shadow:0 2px 12px rgba(26,23,20,0.08);
  --shadow-lg:0 8px 40px rgba(26,23,20,0.14);
}

body{background:var(--bg);font-family:'Satoshi',sans-serif;color:var(--ink);min-height:100vh;}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes rowIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

.fade-up{animation:fadeUp .45s ease both}
.fade-up-1{animation:fadeUp .45s .08s ease both}
.fade-up-2{animation:fadeUp .45s .16s ease both}
.fade-up-3{animation:fadeUp .45s .24s ease both}

/* Layout */
.app{max-width:1100px;margin:0 auto;padding:40px 24px 80px;}

/* Header */
.header{margin-bottom:40px;}
.header-eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;}
.header-title{font-family:'Clash Display',sans-serif;font-size:2.6rem;font-weight:700;letter-spacing:-.03em;line-height:1.05;color:var(--ink);}
.header-sub{color:var(--ink2);margin-top:8px;font-size:.95rem;}
.header-row{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;}

/* Stats row */
.stats{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;}
.stat{
  background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);
  padding:16px 20px;min-width:120px;flex:1;
  cursor:pointer;transition:all .18s;position:relative;overflow:hidden;
  user-select:none;
}
.stat:hover{border-color:var(--accent);box-shadow:0 4px 16px rgba(212,84,26,.12);transform:translateY(-2px);}
.stat.active{border-color:var(--accent);background:var(--accent-soft);box-shadow:0 4px 20px rgba(212,84,26,.18);transform:translateY(-2px);}
.stat.active .stat-num{color:var(--accent);}
.stat.active .stat-label{color:var(--accent);}
.stat-num{font-family:'Clash Display',sans-serif;font-size:1.8rem;font-weight:700;letter-spacing:-.03em;transition:color .18s;}
.stat-label{font-size:.75rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink2);margin-top:2px;transition:color .18s;}
.stat-hint{font-size:.7rem;color:var(--accent);margin-top:6px;font-weight:600;opacity:0;transition:opacity .18s;}
.stat:hover .stat-hint,.stat.active .stat-hint{opacity:1;}
.stat-active-dot{
  position:absolute;top:10px;right:10px;
  width:8px;height:8px;border-radius:50%;background:var(--accent);
  display:none;
}
.stat.active .stat-active-dot{display:block;}

/* Controls bar */
.controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:20px;}

.search-wrap{position:relative;flex:1;min-width:180px;}
.search-wrap input{
  width:100%;padding:10px 14px 10px 38px;
  border:1.5px solid var(--border);border-radius:var(--radius);
  background:var(--surface);font-family:'Satoshi',sans-serif;font-size:.9rem;
  color:var(--ink);outline:none;transition:border-color .18s,box-shadow .18s;
}
.search-wrap input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(212,84,26,.1);}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--ink2);font-size:.85rem;pointer-events:none;}

select{
  padding:10px 14px;border:1.5px solid var(--border);border-radius:var(--radius);
  background:var(--surface);font-family:'Satoshi',sans-serif;font-size:.9rem;
  color:var(--ink);outline:none;cursor:pointer;
  transition:border-color .18s;
}
select:focus{border-color:var(--accent);}

/* Buttons */
.btn{
  display:inline-flex;align-items:center;gap:6px;
  padding:10px 18px;border:none;border-radius:var(--radius);
  font-family:'Satoshi',sans-serif;font-size:.875rem;font-weight:600;
  cursor:pointer;transition:all .18s;white-space:nowrap;
}
.btn-primary{background:var(--accent);color:#fff;}
.btn-primary:hover{background:#be4a16;transform:translateY(-1px);box-shadow:0 4px 16px rgba(212,84,26,.3);}
.btn-secondary{background:var(--panel);color:var(--ink);border:1.5px solid var(--border);}
.btn-secondary:hover{background:var(--border);}
.btn-ghost{background:transparent;color:var(--ink2);border:1.5px solid var(--border);}
.btn-ghost:hover{background:var(--panel);}
.btn-icon{padding:8px;border-radius:8px;}
.btn-edit{background:rgba(26,122,212,.1);color:var(--accent2);}
.btn-edit:hover{background:rgba(26,122,212,.2);}
.btn-del{background:rgba(212,26,26,.08);color:var(--red);}
.btn-del:hover{background:rgba(212,26,26,.18);}
.btn-excel{background:#1a9d5a;color:#fff;}
.btn-excel:hover{background:#178050;transform:translateY(-1px);box-shadow:0 4px 16px rgba(26,157,90,.3);}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important;}

/* Table */
.table-wrap{
  background:var(--surface);border:1.5px solid var(--border);
  border-radius:16px;overflow:hidden;box-shadow:var(--shadow);
}
table{width:100%;border-collapse:collapse;}
thead tr{background:var(--panel);border-bottom:1.5px solid var(--border);}
th{
  padding:12px 16px;text-align:left;
  font-size:.72rem;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink2);
  cursor:pointer;user-select:none;white-space:nowrap;
}
th:hover{color:var(--ink);}
th .sort-icon{margin-left:4px;opacity:.5;}
th.active-sort{color:var(--accent);}
th.active-sort .sort-icon{opacity:1;}

tbody tr{
  border-bottom:1px solid var(--border);
  transition:background .12s;
  animation:rowIn .3s ease both;
}
tbody tr:last-child{border-bottom:none;}
tbody tr:hover{background:var(--panel);}
td{padding:14px 16px;font-size:.9rem;vertical-align:middle;}

.td-name{font-weight:600;color:var(--ink);}
.td-email{color:var(--ink2);font-size:.85rem;}
.td-age .age-badge{
  display:inline-block;padding:2px 10px;
  background:var(--accent-soft);color:var(--accent);
  border-radius:99px;font-size:.8rem;font-weight:600;
}
.td-actions{display:flex;gap:6px;align-items:center;}

/* Avatar */
.avatar{
  width:36px;height:36px;border-radius:50%;
  display:inline-flex;align-items:center;justify-content:center;
  font-family:'Clash Display',sans-serif;font-size:.8rem;font-weight:700;
  color:#fff;flex-shrink:0;margin-right:10px;
}

/* Shimmer skeleton */
.skeleton{
  background:linear-gradient(90deg,#ebe8e2 25%,#f5f3ef 50%,#ebe8e2 75%);
  background-size:400px 100%;
  animation:shimmer 1.2s infinite;
  border-radius:6px;
}
.skel-row td{padding:14px 16px;}

/* Empty state */
.empty{
  padding:60px 24px;text-align:center;
}
.empty-icon{font-size:2.5rem;margin-bottom:12px;}
.empty-title{font-family:'Clash Display',sans-serif;font-size:1.2rem;font-weight:600;margin-bottom:6px;}
.empty-sub{color:var(--ink2);font-size:.9rem;}

/* Modal overlay */
.overlay{
  position:fixed;inset:0;background:rgba(26,23,20,.5);
  backdrop-filter:blur(4px);z-index:100;
  display:flex;align-items:center;justify-content:center;padding:24px;
  animation:fadeIn .2s ease;
}
.modal{
  background:var(--surface);border-radius:20px;
  padding:36px 40px;width:100%;max-width:480px;
  box-shadow:var(--shadow-lg);
  animation:scaleIn .22s ease;
  position:relative;
}
.modal-title{font-family:'Clash Display',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:-.02em;margin-bottom:4px;}
.modal-sub{color:var(--ink2);font-size:.875rem;margin-bottom:28px;}
.modal-close{
  position:absolute;top:16px;right:16px;
  background:var(--panel);border:none;border-radius:8px;
  width:32px;height:32px;cursor:pointer;
  font-size:1rem;color:var(--ink2);
  display:flex;align-items:center;justify-content:center;
  transition:background .15s;
}
.modal-close:hover{background:var(--border);}

/* Form */
.field{margin-bottom:18px;}
.field label{display:block;font-size:.78rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ink2);margin-bottom:7px;}
.field input{
  width:100%;padding:11px 14px;
  border:1.5px solid var(--border);border-radius:var(--radius);
  background:var(--bg);font-family:'Satoshi',sans-serif;font-size:.95rem;
  color:var(--ink);outline:none;
  transition:border-color .18s,box-shadow .18s;
}
.field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(212,84,26,.1);background:#fff;}
.field input.err{border-color:var(--red);}
.field-error{color:var(--red);font-size:.78rem;margin-top:5px;display:flex;align-items:center;gap:4px;}
.modal-actions{display:flex;gap:10px;margin-top:24px;justify-content:flex-end;}

/* Confirm dialog */
.confirm-icon{font-size:2.2rem;text-align:center;margin-bottom:12px;}
.confirm-msg{text-align:center;color:var(--ink2);font-size:.9rem;margin-bottom:24px;}
.confirm-msg strong{color:var(--ink);}

/* Pagination */
.pagination{display:flex;align-items:center;gap:8px;margin-top:18px;justify-content:center;flex-wrap:wrap;}
.page-btn{
  width:34px;height:34px;border:1.5px solid var(--border);
  border-radius:8px;background:var(--surface);color:var(--ink);
  font-family:'Satoshi',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;
}
.page-btn:hover{border-color:var(--accent);color:var(--accent);}
.page-btn.active{background:var(--accent);border-color:var(--accent);color:#fff;}
.page-btn:disabled{opacity:.35;cursor:not-allowed;}
.page-info{font-size:.82rem;color:var(--ink2);padding:0 4px;}

/* Toast */
.toast-wrap{position:fixed;bottom:24px;right:24px;z-index:999;display:flex;flex-direction:column;gap:8px;}
.toast{
  padding:12px 18px;border-radius:12px;font-size:.875rem;font-weight:500;
  box-shadow:var(--shadow-lg);animation:fadeUp .3s ease;
  display:flex;align-items:center;gap:8px;min-width:220px;
}
.toast-success{background:#1a1714;color:#fff;}
.toast-error{background:var(--red);color:#fff;}

/* Spinner */
.spinner{width:16px;height:16px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;}

/* Responsive */
@media(max-width:640px){
  .header-title{font-size:1.8rem;}
  .modal{padding:24px 20px;}
  td,th{padding:10px 10px;}
  .td-email{display:none;}
}
`;
const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const COLORS = ["#d4541a","#1a7ad4","#1a9d5a","#8b1ad4","#d4a81a","#d41a6e","#1ad4c8"];
function avatarColor(name) { let h=0; for(const c of name) h=(h*31+c.charCodeAt(0))%COLORS.length; return COLORS[h]; }
function initials(name) { return name.trim().split(/\s+/).map(w=>w[0]).join("").toUpperCase().slice(0,2); }

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEED = [
  {id:1,name:"Alice Johnson",email:"alice@university.edu",age:21},
  {id:2,name:"Ben Carter",email:"ben.carter@college.io",age:23},
  {id:3,name:"Clara Mendes",email:"clara.m@school.ac",age:20},
  {id:4,name:"David Park",email:"david.park@edu.com",age:22},
  {id:5,name:"Eva Russo",email:"eva.russo@institute.org",age:24},
  {id:6,name:"Felix Okonkwo",email:"felix.ok@campus.net",age:19},
  {id:7,name:"Grace Lin",email:"grace.lin@univ.edu",age:25},
];

let nextId = 8;

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = "Name is required";
  else if (form.name.trim().length < 2) errs.name = "Name too short";
  if (!form.email.trim()) errs.email = "Email is required";
  else if (!emailRe.test(form.email.trim())) errs.email = "Invalid email format";
  if (!form.age) errs.age = "Age is required";
  else if (isNaN(form.age) || +form.age < 1 || +form.age > 120) errs.age = "Enter a valid age (1–120)";
  return errs;
}

/* ─── Excel export (CSV) ────────────────────────────────────────────────── */
function downloadCSV(rows) {
  const header = ["Name","Email","Age"];
  const lines = [header.join(","), ...rows.map(r=>[`"${r.name}"`,`"${r.email}"`,r.age].join(","))];
  const blob = new Blob([lines.join("\n")],{type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `students_${Date.now()}.csv`;
  a.click();
}

/* ─── Toast ─────────────────────────────────────────────────────────────── */
function ToastContainer({toasts}) {
  return <div className="toast-wrap">{toasts.map(t=><div key={t.id} className={`toast toast-${t.type}`}>{t.type==="success"?"✓":"✕"} {t.msg}</div>)}</div>;
}

/* ─── Modal Shell ───────────────────────────────────────────────────────── */
function Modal({title,sub,onClose,children}) {
  useEffect(()=>{
    const h=(e)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[onClose]);
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">{title}</div>
        {sub && <div className="modal-sub">{sub}</div>}
        {children}
      </div>
    </div>
  );
}

/* ─── Student Form ──────────────────────────────────────────────────────── */
function StudentForm({initial, onSave, onCancel, loading}) {
  const [form, setForm] = useState(initial || {name:"",email:"",age:""});
  const [errs, setErrs] = useState({});
  const nameRef = useRef();
  useEffect(()=>{ nameRef.current?.focus(); },[]);

  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  function submit() {
    const e = validate(form);
    setErrs(e);
    if(Object.keys(e).length===0) onSave({...form,age:+form.age});
  }

  return (
    <>
      <div className="field">
        <label>Full Name</label>
        <input ref={nameRef} value={form.name} onChange={set("name")} placeholder="e.g. Jane Doe" className={errs.name?"err":""} onKeyDown={e=>e.key==="Enter"&&submit()} />
        {errs.name && <div className="field-error">⚠ {errs.name}</div>}
      </div>
      <div className="field">
        <label>Email Address</label>
        <input type="email" value={form.email} onChange={set("email")} placeholder="e.g. jane@university.edu" className={errs.email?"err":""} onKeyDown={e=>e.key==="Enter"&&submit()} />
        {errs.email && <div className="field-error">⚠ {errs.email}</div>}
      </div>
      <div className="field">
        <label>Age</label>
        <input type="number" min={1} max={120} value={form.age} onChange={set("age")} placeholder="e.g. 21" className={errs.age?"err":""} onKeyDown={e=>e.key==="Enter"&&submit()} />
        {errs.age && <div className="field-error">⚠ {errs.age}</div>}
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? <><div className="spinner"/>Saving…</> : initial ? "Save Changes" : "Add Student"}
        </button>
      </div>
    </>
  );
}

/* ─── Main App ──────────────────────────────────────────────────────────── */
const PAGE_SIZE = 6;

export default function App() {
  const [students, setStudents] = useState(SEED);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);

  const [search, setSearch]     = useState("");
  const [sortCol, setSortCol]   = useState("name");
  const [sortDir, setSortDir]   = useState("asc");
  const [ageFilter, setAgeFilter] = useState("all");
  const [page, setPage]         = useState(1);

  const [modal, setModal]       = useState(null); // "add" | "edit" | "delete"
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts]     = useState([]);

  // Simulate initial load
  useEffect(()=>{
    const t = setTimeout(()=>setLoading(false), 1100);
    return ()=>clearTimeout(t);
  },[]);

  function toast(msg, type="success") {
    const id = Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 3000);
  }

  /* Filter + sort */
  const filtered = students
    .filter(s => {
      const q = search.toLowerCase();
      const match = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const ageOk = ageFilter==="all" ? true : ageFilter==="<20" ? s.age<20 : ageFilter==="20-22" ? s.age>=20&&s.age<=22 : s.age>22;
      return match && ageOk;
    })
    .sort((a,b)=>{
      let va=a[sortCol], vb=b[sortCol];
      if(sortCol==="age") { va=+va; vb=+vb; }
      else { va=va.toLowerCase(); vb=vb.toLowerCase(); }
      return sortDir==="asc" ? (va>vb?1:-1) : (va<vb?1:-1);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length/PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage-1)*PAGE_SIZE, safePage*PAGE_SIZE);

  function handleSort(col) {
    if(sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortCol(col); setSortDir("asc"); }
  }

  function sortIcon(col) {
    if(sortCol!==col) return "⇅";
    return sortDir==="asc" ? "↑" : "↓";
  }

  async function handleAdd(data) {
    setSaving(true);
    await new Promise(r=>setTimeout(r,700));
    setStudents(s=>[...s,{...data,id:nextId++}]);
    setSaving(false); setModal(null);
    toast("Student added successfully!");
  }

  async function handleEdit(data) {
    setSaving(true);
    await new Promise(r=>setTimeout(r,700));
    setStudents(s=>s.map(x=>x.id===editTarget.id?{...x,...data}:x));
    setSaving(false); setModal(null); setEditTarget(null);
    toast("Student updated!");
  }

  async function handleDelete() {
    setSaving(true);
    await new Promise(r=>setTimeout(r,600));
    setStudents(s=>s.filter(x=>x.id!==deleteTarget.id));
    setSaving(false); setModal(null); setDeleteTarget(null);
    toast("Student removed.","success");
  }

  const avgAge = students.length ? (students.reduce((s,x)=>s+x.age,0)/students.length).toFixed(1) : 0;

  return (
    <div className="app">
      {/* Header */}
      <div className="header fade-up">
        <div className="header-row">
          <div>
            <div className="header-eyebrow">Admin Panel</div>
            <h1 className="header-title">Students Table</h1>
            <p className="header-sub">Manage student records — create, update, search and export.</p>
          </div>
        </div>
      </div>

      {/* Stats — clickable filters */}
      <div className="stats fade-up-1">
        <div
          className={`stat${ageFilter==="all"&&!search?"active":""}`}
          onClick={()=>{setAgeFilter("all");setSearch("");setPage(1);}}
          title="Show all students"
        >
          <div className="stat-active-dot"/>
          <div className="stat-num">{students.length}</div>
          <div className="stat-label">Total Students</div>
          <div className="stat-hint">Show all →</div>
        </div>

        <div
          className={`stat${ageFilter==="all"&&search?"active":""}`}
          onClick={()=>{setAgeFilter("all");setPage(1);}}
          title="Current filtered count"
        >
          <div className="stat-active-dot"/>
          <div className="stat-num">{filtered.length}</div>
          <div className="stat-label">Filtered Results</div>
          <div className="stat-hint">Active filter →</div>
        </div>

        <div
          className={`stat${ageFilter==="20-22"?"active":""}`}
          onClick={()=>{setAgeFilter(ageFilter==="20-22"?"all":"20-22");setPage(1);}}
          title="Filter ages 20–22"
        >
          <div className="stat-active-dot"/>
          <div className="stat-num">{avgAge}</div>
          <div className="stat-label">Avg. Age</div>
          <div className="stat-hint">{ageFilter==="20-22"?"Clear filter":"Filter 20–22 →"}</div>
        </div>

        <div
          className={`stat${ageFilter==="<20"?"active":""}`}
          onClick={()=>{setAgeFilter(ageFilter==="<20"?"all":"<20");setPage(1);}}
          title="Filter students under 21"
        >
          <div className="stat-active-dot"/>
          <div className="stat-num">{students.filter(s=>s.age<21).length}</div>
          <div className="stat-label">Under 21</div>
          <div className="stat-hint">{ageFilter==="<20"?"Clear filter":"Filter under 20 →"}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls fade-up-2">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input placeholder="Search by name or email…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} />
        </div>
        <select value={ageFilter} onChange={e=>{setAgeFilter(e.target.value);setPage(1);}}>
          <option value="all">All Ages</option>
          <option value="<20">Under 20</option>
          <option value="20-22">20 – 22</option>
          <option value=">22">Over 22</option>
        </select>
        <button className="btn btn-excel" onClick={()=>downloadCSV(filtered)}>
          ⬇ Export CSV
        </button>
        <button className="btn btn-primary" onClick={()=>setModal("add")}>
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="table-wrap fade-up-3">
        <table>
          <thead>
            <tr>
              <th className={sortCol==="name"?"active-sort":""} onClick={()=>handleSort("name")}>Name <span className="sort-icon">{sortIcon("name")}</span></th>
              <th className={sortCol==="email"?"active-sort":""} onClick={()=>handleSort("email")}>Email <span className="sort-icon">{sortIcon("email")}</span></th>
              <th className={sortCol==="age"?"active-sort":""} onClick={()=>handleSort("age")}>Age <span className="sort-icon">{sortIcon("age")}</span></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({length:5}).map((_,i)=>(
                <tr key={i} className="skel-row">
                  <td><span className="skeleton" style={{display:"block",height:16,width:"60%"}} /></td>
                  <td><span className="skeleton" style={{display:"block",height:14,width:"80%"}} /></td>
                  <td><span className="skeleton" style={{display:"block",height:14,width:40}} /></td>
                  <td><span className="skeleton" style={{display:"block",height:28,width:80}} /></td>
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr><td colSpan={4}>
                <div className="empty">
                  <div className="empty-icon">🎓</div>
                  <div className="empty-title">{search||ageFilter!=="all"?"No results found":"No students yet"}</div>
                  <div className="empty-sub">{search||ageFilter!=="all"?"Try adjusting your search or filters.":"Click \"Add Student\" to get started."}</div>
                </div>
              </td></tr>
            ) : (
              paginated.map((s,i)=>(
                <tr key={s.id} style={{animationDelay:`${i*0.05}s`}}>
                  <td className="td-name">
                    <div style={{display:"flex",alignItems:"center"}}>
                      <span className="avatar" style={{background:avatarColor(s.name)}}>{initials(s.name)}</span>
                      {s.name}
                    </div>
                  </td>
                  <td className="td-email">{s.email}</td>
                  <td className="td-age"><span className="age-badge">{s.age}</span></td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-icon btn-edit" title="Edit" onClick={()=>{setEditTarget(s);setModal("edit");}}>✏️</button>
                      <button className="btn btn-icon btn-del" title="Delete" onClick={()=>{setDeleteTarget(s);setModal("delete");}}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && filtered.length > PAGE_SIZE && (
        <div className="pagination">
          <button className="page-btn" onClick={()=>setPage(p=>p-1)} disabled={safePage===1}>‹</button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
            <button key={n} className={`page-btn${n===safePage?" active":""}`} onClick={()=>setPage(n)}>{n}</button>
          ))}
          <button className="page-btn" onClick={()=>setPage(p=>p+1)} disabled={safePage===totalPages}>›</button>
          <span className="page-info">Page {safePage} of {totalPages}</span>
        </div>
      )}

      {/* Add Modal */}
      {modal==="add" && (
        <Modal title="Add Student" sub="Fill in the details below. All fields are required." onClose={()=>setModal(null)}>
          <StudentForm onSave={handleAdd} onCancel={()=>setModal(null)} loading={saving} />
        </Modal>
      )}

      {/* Edit Modal */}
      {modal==="edit" && editTarget && (
        <Modal title="Edit Student" sub={`Updating record for ${editTarget.name}`} onClose={()=>{setModal(null);setEditTarget(null);}}>
          <StudentForm initial={editTarget} onSave={handleEdit} onCancel={()=>{setModal(null);setEditTarget(null);}} loading={saving} />
        </Modal>
      )}

      {/* Delete Confirm */}
      {modal==="delete" && deleteTarget && (
        <Modal title="Delete Student" onClose={()=>{setModal(null);setDeleteTarget(null);}}>
          <div className="confirm-icon">⚠️</div>
          <div className="confirm-msg">
            Are you sure you want to remove <strong>{deleteTarget.name}</strong>?<br/>This action cannot be undone.
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={()=>{setModal(null);setDeleteTarget(null);}}>Cancel</button>
            <button className="btn btn-primary" style={{background:"var(--red)"}} onClick={handleDelete} disabled={saving}>
              {saving ? <><div className="spinner"/>Deleting…</> : "Yes, Delete"}
            </button>
          </div>
        </Modal>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
