import { FormEvent, useState } from "react";
import { LearningZone } from "./LearningZone";

type Role = "Principal" | "Teacher" | "Student" | "Parent";

const roles: Role[] = ["Principal", "Teacher", "Student", "Parent"];

const roleNav: Record<Role, string[][]> = {
  Principal: [["Home Dashboard", "grid"], ["Learning Zone", "trophy"], ["Attendance", "calendar"], ["Academics", "book"], ["Reports", "chart"], ["Notifications", "bell"], ["Safety center", "shield"]],
  Teacher: [["Home Dashboard", "grid"], ["Learning Zone", "trophy"], ["Attendance", "calendar"], ["Marks Entry", "book"], ["Class Reports", "chart"], ["Homework", "folder"], ["Timetable", "clock"], ["Students", "star"], ["Messages", "bell"], ["Leave", "calendar"], ["Notices", "quiz"]],
  Student: [["Home Dashboard", "grid"], ["Learning Zone", "trophy"], ["My attendance", "calendar"], ["My results", "book"], ["My quizzes", "quiz"], ["My homework", "folder"]],
  Parent: [["Home Dashboard", "grid"], ["Learning Zone", "trophy"], ["Child attendance", "calendar"], ["Results", "book"], ["Progress", "chart"], ["Reports", "folder"], ["Notifications", "bell"]],
};

const roleData: Record<Role, { name: string; subtitle: string; initials: string }> = {
  Principal: { name: "Dr. Olivia Martin", subtitle: "Principal • GGHSS Pacca Chang", initials: "OM" },
  Teacher: { name: "Sophia Carter", subtitle: "Science faculty • Grade 8", initials: "SC" },
  Student: { name: "Ethan Parker", subtitle: "Student • Grade 8B", initials: "EP" },
  Parent: { name: "Daniel Parker", subtitle: "Parent • Ethan Parker", initials: "DP" },
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13M8 8h8M8 12h6"/></>,
    quiz: <><path d="M8 3h8l4 4v14H4V3z"/><path d="M16 3v5h4M9.5 12a2.5 2.5 0 1 1 3.2 2.4c-.7.3-.7.8-.7 1.1M12 18h.01"/></>,
    folder: <path d="M3 6h7l2 2h9v11H3z"/>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    shield: <><path d="M12 3 4.5 6v5.5c0 4.8 3.2 8 7.5 9.5 4.3-1.5 7.5-4.7 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    logout: <><path d="M9 4H4v16h5M14 8l4 4-4 4M18 12H8"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.grid}</svg>;
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("Principal");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onLogin(role);
  };

  return (
    <main className="login-shell">
      <section className="login-story">
        <div className="brand brand-light"><span className="brand-mark"><img src="/school-logo.png" alt="School crest"/></span><span>Government Girls Higher Secondary School Pacca Chang</span></div>
        <div className="story-copy">
          <span className="eyebrow">One connected school</span>
          <h1>Helping every learner find their way.</h1>
          <p>Bring your entire school community together with clearer insights, safer learning, and more meaningful progress.</p>
          <div className="story-stats">
            <div><strong>98%</strong><span>Parent engagement</span></div>
            <div><strong>12.4k</strong><span>Learning moments</span></div>
          </div>
        </div>
        <p className="story-foot">Trusted by educators, families, and students every day.</p>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <div className="mobile-brand brand"><span className="brand-mark"><img src="/school-logo.png" alt="School crest"/></span><span>Government Girls Higher Secondary School Pacca Chang</span></div>
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to your portal</h2>
          <p className="muted">Choose your role and enter your details to continue.</p>
          <label>Portal role</label>
          <div className="role-picker">
            {roles.map((item) => <button type="button" key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>{item}</button>)}
          </div>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" defaultValue="olivia@northstar.edu" required />
          <div className="password-label"><label htmlFor="password">Password</label><button type="button">Forgot password?</button></div>
          <input id="password" type="password" defaultValue="northstar" required />
          <button className="primary login-button">Sign in securely <Icon name="arrow" size={18}/></button>
          <p className="secure-note"><Icon name="shield" size={16}/> Protected with school-grade encryption</p>
        </form>
      </section>
    </main>
  );
}

function Sidebar({ role, active, setActive, open, close, logout }: { role: Role; active: string; setActive: (v: string) => void; open: boolean; close: () => void; logout: () => void }) {
  return <>
    {open && <button className="scrim" aria-label="Close menu" onClick={close}/>}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><span className="brand-mark"><img src="/school-logo.png" alt="School crest"/></span><span>Government Girls Higher Secondary School Pacca Chang</span></div>
      <button className="close-menu" onClick={close}><Icon name="close"/></button>
      <nav>
        <span className="nav-label">Workspace</span>
        {roleNav[role].map(([label, icon]) => {
          const destination = label === "Home Dashboard" ? "Dashboard" : label;
          return <button key={label} className={active === destination ? "active" : ""} onClick={() => { setActive(destination); close(); }}><Icon name={icon}/><span>{label}</span>{(label === "Notifications" || label === "Safety center") && <i>2</i>}</button>;
        })}
      </nav>
      <div className="sidebar-help">
        <span><Icon name="shield" size={20}/></span>
        <strong>Need support?</strong>
        <p>Our school team is here to help.</p>
        <button>Visit help center</button>
      </div>
      <button className="logout" onClick={logout}><Icon name="logout"/><span>Sign out</span></button>
    </aside>
  </>;
}

function MetricCard({ icon, tone, label, value, detail, progress }: { icon: string; tone: string; label: string; value: string; detail: string; progress?: number }) {
  return <article className="metric-card">
    <div className={`metric-icon ${tone}`}><Icon name={icon}/></div>
    <div className="metric-top"><span>{label}</span><button aria-label={`Open ${label}`}><Icon name="arrow" size={17}/></button></div>
    <strong>{value}</strong>
    <p>{detail}</p>
    {progress !== undefined && <div className="progress"><i style={{ width: `${progress}%` }}/></div>}
  </article>;
}

type ReportKind = "dashboard" | "attendance" | "academics" | "reports";

const attendanceRows = [
  ["Class 1", 38, 36, 1, 1, 94.7], ["Class 2", 42, 39, 2, 1, 92.9], ["Class 3", 40, 37, 2, 1, 92.5],
  ["Class 4", 44, 39, 3, 2, 88.6], ["Class 5", 41, 37, 2, 2, 90.2], ["Class 6", 46, 40, 4, 2, 87],
  ["Class 7", 43, 39, 3, 1, 90.7], ["Class 8", 45, 42, 2, 1, 93.3], ["Class 9", 39, 35, 3, 1, 89.7],
  ["Class 10", 47, 44, 2, 1, 93.6], ["Class 11", 36, 31, 3, 2, 86.1], ["Class 12", 34, 32, 1, 1, 94.1],
] as const;

const studentRows = [
  ["1", "Ayesha Khan", "NS-801", "92", "89", "94", "90", "365", "91.3%", "A+"],
  ["2", "Muhammad Ahmed", "NS-814", "88", "91", "86", "93", "358", "89.5%", "A"],
  ["3", "Fatima Noor", "NS-807", "85", "88", "91", "87", "351", "87.8%", "A"],
  ["4", "Ali Raza", "NS-819", "82", "86", "84", "89", "341", "85.3%", "A"],
  ["5", "Zainab Malik", "NS-803", "79", "84", "88", "85", "336", "84.0%", "B"],
  ["6", "Hassan Siddiqui", "NS-822", "76", "81", "83", "80", "320", "80.0%", "B"],
];

function Sparkline({ color = "#347b68", values = [25, 38, 31, 49, 45, 62, 70] }: { color?: string; values?: number[] }) {
  const points = values.map((value, index) => `${index * 16},${34 - value / 3}`).join(" ");
  return <svg className="sparkline" viewBox="0 0 96 38" preserveAspectRatio="none"><polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ReportNumber({ label, value, change, negative = false }: { label: string; value: string; change: string; negative?: boolean }) {
  return <article className="report-number card"><span>{label}</span><strong>{value}</strong><small className={negative ? "negative" : ""}>{negative ? "↓" : "↑"} {change}</small><Sparkline color={negative ? "#d6635c" : "#347b68"}/></article>;
}

function MiniBars({ labels, values, color = "#347b68", unit = "%" }: { labels: string[]; values: number[]; color?: string; unit?: string }) {
  const max = Math.max(...values);
  return <div className="report-bars">{values.map((value, index) => <div className="report-bar-item" key={labels[index]}><div className="bar-tooltip" data-tip={`${labels[index]}: ${value}${unit}`} style={{ height: `${Math.max(8, value / max * 100)}%`, background: color }}><title>{labels[index]}: {value}{unit}</title></div><span>{labels[index]}</span></div>)}</div>;
}

function TrendLine({ values, labels, color = "#347b68", unit = "%" }: { values: number[]; labels: string[]; color?: string; unit?: string }) {
  const points = values.map((value, index) => `${8 + index * (92 / (values.length - 1))},${88 - value * .7}`).join(" ");
  return <div className="trend-chart"><svg viewBox="0 0 108 96" preserveAspectRatio="none"><path d="M8 18H100M8 42H100M8 66H100M8 88H100" stroke="#e7ecea" strokeWidth=".6"/><polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke"/>{values.map((value, index) => <circle key={labels[index]} cx={8 + index * (92 / (values.length - 1))} cy={88 - value * .7} r="2.2" fill={color}><title>{labels[index]}: {value}{unit}</title></circle>)}</svg><div>{labels.map(label => <span key={label}>{label}</span>)}</div></div>;
}

function GraphCard({ title, subtitle, children, mini }: { title: string; subtitle: string; children: React.ReactNode; mini: [string, string][] }) {
  return <article className="card report-graph"><div className="card-head"><div><h3>{title}</h3><p>{subtitle}</p></div></div>{children}<div className="graph-mini-table">{mini.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></article>;
}

function PrincipalReport({ kind }: { kind: ReportKind }) {
  const [view, setView] = useState<"Numbers" | "Graphs" | "Both">("Both");
  const [period, setPeriod] = useState("This month");
  const [selectedClass, setSelectedClass] = useState("All classes");
  const offset = period === "This week" ? -1.4 : period === "This term" ? 1.8 : 0;
  const classRows = selectedClass === "All classes" ? attendanceRows : attendanceRows.filter(row => row[0] === selectedClass);
  const attendance = +(classRows.reduce((sum, row) => sum + row[5], 0) / classRows.length + offset).toFixed(1);
  const total = classRows.reduce((sum, row) => sum + row[1], 0);
  const present = Math.round(total * attendance / 100);
  const title = kind === "attendance" ? "Attendance reports" : kind === "academics" ? "Academic performance" : kind === "dashboard" ? "Principal dashboard" : "Reports center";
  const isAcademic = kind === "academics";
  const academicCards = [["Class average", `${(84.2 + offset).toFixed(1)}%`, "+3.2% vs last exam"], ["Highest score", "94%", "+1.0% vs last exam"], ["Lowest score", "48%", "+4.0% vs last exam"], ["Pass rate", "91.6%", "+2.8% vs last exam"], ["Fail count", "6", "-3 vs last exam"]];
  const attendanceCards = [["Overall attendance", `${attendance}%`, "+1.8% vs last month"], ["Total present", `${present}`, "+24 vs last month"], ["Total absent", `${Math.max(0, total - present - 14)}`, "-9 vs last month"], ["On leave", "14", "+2 vs last month"], ["Late arrivals", "11", "-6 vs last month"]];
  const dashboardCards = [["Student attendance", `${attendance}%`, "+1.8% vs last month"], ["Class performance", "84.2%", "+3.2% vs last exam"], ["Fees collected", "₨ 8.4M", "+6.5% vs last month"], ["Teacher attendance", "97.1%", "+0.8% vs last month"]];
  const cards = isAcademic ? academicCards : kind === "dashboard" ? dashboardCards : attendanceCards;

  const exportCsv = () => {
    const content = isAcademic ? studentRows.map(row => row.join(",")).join("\n") : classRows.map(row => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;
    link.download = `${title.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
  };

  return <section className="principal-report">
    <div className="report-title"><div><span className="eyebrow">Principal portal</span><h1>{title}</h1><p>Numbers and visual insights from the same live dataset.</p></div><div className="view-toggle">{(["Numbers", "Graphs", "Both"] as const).map(item => <button className={view === item ? "active" : ""} key={item} onClick={() => setView(item)}>{item}</button>)}</div></div>
    <div className="report-filters">
      <label>Period<select value={period} onChange={event => setPeriod(event.target.value)}><option>This week</option><option>This month</option><option>This term</option></select></label>
      <label>Class<select value={selectedClass} onChange={event => setSelectedClass(event.target.value)}><option>All classes</option>{attendanceRows.map(row => <option key={row[0]}>{row[0]}</option>)}</select></label>
      <label>Campus<select><option>Main Campus</option><option>Junior Campus</option></select></label>
      <div className="export-actions"><button onClick={() => window.print()}>PDF</button><button onClick={exportCsv}>Excel</button><button onClick={() => window.print()}>Print</button></div>
    </div>

    {view !== "Graphs" && <div className="report-numbers">{cards.map(([label, value, change], index) => <ReportNumber key={label} label={label} value={value} change={change} negative={(label.includes("Absent") || label.includes("Fail") || label.includes("Late")) && !change.startsWith("-")}/>)}</div>}

    {view !== "Numbers" && <div className="report-graphs">
      {kind === "dashboard" ? <>
        <GraphCard title="Attendance trend" subtitle="Attendance %" mini={[["Monday", "94.2%"], ["Tuesday", "95.1%"], ["Wednesday", "93.8%"], ["Thursday", "96.0%"], ["Friday", `${attendance}%`]]}><TrendLine values={[88,90,87,92,attendance]} labels={["Mon","Tue","Wed","Thu","Fri"]}/></GraphCard>
        <GraphCard title="Class-wise performance" subtitle="Average marks" mini={[["Class 8", "88%"], ["Class 10", "86%"], ["Class 7", "84%"], ["Class 9", "82%"], ["Class 6", "81%"]]}><MiniBars labels={["C6","C7","C8","C9","C10"]} values={[81,84,88,82,86]} color="#557ab7"/></GraphCard>
        <GraphCard title="Fees collected vs pending" subtitle="PKR, monthly" mini={[["Collected", "₨8.4M"], ["Pending", "₨1.6M"], ["Collection rate", "84%"]]}><div className="donut-report fees"><div><strong>84%</strong><span>collected</span></div></div></GraphCard>
        <GraphCard title="Teacher attendance" subtitle="Present teachers by day" mini={[["Monday", "96%"], ["Tuesday", "98%"], ["Wednesday", "97%"], ["Thursday", "96%"], ["Friday", "98%"]]}><TrendLine values={[91,94,93,92,95]} labels={["Mon","Tue","Wed","Thu","Fri"]} color="#557ab7"/></GraphCard>
      </> : isAcademic ? <>
        <GraphCard title="Subject-wise average" subtitle="Marks (%)" mini={[["English", "89%"], ["Science", "86%"], ["Mathematics", "84%"], ["Urdu", "81%"], ["Pakistan Studies", "78%"]]}><MiniBars labels={["Math","Sci","Eng","Urdu","Pak"]} values={[84,86,89,81,78]} color="#557ab7"/></GraphCard>
        <GraphCard title="Score distribution" subtitle="Students by score range" mini={[["80–100", "46"], ["70–80", "31"], ["60–70", "18"], ["Below 60", "11"]]}><MiniBars labels={["0–40","40–50","50–60","60–70","70–80","80–100"]} values={[3,4,7,18,31,46]} unit=" students"/></GraphCard>
        <GraphCard title="Exam performance trend" subtitle="Average marks" mini={[["Monthly", "78%"], ["Mid-term", "82%"], ["Final", "84%"]]}><TrendLine values={[72,75,78,82,84]} labels={["M1","M2","Monthly","Mid","Final"]} color="#557ab7"/></GraphCard>
        <GraphCard title="Grade distribution" subtitle="Students by grade" mini={[["A+", "18"], ["A", "28"], ["B", "34"], ["C–F", "20"]]}><div className="donut-report grades"><div><strong>46%</strong><span>A grades</span></div></div></GraphCard>
        <GraphCard title="Strong vs weak subjects" subtitle="Selected student radar" mini={[["English", "94"], ["Science", "92"], ["Mathematics", "89"], ["Urdu", "86"], ["Pak. Studies", "82"]]}><div className="radar"><span>ENG</span><span>SCI</span><span>MATH</span><span>URDU</span><span>PAK</span><i/></div></GraphCard>
        <GraphCard title="Class vs school average" subtitle="Average marks (%)" mini={[["Class 8", "84.2%"], ["School", "80.6%"], ["Difference", "+3.6%"]]}><MiniBars labels={["Math C","Math S","Sci C","Sci S","Eng C","Eng S"]} values={[84,80,86,82,89,83]} color="#347b68"/></GraphCard>
      </> : <>
        <GraphCard title="Attendance by class" subtitle="Classes 1–12 (%)" mini={classRows.slice(0,5).map(row => [row[0], `${(row[5] + offset).toFixed(1)}%`])}><MiniBars labels={classRows.map(row => row[0].replace("Class ","C"))} values={classRows.map(row => +(row[5] + offset).toFixed(1))}/></GraphCard>
        <GraphCard title="Attendance trend" subtitle="Daily / weekly / monthly" mini={[["Week 1", "92.8%"], ["Week 2", "94.1%"], ["Week 3", "93.6%"], ["Week 4", `${attendance}%`]]}><TrendLine values={[88,90,89,92,91,94,attendance]} labels={["W1","W2","W3","W4","W5","W6","Now"]}/></GraphCard>
        <GraphCard title="Attendance split" subtitle="Present, absent, leave" mini={[["Present", `${present}`], ["Absent", `${total-present-14}`], ["Leave", "14"]]}><div className="donut-report attendance"><div><strong>{attendance}%</strong><span>present</span></div></div></GraphCard>
        <GraphCard title="Monthly heatmap" subtitle="Daily attendance %" mini={[["Best day", "97.2%"], ["Lowest day", "88.4%"], ["Monthly avg", `${attendance}%`]]}><div className="heatmap">{Array.from({length:31},(_,i)=><i key={i} title={`${i+1} May: ${88+(i*7)%10}%`} style={{opacity:.35+((i*7)%10)/15}}/>)}</div></GraphCard>
        <GraphCard title="Boys vs girls by class" subtitle="Attendance %" mini={[["Girls", "95.1%"], ["Boys", "92.8%"], ["Difference", "2.3%"]]}><div className="stacked-bars">{classRows.slice(0,8).map((row,i)=><div key={row[0]}><span>{row[0]}</span><i style={{width:`${48+i%3}%`}} title={`${row[0]} boys: ${91+i%5}%`}/><b title={`${row[0]} girls: ${93+i%4}%`}/></div>)}</div></GraphCard>
      </>}
    </div>}

    <article className="card report-table-card">
      <div className="card-head"><div><h3>{isAcademic ? "Student performance details" : kind === "dashboard" ? "Top five indicators" : "Class attendance details"}</h3><p>Exact values matching the filters and charts above</p></div></div>
      {isAcademic ? <div className="report-table academic-table"><div className="table-row table-header"><span>Rank</span><span>Student</span><span>Roll No</span><span>Math</span><span>Science</span><span>English</span><span>Urdu</span><span>Total</span><span>%</span><span>Grade</span></div>{studentRows.map(row=><div className="table-row" key={row[0]}>{row.map((cell,i)=><span key={i}>{cell}</span>)}</div>)}</div> :
      <div className="report-table"><div className="table-row table-header"><span>Class</span><span>Total students</span><span>Present</span><span>Absent</span><span>Leave</span><span>Attendance %</span></div>{classRows.map(row=><div className="table-row" key={row[0]}>{row.slice(0,5).map((cell,i)=><span key={i}>{cell}</span>)}<span className={row[5]>90?"percent-good":row[5]>=75?"percent-warn":"percent-bad"}>{(row[5]+offset).toFixed(1)}%</span></div>)}</div>}
    </article>
  </section>;
}

const teacherStudents = [
  { roll: "NS-801", name: "Ayesha Khan" }, { roll: "NS-802", name: "Muhammad Ahmed" },
  { roll: "NS-803", name: "Fatima Noor" }, { roll: "NS-804", name: "Ali Raza" },
  { roll: "NS-805", name: "Zainab Malik" }, { roll: "NS-806", name: "Hassan Siddiqui" },
  { roll: "NS-807", name: "Hira Iqbal" }, { roll: "NS-808", name: "Usman Tariq" },
];

function TeacherDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  return <section className="teacher-dashboard">
    <section className="welcome"><div><span className="eyebrow">Monday, 26 May 2025</span><h1>Good morning, Sophia.</h1><p>You have five periods and three pending tasks today.</p></div></section>
    <div className="teacher-metrics">
      {[["My Classes","5","Grades 7–9"],["Total Students","128","Across assigned classes"],["Today’s Attendance","94.2%","+1.4% vs last week"],["Homework Checks","18","Pending review"],["Marks Entry","2","Classes remaining"]].map(([label,value,detail],i)=><article className="card" key={label}><span className={`module-symbol symbol-${i%3}`}><Icon name={i===2?"calendar":i===3?"folder":"book"}/></span><p>{label}</p><strong>{value}</strong><small>{detail}</small><Sparkline values={[30+i*2,36,32+i,47,44,58,65+i]}/></article>)}
    </div>
    <div className="quick-actions">
      <strong>Quick actions</strong>
      {[["Mark Attendance","Attendance","calendar"],["Enter Marks","Marks Entry","book"],["Add Homework","Homework","folder"],["Send Message","Messages","bell"]].map(([label,page,icon])=><button key={label} onClick={()=>onNavigate(page)}><Icon name={icon}/>{label}</button>)}
      <button onClick={()=>onNavigate("Learning Zone")}><Icon name="trophy"/>Learning Zone</button>
    </div>
    <div className="teacher-grid">
      <article className="card teacher-timetable">
        <div className="card-head"><div><h3>Today’s timetable</h3><p>Monday • 5 assigned periods</p></div><button onClick={()=>onNavigate("Timetable")}>Full timetable</button></div>
        {[["1","08:00–08:45","Grade 8B","Science","Room 204","Completed"],["2","09:00–09:45","Grade 7A","Science","Lab 1","Current"],["4","11:00–11:45","Grade 9C","Biology","Lab 2","Upcoming"],["6","13:00–13:45","Grade 8A","Science","Room 201","Upcoming"]].map(row=><div className={`period-row ${row[5]==="Current"?"current":""}`} key={row[0]}><span className="period-no">{row[0]}</span><time>{row[1]}</time><div><strong>{row[2]} • {row[3]}</strong><small>{row[4]}</small></div><b>{row[5]}</b>{row[5]==="Current"&&<button className="primary" onClick={()=>onNavigate("Attendance")}>Mark Attendance</button>}</div>)}
      </article>
      <GraphCard title="Weekly attendance trend" subtitle="My assigned classes (%)" mini={[["Grade 8B","96%"],["Grade 7A","94%"],["Grade 9C","92%"],["Grade 8A","95%"]]}><TrendLine values={[88,90,91,89,94]} labels={["Mon","Tue","Wed","Thu","Fri"]}/></GraphCard>
      <GraphCard title="Average performance by class" subtitle="Current term marks (%)" mini={[["Grade 8B","88%"],["Grade 7A","84%"],["Grade 9C","82%"],["Grade 8A","86%"]]}><MiniBars labels={["8B","7A","9C","8A"]} values={[88,84,82,86]} color="#557ab7"/></GraphCard>
      <article className="card notices-card"><div className="card-head"><div><h3>Latest notices</h3><p>From the Principal’s office</p></div><button onClick={()=>onNavigate("Notices")}>View all</button></div><div className="notice"><b>Urgent</b><span><strong>Emergency drill briefing</strong><small>Today at 12:30 • Main auditorium</small></span></div><div className="notice"><i>General</i><span><strong>Parent-teacher meeting</strong><small>Friday, 30 May • 09:00</small></span></div><div className="notice"><i>Academic</i><span><strong>Mid-term marks deadline</strong><small>Submit before 2 June</small></span></div></article>
    </div>
  </section>;
}

type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";

function TeacherAttendance() {
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>(Object.fromEntries(teacherStudents.map(student=>[student.roll,"Present"])));
  const [notes, setNotes] = useState<Record<string,string>>({});
  const [toast, setToast] = useState("");
  const counts = (["Present","Absent","Late","Leave"] as AttendanceStatus[]).map(status=>[status,Object.values(statuses).filter(value=>value===status).length] as const);
  const present = counts[0][1];
  const attendance = Math.round((present + counts[2][1]) / teacherStudents.length * 100);
  const save = (message:string) => { setToast(message); setTimeout(()=>setToast(""),2200); };
  return <section>
    {toast&&<div className="success-toast"><Icon name="check" size={17}/>{toast}</div>}
    <div className="module-heading"><div><span className="eyebrow">Teacher portal</span><h1>Mark attendance</h1><p>Record attendance for your assigned classes and periods.</p></div><button className="soft-button history-button">Date history</button></div>
    <div className="report-filters"><label>Class<select><option>Grade 8</option><option>Grade 7</option><option>Grade 9</option></select></label><label>Section<select><option>B</option><option>A</option><option>C</option></select></label><label>Subject / Period<select><option>Science • Period 2</option><option>Biology • Period 4</option></select></label><label>Date<input type="date" defaultValue="2025-05-26"/></label><button className="mark-all" onClick={()=>setStatuses(Object.fromEntries(teacherStudents.map(student=>[student.roll,"Present"])))}>Mark All Present</button></div>
    <div className="attendance-live">
      <div className="live-counts">{counts.map(([label,value],i)=><article className="card" key={label}><span>{label}</span><strong>{value}</strong><small>{i===0?"Marked in class":"Students"}</small></article>)}<article className="card"><span>Attendance</span><strong>{attendance}%</strong><small>Live percentage</small></article></div>
      <div className="donut-report attendance live-donut" style={{background:`conic-gradient(#347b68 0 ${present/teacherStudents.length*100}%,#dd6b62 ${present/teacherStudents.length*100}% ${(present+counts[1][1])/teacherStudents.length*100}%,#e4b55a 0)`}}><div><strong>{attendance}%</strong><span>attendance</span></div></div>
    </div>
    <article className="card attendance-list"><div className="student-attendance-row list-head"><span>Student</span><span>Roll No</span><span>Status</span><span>Note for absence</span></div>{teacherStudents.map(student=><div className="student-attendance-row" key={student.roll}><span><i>{student.name.split(" ").map(n=>n[0]).join("")}</i><strong>{student.name}</strong></span><span>{student.roll}</span><div className="status-toggle">{(["Present","Absent","Late","Leave"] as AttendanceStatus[]).map(status=><button className={statuses[student.roll]===status?`active ${status.toLowerCase()}`:""} key={status} onClick={()=>setStatuses({...statuses,[student.roll]:status})}>{status}</button>)}</div><input disabled={statuses[student.roll]==="Present"} value={notes[student.roll]||""} onChange={event=>setNotes({...notes,[student.roll]:event.target.value})} placeholder={statuses[student.roll]==="Present"?"Not required":"Add reason..."}/></div>)}</article>
    <div className="form-actions"><button onClick={()=>save("Attendance draft saved")}>Save draft</button><button className="primary" onClick={()=>window.confirm("Submit attendance? You can still edit it from date history.")&&save("Attendance submitted successfully")}>Submit attendance</button></div>
  </section>;
}

function gradeFor(mark:number){return mark>=90?"A+":mark>=80?"A":mark>=70?"B":mark>=60?"C":mark>=50?"D":"F"}

function TeacherMarks() {
  const [marks,setMarks]=useState<Record<string,string>>({"NS-801":"92","NS-802":"87","NS-803":"89","NS-804":"76","NS-805":"84","NS-806":"48","NS-807":"81","NS-808":"73"});
  const [maxMarks,setMaxMarks]=useState(100);
  const [toast,setToast]=useState("");
  const nums=Object.values(marks).map(Number).filter(n=>!isNaN(n)&&n<=maxMarks);
  const average=nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;
  const save=(message:string)=>{setToast(message);setTimeout(()=>setToast(""),2200)};
  const distribution=[nums.filter(n=>n<40).length,nums.filter(n=>n>=40&&n<60).length,nums.filter(n=>n>=60&&n<80).length,nums.filter(n=>n>=80).length];
  return <section>
    {toast&&<div className="success-toast"><Icon name="check" size={17}/>{toast}</div>}
    <div className="module-heading"><div><span className="eyebrow">Teacher portal</span><h1>Marks entry</h1><p>Enter and submit marks for your assigned subjects.</p></div></div>
    <div className="report-filters"><label>Class<select><option>Grade 8</option><option>Grade 7</option></select></label><label>Section<select><option>B</option><option>A</option></select></label><label>Subject<select><option>Science</option><option>Biology</option></select></label><label>Exam type<select><option>Monthly</option><option>Mid-term</option><option>Final</option></select></label><label>Total marks<input type="number" value={maxMarks} onChange={e=>setMaxMarks(Math.max(1,Number(e.target.value)))}/></label></div>
    <div className="marks-summary"><ReportNumber label="Class average" value={`${average.toFixed(1)}%`} change="+3.2% vs last exam"/><ReportNumber label="Highest" value={`${Math.max(...nums)} / ${maxMarks}`} change="+2 marks"/><ReportNumber label="Lowest" value={`${Math.min(...nums)} / ${maxMarks}`} change="+4 marks"/><ReportNumber label="Pass rate" value={`${Math.round(nums.filter(n=>n>=maxMarks*.5).length/nums.length*100)}%`} change="+5% vs last exam"/><GraphCard title="Score distribution" subtitle="Updates as marks are typed" mini={[["Below 40",`${distribution[0]}`],["40–60",`${distribution[1]}`],["60–80",`${distribution[2]}`],["80–100",`${distribution[3]}`]]}><MiniBars labels={["<40","40–60","60–80","80+"]} values={distribution.map(n=>Math.max(n,0.2))} unit=" students"/></GraphCard></div>
    <article className="card marks-entry-table"><div className="marks-row marks-head"><span>Roll No</span><span>Student Name</span><span>Marks Obtained</span><span>Percentage</span><span>Grade</span><span>Remarks</span></div>{teacherStudents.map(student=>{const mark=Number(marks[student.roll]);const invalid=mark>maxMarks;const percentage=invalid?0:mark/maxMarks*100;const failing=!invalid&&percentage<50;return <div className={`marks-row ${failing?"failing":""}`} key={student.roll}><span>{student.roll}</span><strong>{student.name}</strong><div><input className={invalid?"invalid":""} type="number" value={marks[student.roll]||""} onChange={e=>setMarks({...marks,[student.roll]:e.target.value})}/>{invalid&&<small>Maximum is {maxMarks}</small>}</div><span>{invalid?"—":`${percentage.toFixed(1)}%`}</span><b>{invalid?"—":gradeFor(percentage)}</b><input placeholder={failing?"Support required":"Add remarks..."}/></div>})}</article>
    <div className="form-actions"><button onClick={()=>save("Marks saved as draft")}>Save Draft</button><button>Import from Excel</button><button className="primary" onClick={()=>window.confirm("Submit these marks to the Principal?")&&save("Marks submitted to Principal")}>Submit to Principal</button></div>
  </section>;
}

function TeacherClassReports() {
  const [view,setView]=useState<"Numbers"|"Graphs"|"Both">("Both");
  const [selected,setSelected]=useState<string|null>(null);
  return <section>
    <div className="report-title"><div><span className="eyebrow">Teacher portal</span><h1>Class reports</h1><p>Attendance and performance for your assigned classes.</p></div><div className="view-toggle">{(["Numbers","Graphs","Both"] as const).map(item=><button className={view===item?"active":""} onClick={()=>setView(item)} key={item}>{item}</button>)}</div></div>
    <div className="report-filters"><label>Class<select><option>Grade 8</option><option>Grade 7</option><option>Grade 9</option></select></label><label>Section<select><option>B</option><option>A</option></select></label><label>Subject<select><option>Science</option><option>Biology</option></select></label><label>Period<select><option>Weekly</option><option>Daily</option><option>Monthly</option></select></label><label>Exam<select><option>Monthly</option><option>Mid-term</option><option>Final</option></select></label><div className="export-actions"><button onClick={()=>window.print()}>PDF</button><button>Excel</button><button onClick={()=>window.print()}>Print</button></div></div>
    {view!=="Graphs"&&<div className="teacher-report-numbers">{[["Attendance","94.2%"],["Present","26"],["Absent","1"],["Late","1"],["Low attendance","2"],["Class average","84.6%"],["Highest","94%"],["Lowest","48%"],["Pass rate","92%"],["Fail count","2"]].map(([l,v],i)=><ReportNumber key={l} label={l} value={v} change={i%3===0?"+2.4% vs last period":"+1 vs last period"} negative={l==="Fail count"}/>)}</div>}
    {view!=="Numbers"&&<div className="report-graphs"><GraphCard title="Attendance trend" subtitle="Weekly attendance %" mini={[["Mon","92%"],["Tue","94%"],["Wed","93%"],["Thu","95%"],["Fri","94%"]]}><TrendLine values={[88,91,89,93,92]} labels={["Mon","Tue","Wed","Thu","Fri"]}/></GraphCard><GraphCard title="Present vs absent" subtitle="Current class" mini={[["Present","26"],["Absent","1"],["Late","1"]]}><div className="donut-report attendance"><div><strong>94.2%</strong><span>present</span></div></div></GraphCard><GraphCard title="Day-wise heatmap" subtitle="This month" mini={[["Best day","98%"],["Lowest day","88%"],["Average","94.2%"]]}><div className="heatmap">{Array.from({length:31},(_,i)=><i key={i} title={`${i+1} May: ${88+(i*7)%10}%`} style={{opacity:.35+((i*7)%10)/15}}/>)}</div></GraphCard><GraphCard title="Subject performance" subtitle="Average marks" mini={[["Science","86%"],["English","84%"],["Math","82%"],["Urdu","79%"]]}><MiniBars labels={["Science","English","Math","Urdu","Islamiat"]} values={[86,84,82,79,88]} color="#557ab7"/></GraphCard><GraphCard title="Grade distribution" subtitle="Students by grade" mini={[["A+","5"],["A","9"],["B","8"],["C–F","6"]]}><div className="donut-report grades"><div><strong>14</strong><span>A grades</span></div></div></GraphCard><GraphCard title="Exam trend & score distribution" subtitle="Monthly to final" mini={[["Monthly","78%"],["Mid-term","82%"],["Final","85%"]]}><TrendLine values={[74,78,80,82,85]} labels={["M1","M2","Monthly","Mid","Final"]} color="#557ab7"/></GraphCard></div>}
    <article className="card report-table-card"><div className="card-head"><div><h3>Student details</h3><p>Select a student to view their profile</p></div></div><div className="report-table teacher-student-table"><div className="table-row table-header"><span>Student</span><span>Roll No</span><span>Attendance</span><span>Marks</span><span>Percentage</span><span>Grade</span><span>Status</span></div>{teacherStudents.map((student,i)=><button className="table-row" onClick={()=>setSelected(student.name)} key={student.roll}><span>{student.name}</span><span>{student.roll}</span><span>{92+i%6}%</span><span>{94-i*4}/100</span><span>{94-i*4}%</span><span>{gradeFor(94-i*4)}</span><span className={i===0?"percent-good":i>5?"percent-bad":"percent-warn"}>{i===0?"Topper":i>5?"Weak":"Average"}</span></button>)}</div></article>
    {selected&&<div className="student-panel"><button onClick={()=>setSelected(null)}><Icon name="close"/></button><span className="avatar">{selected.split(" ").map(n=>n[0]).join("")}</span><h2>{selected}</h2><p>Grade 8B • Science</p><TrendLine values={[72,78,82,85,89]} labels={["M1","M2","M3","Mid","Now"]}/><h3>Strengths</h3><p>Scientific reasoning, class participation</p><h3>Needs support</h3><p>Long-form written responses</p><h3>Parent contact</h3><p>+92 300 123 4567</p></div>}
  </section>;
}

function TeacherUtilityPage({ page }: { page: string }) {
  const copy: Record<string,[string,string,string[]]> = {
    Homework:["Homework","Create assignments and review submissions from your classes.",["Lab reflection • Grade 8B","Ecosystem worksheet • Grade 7A","Biology research • Grade 9C"]],
    Timetable:["My timetable","Your assigned periods, rooms, and subjects.",["Monday • 5 periods","Tuesday • 4 periods","Wednesday • 5 periods"]],
    Students:["My students","Students in your assigned Science and Biology classes.",teacherStudents.slice(0,3).map(student=>`${student.name} • ${student.roll}`)],
    Messages:["Messages","Communicate with parents, students, and school leadership.",["Principal Office • Mid-term reminder","Mrs. Khan • Ayesha’s progress","Grade 8B group • Lab schedule"]],
    Leave:["Leave requests","Submit and review your personal leave requests.",["Casual leave • 12 June • Pending","Medical leave • 4 April • Approved","Annual leave balance • 8 days"]],
    Notices:["School notices","Updates and announcements from the Principal.",["Emergency drill briefing • Urgent","Parent-teacher meeting • 30 May","Mid-term marks deadline • 2 June"]],
  };
  const [title,description,items]=copy[page]||[page,"Your teacher workspace.",[]];
  return <section><div className="module-heading"><div><span className="eyebrow">Teacher portal</span><h1>{title}</h1><p>{description}</p></div><button className="primary">{page==="Messages"?"New message":page==="Leave"?"Request leave":page==="Homework"?"Add homework":"View calendar"}<Icon name="arrow" size={16}/></button></div><div className="module-summary">{items.map((item,i)=><article className="card" key={item}><span className={`module-symbol symbol-${i}`}><Icon name={page==="Messages"?"bell":page==="Timetable"?"clock":"book"}/></span><p>{page}</p><strong className="utility-title">{item.split(" • ")[0]}</strong><small>{item.split(" • ").slice(1).join(" • ")||"Assigned to you"}</small></article>)}</div><article className="card empty-workspace"><Icon name={page==="Notices"?"bell":"folder"} size={34}/><h3>{page} workspace</h3><p>Select an item above to view details. Only your assigned classes and subjects are shown.</p></article></section>;
}

function Dashboard({ role, onNavigate }: { role: Role; onNavigate: (page:string)=>void }) {
  if (role === "Principal") return <><div className="quick-actions principal-quick"><strong>Quick access</strong><button onClick={()=>onNavigate("Learning Zone")}><Icon name="trophy"/>Learning Zone</button><button onClick={()=>onNavigate("Attendance")}><Icon name="calendar"/>Attendance</button><button onClick={()=>onNavigate("Reports")}><Icon name="chart"/>Reports</button></div><PrincipalReport kind="dashboard"/></>;
  if (role === "Teacher") return <TeacherDashboard onNavigate={onNavigate}/>;
  const person = roleData[role];
  const dashboardCopy: Record<Role, { intro: string; action: string; metrics: [string, string, string, string, string, number?][] }> = {
    Principal: { intro: "Here’s what’s happening across GGHSS Pacca Chang today.", action: "View school report", metrics: [["calendar", "green", "School attendance", "94.6%", "+1.2% from last week", 94], ["chart", "blue", "Average score", "82.4%", "4.2% above term goal", 82], ["chart", "yellow", "Reports ready", "8", "Weekly and monthly"], ["bell", "purple", "Active notices", "6", "92% read rate"]] },
    Teacher: { intro: "You have five classes and three items to review today.", action: "Open class report", metrics: [["calendar", "green", "Attendance marked", "2 / 5", "Next: Grade 8B"], ["book", "blue", "Classes today", "5", "128 students"], ["quiz", "yellow", "Quizzes to grade", "24", "Science & Biology"], ["folder", "purple", "Homework review", "18", "Due by tomorrow"]] },
    Student: { intro: "You’re on track—here’s your learning plan for today.", action: "View my progress", metrics: [["calendar", "green", "My attendance", "96.8%", "Present today", 96], ["chart", "blue", "My average", "88.2%", "+4.1% this term", 88], ["quiz", "yellow", "Quizzes due", "1", "Science at 09:00"], ["folder", "purple", "Homework", "3", "One due today"]] },
    Parent: { intro: "Here’s Ethan’s attendance, results, and progress today.", action: "View Ethan’s report", metrics: [["calendar", "green", "Ethan’s attendance", "96.8%", "Present today", 96], ["chart", "blue", "Current result", "88.2%", "+4.1% this term", 88], ["book", "yellow", "Latest score", "18 / 20", "Algebra checkpoint"], ["bell", "purple", "New updates", "2", "From Science & English"]] },
  };
  const copy = dashboardCopy[role];
  return <>
    <section className="welcome">
      <div><span className="eyebrow">Monday, 26 May</span><h1>Good morning, {person.name.split(" ")[role === "Principal" ? 1 : 0]}.</h1><p>{copy.intro}</p></div>
      <button className="primary"><Icon name="chart" size={18}/> {copy.action}</button>
    </section>

    <section className="metrics">
      {copy.metrics.map(([icon, tone, label, value, detail, progress]) => <MetricCard key={label} icon={icon} tone={tone} label={label} value={value} detail={detail} progress={progress}/>)}
    </section>

    <section className="dashboard-grid">
      <article className="card performance">
        <div className="card-head"><div><h3>{role === "Principal" ? "School academic performance" : role === "Teacher" ? "My classes’ performance" : role === "Parent" ? "Ethan’s academic progress" : "My academic progress"}</h3><p>Average score across all subjects</p></div><select aria-label="Report period"><option>This month</option><option>This week</option></select></div>
        <div className="chart-wrap">
          <div className="y-axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
          <div className="bars">
            {[["Math", 78, 86], ["Science", 70, 82], ["English", 74, 90], ["History", 64, 76], ["Arts", 81, 88]].map(([name, last, current]) => <div className="bar-group" key={name}><div className="bar-pair"><i style={{ height: `${last}%` }}/><i style={{ height: `${current}%` }}/></div><span>{name}</span></div>)}
          </div>
        </div>
        <div className="legend"><span><i className="last"/> Last month</span><span><i className="current"/> This month</span></div>
      </article>

      <article className="card attendance-card">
        <div className="card-head"><div><h3>{role === "Principal" ? "Today’s attendance" : role === "Teacher" ? "My class attendance" : role === "Parent" ? "Ethan’s attendance" : "My attendance"}</h3><p>{role === "Principal" ? "Across all classes" : "Current term overview"}</p></div><button><Icon name="arrow" size={18}/></button></div>
        <div className="donut-row">
          <div className="donut"><div><strong>94.6%</strong><span>present</span></div></div>
          <div className="attendance-legend">
            <div><span><i className="present"/>Present</span><strong>768</strong></div>
            <div><span><i className="absent"/>Absent</span><strong>28</strong></div>
            <div><span><i className="late"/>Late</span><strong>16</strong></div>
          </div>
        </div>
        <button className="soft-button">View attendance details</button>
      </article>

      <article className="card activity">
        <div className="card-head"><div><h3>Today at GGHSS Pacca Chang</h3><p>Upcoming classes and tasks</p></div><button>View calendar</button></div>
        <div className="timeline">
          <div><time>09:00</time><i className="blue-dot"/><span><strong>Science quiz</strong><small>Grade 8B • Room 204</small></span><b>In 30 min</b></div>
          <div><time>11:30</time><i className="purple-dot"/><span><strong>Faculty review</strong><small>Conference room A</small></span><b>Today</b></div>
          <div><time>14:00</time><i className="green-dot"/><span><strong>Robotics club</strong><small>Innovation lab</small></span><b>Today</b></div>
        </div>
      </article>

      <article className="card safety">
        <div className="card-head"><div><h3>Safety & wellbeing</h3><p>Live monitoring overview</p></div><span className="live"><i/> Live</span></div>
        <div className="safety-grid">
          <div><span className="safety-icon good"><Icon name="shield"/></span><p><strong>Cybersecurity</strong><small>All systems protected</small></p><b>Secure</b></div>
          <div><span className="safety-icon warn"><Icon name="bell"/></span><p><strong>Campus alarms</strong><small>Last check: 08:15</small></p><b>Normal</b></div>
          <div><span className="safety-icon blue"><Icon name="clock"/></span><p><strong>Mobile usage</strong><small>Daily school average</small></p><b>1h 42m</b></div>
        </div>
      </article>

      <article className="card learning">
        <div className="learning-copy"><span className="eyebrow">Learning streak</span><h3>Curiosity is on a roll</h3><p>Students completed 328 learning challenges this week — a new school record.</p><button className="primary">Explore learning games <Icon name="arrow" size={17}/></button></div>
        <div className="trophy"><span><Icon name="trophy" size={42}/></span><strong>7</strong><small>day streak</small></div>
      </article>
    </section>
  </>;
}

const moduleData: Record<string, {
  summary: [string, string, string][];
  title: string;
  description: string;
  rows: [string, string, string, string][];
}> = {
  Attendance: {
    title: "Attendance overview",
    description: "Monitor daily attendance, punctuality, and absence trends.",
    summary: [["Today", "94.6%", "768 students present"], ["This week", "95.2%", "+1.2% from last week"], ["Needs review", "12", "Unverified absences"]],
    rows: [["Grade 6", "186 / 194", "95.9%", "Excellent"], ["Grade 7", "190 / 201", "94.5%", "On track"], ["Grade 8", "198 / 211", "93.8%", "Review"], ["Grade 9", "194 / 206", "94.2%", "On track"]],
  },
  Academics: {
    title: "Academic progress",
    description: "Review marks, subject performance, and learning outcomes.",
    summary: [["School average", "82.4%", "+4.2% above goal"], ["Top subject", "English", "88.6% average"], ["Improving", "Science", "+6.4% this month"]],
    rows: [["Mathematics", "81%", "84%", "Improving"], ["Science", "76%", "82%", "Improving"], ["English", "87%", "89%", "Excellent"], ["History", "74%", "78%", "On track"]],
  },
  Quizzes: {
    title: "Quizzes & assessments",
    description: "Create, schedule, and review classroom assessments.",
    summary: [["Active", "12", "Across 8 classes"], ["Due this week", "4", "2 awaiting review"], ["Average score", "84%", "+3% this term"]],
    rows: [["Science: Ecosystems", "Grade 8B", "Today, 09:00", "Live"], ["Algebra checkpoint", "Grade 7A", "28 May", "Scheduled"], ["English vocabulary", "Grade 6C", "30 May", "Draft"], ["World History", "Grade 9A", "Completed", "Review"]],
  },
  Homework: {
    title: "Homework center",
    description: "Track assignments, submissions, and completion rates.",
    summary: [["Completion", "86%", "+5% this week"], ["Due today", "18", "Across all grades"], ["Late", "7", "Follow-up needed"]],
    rows: [["Geometry worksheet", "Mathematics", "Today", "92% submitted"], ["Lab reflection", "Science", "Tomorrow", "78% submitted"], ["Reading journal", "English", "29 May", "84% submitted"], ["Research outline", "History", "31 May", "61% submitted"]],
  },
  "Learning games": {
    title: "Learning games",
    description: "Build confidence through challenges, streaks, and rewards.",
    summary: [["Challenges played", "1,284", "+18% this week"], ["Active streaks", "328", "7-day school record"], ["Points earned", "48.2k", "Across all learners"]],
    rows: [["Math Sprint", "Mathematics", "426 plays", "4.9 rating"], ["Eco Explorer", "Science", "318 plays", "4.8 rating"], ["Word Quest", "English", "287 plays", "4.7 rating"], ["Timeline Trek", "History", "253 plays", "4.6 rating"]],
  },
  Reports: {
    title: "Reports & insights",
    description: "Generate weekly and monthly reports for your school community.",
    summary: [["Weekly reports", "24", "Updated this morning"], ["Monthly reports", "8", "Ready to share"], ["Engagement", "91%", "+7% this month"]],
    rows: [["Weekly attendance", "All grades", "20–26 May", "Ready"], ["Academic progress", "Grade 8", "May 2025", "Ready"], ["Parent engagement", "All families", "May 2025", "Generating"], ["Safety summary", "Whole school", "May 2025", "Ready"]],
  },
  "Safety center": {
    title: "Safety center",
    description: "Monitor cybersecurity, campus alarms, and digital wellbeing.",
    summary: [["System status", "Secure", "All services protected"], ["Campus alarms", "Normal", "Checked at 08:15"], ["Mobile average", "1h 42m", "12 min below target"]],
    rows: [["Network protection", "Cybersecurity", "Live monitoring", "Secure"], ["Fire alarm system", "Campus", "Checked 08:15", "Normal"], ["Access control", "Main buildings", "Checked 08:02", "Normal"], ["Mobile wellbeing", "Student devices", "Updated hourly", "Healthy"]],
  },
  Notifications: {
    title: "School notifications",
    description: "Create announcements and keep the school community informed.",
    summary: [["Published today", "6", "4 school-wide"], ["Scheduled", "3", "For this week"], ["Read rate", "92%", "+8% this month"]],
    rows: [["Campus maintenance", "All families", "Published 08:30", "Sent"], ["Science fair reminder", "Grades 7–9", "Scheduled 14:00", "Scheduled"], ["Attendance follow-up", "28 families", "Draft", "Review"], ["Weekly principal note", "Whole school", "Friday 09:00", "Scheduled"]],
  },
};

function getModule(active: string, role: Role) {
  const aliases: Record<string, string> = {
    "Mark attendance": "Attendance", "My attendance": "Attendance", "Child attendance": "Attendance",
    Gradebook: "Academics", "My results": "Academics", Results: "Academics",
    "My quizzes": "Quizzes", "My homework": "Homework",
    "Class reports": "Reports", Progress: "Reports",
  };
  const key = aliases[active] || active;
  const base = moduleData[key];
  if (!base) return null;

  if (role === "Teacher" && key === "Attendance") return {
    ...base, title: "Mark attendance", description: "Record today’s attendance for your classes.",
    summary: [["Next class", "Grade 8B", "Starts at 09:00"], ["Marked today", "2 / 5", "Three classes remaining"], ["Absent", "4", "Across your classes"]],
    rows: [["Grade 8B", "28 students", "09:00 • Science", "Mark now"], ["Grade 7A", "26 students", "10:15 • Science", "Upcoming"], ["Grade 9C", "24 students", "12:30 • Biology", "Upcoming"], ["Grade 8A", "27 students", "Completed 08:15", "Submitted"]],
  };
  if (role === "Teacher" && key === "Quizzes") return {
    ...base, title: "Manage quizzes", description: "Generate assessments, assign classes, and grade responses.",
    rows: [["Ecosystems quiz", "Grade 8B • 10 questions", "Today, 09:00", "Grade"], ["Cells & systems", "Grade 7A • 12 questions", "28 May", "Edit"], ["Biology review", "Grade 9C • 15 questions", "30 May", "Draft"], ["Lab safety", "Grade 8A • 8 questions", "86% average", "Results"]],
  };
  if (role === "Teacher" && key === "Homework") return {
    ...base, title: "Manage homework", description: "Create assignments and review student submissions.",
    rows: [["Lab reflection", "Grade 8B • 28 students", "Due tomorrow", "Review 18"], ["Ecosystem diagram", "Grade 7A • 26 students", "Due 29 May", "Edit"], ["Research outline", "Grade 9C • 24 students", "Due 31 May", "12 submitted"], ["Safety worksheet", "Grade 8A • 27 students", "Completed", "Grade"]],
  };
  if (role === "Student" && key === "Attendance") return {
    ...base, title: "My attendance", description: "Your attendance and punctuality record for the current term.",
    summary: [["Today", "Present", "Checked in at 08:12"], ["This term", "96.8%", "2 days absent"], ["Punctuality", "98%", "One late arrival"]],
    rows: [["Today, 26 May", "All lessons", "Checked in 08:12", "Present"], ["Friday, 23 May", "All lessons", "Checked in 08:09", "Present"], ["Thursday, 22 May", "All lessons", "Checked in 08:16", "Present"], ["Wednesday, 21 May", "Medical leave", "Approved by school", "Absent"]],
  };
  if (role === "Student" && key === "Quizzes") return {
    ...base, title: "My quizzes", description: "Complete upcoming quizzes and review your latest scores.",
    summary: [["Due today", "1", "Science at 09:00"], ["Completed", "18", "This term"], ["Average", "88%", "+5% this month"]],
    rows: [["Science: Ecosystems", "10 questions • 15 minutes", "Due today 10:00", "Start quiz"], ["English vocabulary", "20 questions • 12 minutes", "Due 29 May", "Upcoming"], ["Algebra checkpoint", "Completed 23 May", "Score 18 / 20", "Review"], ["World History", "Completed 20 May", "Score 16 / 20", "Review"]],
  };
  if (role === "Student" && key === "Homework") return {
    ...base, title: "My homework", description: "Complete assignments, upload work, and track feedback.",
    rows: [["Lab reflection", "Science • Ms. Carter", "Due tomorrow", "Submit work"], ["Geometry worksheet", "Mathematics • Mr. Lee", "Due today", "Submitted"], ["Reading journal", "English • Ms. Brown", "Due 29 May", "Continue"], ["Research outline", "History • Mr. Jones", "Due 31 May", "Not started"]],
  };
  if (role === "Parent" && key === "Attendance") return {
    ...base, title: "Ethan’s attendance", description: "Daily attendance and punctuality for Ethan Parker, Grade 8B.",
    summary: [["Today, 26 May", "Present", "Arrived at 08:12"], ["This term", "96.8%", "Above school average"], ["Punctuality", "98%", "One late arrival"]],
    rows: [["Today, 26 May", "All lessons", "Checked in 08:12", "Present"], ["Friday, 23 May", "All lessons", "Checked in 08:09", "Present"], ["Thursday, 22 May", "All lessons", "Checked in 08:16", "Present"], ["Wednesday, 21 May", "Medical leave", "Approved", "Absent"]],
  };
  if (role === "Parent" && key === "Academics") return {
    ...base, title: "Ethan’s results", description: "Current marks and subject progress for Grade 8B.",
    summary: [["Overall result", "88.2%", "+4.1% this term"], ["Best subject", "English", "92% average"], ["Latest result", "18 / 20", "Algebra checkpoint"]],
    rows: [["English", "Ms. Brown", "92% current mark", "Excellent"], ["Science", "Ms. Carter", "89% current mark", "Improving"], ["Mathematics", "Mr. Lee", "86% current mark", "On track"], ["History", "Mr. Jones", "84% current mark", "On track"]],
  };
  return base;
}

function ModulePage({ active, role }: { active: string; role: Role }) {
  if (role === "Principal" && active === "Attendance") return <PrincipalReport kind="attendance"/>;
  if (role === "Principal" && active === "Academics") return <PrincipalReport kind="academics"/>;
  if (role === "Principal" && active === "Reports") return <PrincipalReport kind="reports"/>;
  if (role === "Teacher" && active === "Attendance") return <TeacherAttendance/>;
  if (role === "Teacher" && active === "Marks Entry") return <TeacherMarks/>;
  if (role === "Teacher" && active === "Class Reports") return <TeacherClassReports/>;
  if (role === "Teacher") return <TeacherUtilityPage page={active}/>;
  const data = getModule(active, role);
  if (!data) return <Dashboard role={role} onNavigate={()=>{}}/>;
  const action = role === "Teacher" && active === "Mark attendance" ? "Start attendance" :
    role === "Teacher" && active === "Quizzes" ? "Generate quiz" :
    role === "Teacher" && active === "Homework" ? "Create homework" :
    role === "Student" && active === "My quizzes" ? "Start quiz" :
    role === "Student" && active === "My homework" ? "Open homework" :
    role === "Principal" && active === "Notifications" ? "New notification" :
    role === "Principal" && active === "Reports" ? "Generate report" : "View details";
  return <section className="module-page">
    <div className="module-heading">
      <div><span className="eyebrow">{role} portal</span><h1>{data.title}</h1><p>{data.description}</p></div>
      <button className="primary">{action}<Icon name="arrow" size={17}/></button>
    </div>
    <div className="module-summary">
      {data.summary.map(([label, value, detail], index) => <article className="card" key={label}>
        <span className={`module-symbol symbol-${index}`}><Icon name={active === "Safety center" ? "shield" : active.toLowerCase().includes("attendance") ? "calendar" : active === "Learning games" ? "trophy" : "chart"}/></span>
        <p>{label}</p><strong>{value}</strong><small>{detail}</small>
      </article>)}
    </div>
    <div className="module-layout">
      <article className="card data-card">
        <div className="card-head"><div><h3>{active.includes("Reports") ? "Recent reports" : active === "Safety center" ? "Live systems" : role === "Parent" ? "Ethan’s latest records" : `${active} details`}</h3><p>Updated just now</p></div><button>View all</button></div>
        <div className="data-table">
          {data.rows.map((row, index) => <div className="data-row" key={row[0]}>
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
            <span><strong>{row[0]}</strong><small>{row[1]}</small></span>
            <span className="row-meta">{row[2]}</span>
            <b className={row[3].includes("Review") || row[3] === "Draft" || row[3] === "Start quiz" || row[3] === "Submit work" || row[3] === "Mark now" ? "status-warn" : ""}>{row[3]}</b>
            <button aria-label={`Open ${row[0]}`}><Icon name="arrow" size={16}/></button>
          </div>)}
        </div>
      </article>
      <article className="card module-insight">
        <div className="card-head"><div><h3>{active === "Safety center" ? "System health" : "This month"}</h3><p>At a glance</p></div></div>
        <div className="insight-ring"><div><strong>{active === "Safety center" ? "100%" : "86%"}</strong><span>{active === "Safety center" ? "protected" : "goal reached"}</span></div></div>
        <h4>{active === "Learning games" ? "A new school record" : "Performance is on track"}</h4>
        <p>{role === "Parent" ? "Ethan is progressing well and has no items requiring attention." : role === "Student" ? "You’re making steady progress. Keep your learning streak going." : "School-wide results are trending positively compared with last month."}</p>
        <button className="soft-button">Open monthly insight</button>
      </article>
    </div>
  </section>;
}

type MobileRole = "Student" | "Parent";
type MobileNotice = { id:number; type:string; title:string; message:string; time:string; urgent?:boolean; read:boolean; target:string; group:string };

const mobileNotices: MobileNotice[] = [
  {id:7,type:"Games",title:"New quiz assigned by Ms. Sana",message:"Fractions Sprint is ready in your Learning Zone.",time:"Just now",urgent:true,read:false,target:"Learning Zone",group:"Today"},
  {id:8,type:"Games",title:"Daily challenge is ready",message:"Complete Science Lightning Round for 100 bonus points.",time:"2 min ago",read:false,target:"Learning Zone",group:"Today"},
  {id:9,type:"Games",title:"You earned a new badge",message:"Your 7-Day Streak badge has been unlocked.",time:"Today",read:false,target:"Learning Zone",group:"Today"},
  {id:10,type:"Games",title:"You moved up the leaderboard",message:"You are now ranked #4 in Class 8-B.",time:"Today",read:false,target:"Learning Zone",group:"Today"},
  {id:1,type:"Notices",title:"Winter Break Notice",message:"School will remain closed from 23 December.",time:"5 min ago",urgent:true,read:false,target:"Notices",group:"Today"},
  {id:2,type:"Results",title:"Mid-term Math result is out",message:"You scored 92/100. Great work!",time:"28 min ago",read:false,target:"Results",group:"Today"},
  {id:3,type:"Homework",title:"Science homework due tomorrow",message:"Submit your ecosystem worksheet before 6 PM.",time:"1 hour ago",read:false,target:"Homework",group:"Today"},
  {id:4,type:"Messages",title:"Ms. Sana replied",message:"Your teacher replied to the question about fractions.",time:"Yesterday",read:true,target:"Chat",group:"Yesterday"},
  {id:5,type:"Attendance",title:"Attendance marked",message:"You were marked Late today at 8:14 AM.",time:"Yesterday",read:true,target:"Attendance",group:"Yesterday"},
  {id:6,type:"Exams",title:"English paper in 2 days",message:"Your exam starts Wednesday at 9:00 AM.",time:"2 days ago",read:true,target:"Timetable",group:"Earlier"},
];

const studentAccess = [
  ["Learning Zone","🎮"],["Attendance","📅"],["Results","📊"],["Chat","💬"],["Homework","📝"],["Timetable","🕐"],
  ["Study Material","📚"],["Notices","📣"],["Fees","🧾"],["Leave Status","🌿"],["Report Card","🏆"],
];
const parentAccess = [
  ["Learning Zone","🎮"],["Attendance","📅"],["Results","📊"],["Fees","💳"],["Messages","💬"],["Feedback","⭐"],
  ["Homework & Timetable","📝"],["Notices","📣"],["Leave","🌿"],["Meetings","🤝"],["Remarks","💡"],["Report Card","🏆"],
];
const readOnlyPages = new Set(["Attendance","Results","Timetable","Study Material","Notices","Fees","Leave Status","Report Card","Homework & Timetable","Remarks"]);

function MobileTop({ role, page, unread, bell, home, profile, logout, lang, setLang, child, setChild }: { role:MobileRole; page:string; unread:number; bell:()=>void; home:()=>void; profile:()=>void; logout:()=>void; lang:string; setLang:(v:string)=>void; child:number; setChild:(v:number)=>void }) {
  const [profileOpen,setProfileOpen]=useState(false);
  return <header className="mobile-top">
    {page!=="Home Dashboard"?<button className="mobile-back" onClick={home}><Icon name="arrow"/></button>:<span className="mobile-logo"><img src="/school-logo.png" alt="School crest"/></span>}
    <div className="mobile-title">{role==="Parent"&&page==="Home Dashboard"?<select value={child} onChange={e=>setChild(Number(e.target.value))}><option value={0}>Ali Hassan • Class 8B</option><option value={1}>Sara Hassan • Class 4A</option></select>:<><strong>{page}</strong><small>GGHSS Pacca Chang</small></>}</div>
    <button className="language-button" onClick={()=>setLang(lang==="EN"?"UR":"EN")}>{lang==="EN"?"اردو":"EN"}</button>
    <button className="mobile-bell" onClick={bell} aria-label="Open notifications"><Icon name="bell" size={20}/>{unread>0&&<b>{unread}</b>}</button>
    <button className="mobile-avatar" onClick={()=>setProfileOpen(!profileOpen)} aria-label="Open profile menu" aria-expanded={profileOpen}>{role==="Parent"?"DH":"EP"}</button>
    {profileOpen&&<div className="mobile-profile-menu">
      <div><strong>{role==="Parent"?"Daniel Hassan":"Ethan Parker"}</strong><small>{role} account</small></div>
      <button onClick={()=>{setProfileOpen(false);profile();}}><Icon name="star" size={17}/><span>My profile</span></button>
      <button className="profile-logout" onClick={logout}><Icon name="logout" size={17}/><span>Logout</span></button>
    </div>}
  </header>;
}

function MobileCards({ role, child }: { role:MobileRole; child:number }) {
  const cards = role==="Student"
    ? [["Attendance","96.8%","+1.2%"],["Average Marks","88.2%","+5%"],["Class Rank","#3","Top 10%"],["Pending Homework","3","Due soon"]]
    : [["Attendance",child?"94.1%":"96.8%","+1.2%"],["Average Marks",child?"84.6%":"88.2%","+5%"],["Class Rank",child?"#7":"#3","This term"],["Fee Due",child?"₨ 0":"₨ 8,500","Due 3 Jun"]];
  return <div className="mobile-number-grid">{cards.map(([label,value,change],i)=><article key={label}><span>{label}</span><strong>{value}</strong><small>{change}</small><Sparkline color={i===3?"#F97316":"#10a88a"} values={[25+i*2,34,31,46,42,58,64]}/></article>)}</div>;
}

function MobileDashboard({ role, child, navigate }: { role:MobileRole; child:number; navigate:(v:string)=>void }) {
  const studentName=child?"Sara Hassan":"Ali Hassan";
  const access=role==="Student"?studentAccess:parentAccess;
  return <div className="mobile-page dashboard-mobile">
    <section className={`mobile-hero ${role.toLowerCase()}`}><div><span>Monday, 26 May</span><h1>Assalam o Alaikum,<br/>{role==="Student"?"Ethan": "Daniel"}!</h1><p>{role==="Student"?"Class 8B • Roll NS-801":`${studentName} • ${child?"Class 4A":"Class 8B"}`}</p></div><div className="hero-avatar">{role==="Student"?"👦":"👨‍👧"}</div><i/></section>
    {role==="Student"&&<button className="dashboard-play-card" onClick={()=>navigate("Learning Zone")}><span>🎮</span><div><small>LEARNING ZONE</small><strong>Ready for today’s challenge?</strong><p>Earn 100 bonus points • 24 min played</p></div><b>Play</b></button>}
    {role==="Parent"&&<button className="mobile-alert" onClick={()=>navigate("Fees")}><span>⏰</span><div><strong>Fee due in 8 days</strong><small>₨ 8,500 for Ali Hassan</small></div><Icon name="arrow" size={16}/></button>}
    <MobileCards role={role} child={child}/>
    <section className="mobile-section"><div className="mobile-section-head"><h2>Today’s timetable</h2><button onClick={()=>navigate(role==="Student"?"Timetable":"Homework & Timetable")}>View all</button></div><div className="mobile-timeline">{[["08:00","Math","Mr. Bilal • Room 12"],["09:00","Science","Ms. Sana • Lab 1"],["10:15","English","Ms. Hira • Room 12"]].map((row,i)=><div className={i===1?"active":""} key={row[0]}><time>{row[0]}</time><i/><span><strong>{row[1]}</strong><small>{row[2]}</small></span>{i===1&&<b>Now</b>}</div>)}</div></section>
    <div className="mobile-swipe">
      <section className="mobile-chart-card"><h2>6-month attendance</h2><TrendLine values={[84,86,88,90,89,94]} labels={["Dec","Jan","Feb","Mar","Apr","May"]} color={role==="Student"?"#F97316":"#10B981"}/></section>
      <section className="mobile-chart-card"><h2>Latest exam marks</h2><MiniBars labels={["Math","Eng","Urdu","Sci","Isl"]} values={[92,86,78,89,91]} color={role==="Student"?"#F97316":"#10B981"}/></section>
    </div>
    <section className="mobile-section deadlines"><div className="mobile-section-head"><h2>Coming up</h2></div><div><span>🧪</span><p><strong>Science homework</strong><small>Due tomorrow • 6:00 PM</small></p><b>1 day</b></div><div><span>📖</span><p><strong>English mid-term</strong><small>Wednesday • 9:00 AM</small></p><b>2 days</b></div></section>
    <button className="notice-preview" onClick={()=>navigate("Notifications")}><span>📣</span><div><b>Urgent</b><strong>Winter Break Notice</strong><small>From Principal • 5 min ago</small></div><Icon name="arrow" size={18}/></button>
    <button className="messages-preview" onClick={()=>navigate(role==="Student"?"Chat":"Messages")}><span>💬</span><div><strong>3 unread messages</strong><small>Ms. Sana replied to your message</small></div><b>Open Chat</b></button>
    <section className="motivation"><span>🏆</span><div><strong>You improved 5% since last exam!</strong><small>Keep going — you’re doing amazing.</small></div><div className="badge-row"><i>⭐</i><i>🔥</i><i>🎯</i></div></section>
    {role==="Parent"&&<section className="mobile-section family-card"><h2>Family overview</h2><div><span>👦</span><p><strong>Ali • Class 8B</strong><small>96.8% attendance • 88.2% marks</small></p><b>₨8,500 due</b></div><div><span>👧</span><p><strong>Sara • Class 4A</strong><small>94.1% attendance • 84.6% marks</small></p><b>Paid</b></div></section>}
    <section className="mobile-section quick-grid"><h2>Quick access</h2><div>{access.map(([label,emoji],i)=><button key={label} onClick={()=>navigate(label)} style={{"--tile":`${["#fff0e6","#e8f5ff","#e8f8f3","#f4edff","#fff7db"][i%5]}`} as React.CSSProperties}><span>{emoji}</span><small>{label}</small></button>)}</div></section>
  </div>;
}

function MobileAttendance({ role }: { role:MobileRole }) {
  return <div className="mobile-page"><div className="readonly-tag">🔒 View only</div><div className="mobile-filters"><select><option>May 2025</option><option>April 2025</option></select><select><option>All subjects</option><option>Math</option><option>Science</option></select><select><option>Monthly</option><option>Weekly</option><option>Daily</option></select></div>
    <div className="mobile-number-grid five">{[["Attendance","96.8%"],["Present","22"],["Absent","1"],["Late","1"],["Leave","0"]].map(([a,b])=><article key={a}><span>{a}</span><strong>{b}</strong></article>)}</div>
    <section className="mobile-chart-card"><h2>Monthly trend</h2><TrendLine values={[86,88,90,91,89,94]} labels={["Dec","Jan","Feb","Mar","Apr","May"]} color={role==="Student"?"#F97316":"#10B981"}/></section>
    <div className="mobile-dual"><section className="mobile-chart-card"><h2>Attendance split</h2><div className="donut-report attendance"><div><strong>96.8%</strong><span>present</span></div></div></section><section className="mobile-chart-card"><h2>May calendar</h2><div className="heatmap mobile-heatmap">{Array.from({length:31},(_,i)=><i className={i===8?"abs":i===15?"late":i%7>4?"holiday":"present"} key={i} title={`${i+1} May`}/>)}</div></section></div>
    {role==="Parent"&&<label className="mobile-switch"><span><strong>Absence alerts</strong><small>Alert me when my child is absent</small></span><input type="checkbox" defaultChecked/><i/></label>}
    <section className="mobile-list"><h2>Daily record</h2>{[["26 May","Monday","Present","On time"],["23 May","Friday","Present","On time"],["22 May","Thursday","Late","Arrived 8:14"],["21 May","Wednesday","Absent","Medical leave"]].map(row=><div key={row[0]}><span><strong>{row[0]}</strong><small>{row[1]}</small></span><b className={row[2].toLowerCase()}>{row[2]}</b><small>{row[3]}</small></div>)}</section>
    {role==="Parent"&&<button className="mobile-primary">Apply for Leave</button>}
  </div>;
}

function MobileResults({ role }: { role:MobileRole }) {
  const subjects=[["Math","92","85","A+"],["English","86","82","A"],["Urdu","78","80","B"],["Science","89","83","A"],["Islamiat","91","86","A+"],["Social Studies","84","79","A"]];
  return <div className="mobile-page"><div className="readonly-tag">🔒 View only</div><div className="mobile-filters"><select><option>Mid-term</option><option>Monthly</option><option>Final</option></select><select><option>2024–25</option><option>2023–24</option></select></div>
    <div className="result-hero"><span>🏅</span><div><small>Overall result</small><strong>88.2%</strong><p>Grade A • Class Rank #3</p></div><b>PASS</b></div>
    <div className="mobile-number-grid"><article><span>Total Marks</span><strong>529/600</strong></article><article><span>Percentage</span><strong>88.2%</strong></article><article><span>Grade</span><strong>A</strong></article><article><span>Class Rank</span><strong>#3</strong></article></div>
    <section className="mobile-chart-card"><h2>Subject performance</h2><MiniBars labels={subjects.map(s=>s[0].slice(0,4))} values={subjects.map(s=>Number(s[1]))} color={role==="Student"?"#F97316":"#10B981"}/></section>
    <section className="mobile-chart-card"><h2>Exam progress</h2><TrendLine values={[72,78,81,84,88]} labels={["M1","M2","M3","Mid","Now"]} color={role==="Student"?"#F97316":"#10B981"}/></section>
    {role==="Parent"&&<div className="plain-summary">💡 <strong>Ali is strong in Math and Science and needs a little support in Urdu.</strong></div>}
    <section className="subject-results"><h2>Subject results</h2>{subjects.map(row=><article key={row[0]}><span className={Number(row[1])>=90?"strong":""}>{row[0][0]}</span><div><strong>{row[0]}</strong><small>{Number(row[1])>85?"Excellent progress":"Good effort, keep practising"}</small></div><p><strong>{row[1]}/100</strong><small>Class avg {row[2]}%</small></p><b>{row[3]}</b></article>)}</section>
    <div className="mobile-actions"><button>Download Report Card</button><button>Share</button>{role==="Parent"&&<button>Message Teacher</button>}</div>
  </div>;
}

function MobileChat({ role }: { role:MobileRole }) {
  const [open,setOpen]=useState(false); const [tab,setTab]=useState(role==="Student"?"Teachers":"Teachers");
  if(open)return <div className="mobile-page mobile-chat"><div className="safe-banner">🛡️ Be kind and respectful. Chat hours: 7 AM–8 PM</div><div className="chat-person"><span>👩‍🏫</span><div><strong>Ms. Sana Malik</strong><small>Science • Online</small></div><button onClick={()=>setOpen(false)}>Close</button></div><div className="bubbles"><p className="teacher">Assalam o Alaikum! How can I help you?<small>10:24 AM</small></p><p className="mine">I need help with question 4, please.<small>10:25 AM ✓✓</small></p><p className="teacher">Of course. The diagram shows how energy moves through the ecosystem.<small>10:27 AM</small></p><i>Ms. Sana is typing…</i></div><div className="chat-compose"><button>📎</button><input placeholder="Write a message…"/><button>🎤</button><button className="send">➤</button></div></div>;
  return <div className="mobile-page"><div className="mobile-tabs">{(role==="Student"?["Teachers","Class Group","Doubts"]:["Teachers","Class Teacher","School Office"]).map(item=><button className={tab===item?"active":""} onClick={()=>setTab(item)} key={item}>{item}</button>)}</div>{role==="Student"&&tab==="Doubts"&&<button className="mobile-primary">+ Ask a Doubt</button>}<div className="safe-banner">🛡️ School-safe chat • No private student-to-student messages</div><section className="teacher-list">{[["👩‍🏫","Ms. Sana Malik","Science • Online","I’ve replied to your question","2"],["👨‍🏫","Mr. Bilal Ahmed","Mathematics • Class Teacher","Great improvement this week",""],["👩‍🏫","Ms. Hira Khan","English • Away","Remember your reading task","1"],["👨‍🏫","Mr. Usman Ali","Urdu • Online","See you in class tomorrow",""]].map(row=><button key={row[1]} onClick={()=>setOpen(true)}><span>{row[0]}</span><div><strong>{row[1]}</strong><small>{row[2]}</small><p>{row[3]}</p></div><time>10:24</time>{row[4]&&<b>{row[4]}</b>}</button>)}</section></div>;
}

function MobileNotifications({ role, notices, setNotices, navigate, settings, setSettings }: { role:MobileRole; notices:MobileNotice[]; setNotices:(v:MobileNotice[])=>void; navigate:(v:string)=>void; settings:boolean; setSettings:(v:boolean)=>void }) {
  const [filter,setFilter]=useState("All");
  const [touchStart,setTouchStart]=useState(0);
  if(settings)return <div className="mobile-page notification-settings"><div className="settings-illustration">🔔</div><h2>Notification settings</h2><p>Choose what you’d like to hear about.</p>{(role==="Student"?["Notices","Marks and Results","Homework Reminders","Teacher Messages","Attendance Alerts","Exam Reminders"]:["Attendance Alerts","Results","Fees","Notices","Messages","Feedback","Meetings","Leave"]).map(item=><label key={item}><span>{item}</span><input type="checkbox" defaultChecked/><i/></label>)}<div className="quiet-hours"><strong>Quiet hours</strong><input type="time" defaultValue="21:00"/><span>to</span><input type="time" defaultValue="06:30"/></div><label><span>Sound</span><input type="checkbox" defaultChecked/><i/></label><label><span>Vibration</span><input type="checkbox" defaultChecked/><i/></label><button className="mobile-primary" onClick={()=>setSettings(false)}>Save settings</button></div>;
  const filtered=notices.filter(n=>filter==="All"||(filter==="Unread"?!n.read:n.type===filter));
  return <div className="mobile-page notifications-page"><div className="notifications-actions"><button onClick={()=>setNotices(notices.map(n=>({...n,read:true})))}>Mark all as read</button><button onClick={()=>setSettings(true)}>⚙️</button></div><div className="notification-chips">{["All","Unread",...(role==="Student"?["Games","Notices","Results","Homework","Messages","Attendance","Exams"]:["Games","Attendance","Results","Fees","Notices","Messages","Feedback","Meetings","Leave"])].map(item=><button className={filter===item?"active":""} onClick={()=>setFilter(item)} key={item}>{item}</button>)}</div>{filtered.length===0?<div className="friendly-empty"><span>🎉</span><h2>You’re all caught up!</h2><p>No new notifications right now.</p></div>:["Today","Yesterday","Earlier"].map(group=><section className="notification-group" key={group}>{filtered.some(n=>n.group===group)&&<h3>{group}</h3>}{filtered.filter(n=>n.group===group).map(note=><div className={`notification-card ${!note.read?"unread":""}`} key={note.id} onTouchStart={event=>setTouchStart(event.touches[0].clientX)} onTouchEnd={event=>{const distance=event.changedTouches[0].clientX-touchStart;if(distance < -70)setNotices(notices.filter(n=>n.id!==note.id));if(distance > 70)setNotices(notices.map(n=>n.id===note.id?{...n,read:true}:n))}}><button className="delete-note" onClick={()=>setNotices(notices.filter(n=>n.id!==note.id))}>×</button><span className={`notification-icon ${note.type.toLowerCase()}`}>{note.type==="Games"?"🎮":note.type==="Results"?"📊":note.type==="Homework"?"📝":note.type==="Messages"?"💬":note.type==="Attendance"?"📅":note.type==="Exams"?"⏰":"📣"}</span><button className="notification-copy" onClick={()=>{setNotices(notices.map(n=>n.id===note.id?{...n,read:true}:n));navigate(note.target)}}><div>{note.urgent&&<b>Urgent</b>}<strong>{note.title}</strong>{!note.read&&<i/>}</div><p>{note.message}</p><small>{note.time}</small></button></div>)}</section>)}</div>;
}

function MobileMore({ role, navigate, logout }: { role:MobileRole; navigate:(v:string)=>void; logout:()=>void }) {
  const items=role==="Student"?[["Learning Zone","🎮"],["Homework","📝"],["Timetable","🕐"],["Study Material","📚"],["Notices","📣"],["Fees","🧾"],["Leave Status","🌿"],["Profile","👤"]]:[["Learning Zone","🎮"],["Messages","💬"],["Feedback","⭐"],["Homework & Timetable","📝"],["Notices","📣"],["Leave","🌿"],["Meetings","🤝"],["Remarks","💡"],["Profile","👤"]];
  return <div className="mobile-page more-page"><div className="more-profile"><span>{role==="Student"?"👦":"👨"}</span><div><strong>{role==="Student"?"Ethan Parker":"Daniel Hassan"}</strong><small>{role==="Student"?"Class 8B • NS-801":"Parent of Ali & Sara"}</small></div></div>{items.map(([label,emoji])=><button key={label} onClick={()=>navigate(label)}><span>{emoji}</span><strong>{label}</strong><Icon name="arrow" size={17}/></button>)}<button className="mobile-logout" onClick={logout}><span>↪</span><strong>Logout</strong></button></div>;
}

function MobileGeneric({ page, role }: { page:string; role:MobileRole }) {
  const canAct=(role==="Student"&&["Homework","Study Material"].includes(page))||(role==="Parent"&&["Fees","Feedback","Leave","Meetings"].includes(page));
  const icons:Record<string,string>={Homework:"📝",Timetable:"🕐","Study Material":"📚",Notices:"📣",Fees:"💳","Leave Status":"🌿",Profile:"👤","Report Card":"🏆",Feedback:"⭐",Leave:"🌿",Meetings:"🤝",Remarks:"💡","Homework & Timetable":"📖"};
  return <div className="mobile-page generic-mobile">{readOnlyPages.has(page)&&<div className="readonly-tag">🔒 View only</div>}<section className="generic-hero"><span>{icons[page]||"📚"}</span><div><h2>{page}</h2><p>{role==="Student"?"Only your personal school information is shown.":"Showing information for Ali Hassan."}</p></div></section>
    {page==="Fees"&&<><div className="mobile-number-grid"><article><span>Total Fee</span><strong>₨85k</strong></article><article><span>Paid</span><strong>₨76.5k</strong></article><article><span>Pending</span><strong>₨8.5k</strong></article><article><span>Due</span><strong>3 Jun</strong></article></div><section className="mobile-chart-card"><h2>Payment history</h2><MiniBars labels={["Jan","Feb","Mar","Apr","May"]} values={[100,100,100,100,0]} color="#10B981"/></section></>}
    {page==="Profile"&&<section className="profile-mobile"><div className="profile-photo">{role==="Student"?"👦":"👨"}</div><h2>{role==="Student"?"Ethan Parker":"Daniel Hassan"}</h2><p>{role==="Student"?"Class 8B • Roll NS-801 • Admission 2022-184":"Father of Ali Hassan and Sara Hassan"}</p>{["Date of birth • 14 March 2012","Class teacher • Mr. Bilal Ahmed","Contact • +92 300 123 4567","Language • English / اردو"].map(x=><div key={x}>{x}</div>)}<button>Change Password</button><button>Language</button><button>Dark mode</button></section>}
    {page!=="Fees"&&page!=="Profile"&&<section className="generic-list">{["Latest update","Previous record","School information"].map((item,i)=><article key={item}><span>{i===0?"⭐":"📄"}</span><div><strong>{item}</strong><small>{i===0?"Updated today":"View full details and attachments"}</small></div><b>{i===0?"New":""}</b><Icon name="arrow" size={16}/></article>)}</section>}
    {canAct&&<button className="mobile-primary">{page==="Fees"?"Pay Now":page==="Feedback"?"+ New Feedback":page==="Leave"?"Apply for Leave":page==="Meetings"?"Book a Meeting":page==="Homework"?"Submit Homework":"Bookmark Material"}</button>}
  </div>;
}

function MobilePortal({ role, logout, assignedQuiz }: { role:MobileRole; logout:()=>void; assignedQuiz?:string }) {
  const [page,setPage]=useState("Home Dashboard"); const [previous,setPrevious]=useState("Home Dashboard");
  const [notices,setNotices]=useState<MobileNotice[]>(()=>role==="Parent"?[
    {id:21,type:"Games",title:"Ali completed Math Rush",message:"Ali scored 90% and earned 120 points.",time:"Just now",read:false,target:"Learning Zone",group:"Today"},
    {id:22,type:"Games",title:"Daily play limit reached",message:"Ali completed today’s 1-hour learning limit.",time:"Today",read:false,target:"Learning Zone",group:"Today"},
    ...mobileNotices.filter(note=>note.type!=="Games"),
  ]:[
    {...mobileNotices[0],message:`${assignedQuiz||"Fractions Sprint"} is ready in your Learning Zone.`},
    ...mobileNotices.slice(1),
  ]);
  const [lang,setLang]=useState("EN"); const [child,setChild]=useState(0); const [settings,setSettings]=useState(false);
  const unread=notices.filter(n=>!n.read).length;
  const navigate=(target:string)=>{setPrevious(page);setPage(target);window.scrollTo({top:0,behavior:"smooth"})};
  const mainTabs=role==="Student"?[["Home Dashboard","grid"],["Attendance","calendar"],["Results","chart"],["Chat","bell"],["More","menu"]]:[["Home Dashboard","grid"],["Attendance","calendar"],["Results","chart"],["Fees","folder"],["More","menu"]];
  const notificationPage=page==="Notifications";
  return <div className={`mobile-app ${role.toLowerCase()} ${lang==="UR"?"rtl":""}`}>
    <div className="offline-banner">You’re back online</div>
    <MobileTop role={role} page={notificationPage?"Notifications":page} unread={unread} bell={()=>navigate("Notifications")} home={()=>{notificationPage?setPage(previous):setPage("Home Dashboard");setSettings(false)}} profile={()=>navigate("Profile")} logout={logout} lang={lang} setLang={setLang} child={child} setChild={setChild}/>
    <main className="mobile-content">
      {page==="Home Dashboard"?<MobileDashboard role={role} child={child} navigate={navigate}/>:
       page==="Attendance"?<MobileAttendance role={role}/>:
       page==="Results"?<MobileResults role={role}/>:
       page==="Learning Zone"?<LearningZone role={role} assignedQuiz={assignedQuiz} child={child}/>:
       (page==="Chat"||page==="Messages")?<MobileChat role={role}/>:
       page==="More"?<MobileMore role={role} navigate={navigate} logout={logout}/>:
       page==="Notifications"?<MobileNotifications role={role} notices={notices} setNotices={setNotices} navigate={navigate} settings={settings} setSettings={setSettings}/>:
       <MobileGeneric page={page} role={role}/>}
    </main>
    {!notificationPage&&<nav className="mobile-bottom">{mainTabs.map(([label,icon])=><button className={page===label?"active":""} onClick={()=>navigate(label)} key={label}><Icon name={icon} size={20}/><span>{label}</span>{label==="Chat"&&unread>0&&<i>{unread}</i>}</button>)}</nav>}
  </div>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("Principal");
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readAlerts, setReadAlerts] = useState<string[]>([]);
  const [assignedQuiz, setAssignedQuiz] = useState("Fractions Sprint");

  const logout = () => {
    setLoggedIn(false);
    setActive("Dashboard");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  if (!loggedIn) return <Login onLogin={(selected) => { setRole(selected); setActive("Dashboard"); setLoggedIn(true); }}/>;
  if (role === "Student" || role === "Parent") return <MobilePortal role={role} logout={logout} assignedQuiz={assignedQuiz}/>;
  const person = roleData[role];
  const roleAlerts = role === "Teacher"
    ? [["Quiz completed by 25 students","Open the Class 8-B game report."],["5 students have not played","Send a reminder before tomorrow."]]
    : [["Weekly Learning Zone summary","Participation is up 8% across Classes 1–12."],["Class 12-B participation is low","Open analytics to review engagement."]];
  const unreadAlerts=roleAlerts.filter(([title])=>!readAlerts.includes(title)).length;
  return <div className="app-shell">
    <Sidebar role={role} active={active} setActive={setActive} open={menuOpen} close={() => setMenuOpen(false)} logout={logout}/>
    <main className="main-area">
      <header>
        <button className="menu-button" onClick={() => setMenuOpen(true)}><Icon name="menu"/></button>
        <div className="search"><Icon name="search" size={18}/><input aria-label="Search" placeholder="Search students, classes, reports..."/><kbd>⌘ K</kbd></div>
        <div className="header-actions">
          <button className="notification" onClick={()=>setNotificationsOpen(!notificationsOpen)} aria-label="Open notifications"><Icon name="bell"/>{unreadAlerts>0&&<b>{unreadAlerts}</b>}</button>
          {notificationsOpen&&<div className="desktop-notifications"><div><strong>Notifications</strong><button onClick={()=>setReadAlerts(roleAlerts.map(item=>item[0]))}>Mark all read</button></div>{roleAlerts.map(([title,detail])=><button className={readAlerts.includes(title)?"":"unread"} key={title} onClick={()=>{setReadAlerts([...readAlerts,title]);setNotificationsOpen(false);setActive("Learning Zone")}}><span>🎮</span><p><strong>{title}</strong><small>{detail}</small></p></button>)}</div>}
          <div className="role-select">
            <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)} aria-label="Open profile menu" aria-expanded={profileOpen}>
              <span className="avatar">{person.initials}</span>
              <span className="profile-copy"><strong>{person.name}</strong><small>{role === "Teacher" ? "Science • Biology" : role}</small></span>
              <Icon name="arrow" size={15}/>
            </button>
            {profileOpen&&<div className="profile-menu">
              <div className="profile-menu-heading"><span className="avatar">{person.initials}</span><span><strong>{person.name}</strong><small>{person.subtitle}</small></span></div>
              <label>Switch portal
                <select value={role} onChange={(e) => { setRole(e.target.value as Role); setActive("Dashboard"); setProfileOpen(false); }}>{roles.map((item) => <option key={item}>{item}</option>)}</select>
              </label>
              <button className="profile-logout" onClick={logout}><Icon name="logout" size={18}/><span>Logout</span></button>
            </div>}
          </div>
        </div>
      </header>
      <div className="content">
        {active === "Dashboard" ? <Dashboard role={role} onNavigate={setActive}/> : active === "Learning Zone" ? <LearningZone role={role} assignedQuiz={assignedQuiz} onAssign={setAssignedQuiz}/> : <ModulePage active={active} role={role}/>}
      </div>
    </main>
  </div>;
}

export default App;
