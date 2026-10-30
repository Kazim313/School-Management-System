import { useState } from "react";

export type LearningRole = "Principal" | "Teacher" | "Student" | "Parent";

type LearningZoneProps = {
  role: LearningRole;
  assignedQuiz?: string;
  child?: number;
  onAssign?: (title: string) => void;
};

const subjects = ["All", "Math", "English", "Urdu", "Science", "Islamiat", "Social Studies"];
const games = [
  ["🧠", "Quiz Master", "Science", "Medium", "92%"],
  ["⚡", "Math Rush", "Math", "Hard", "860"],
  ["🔤", "Word Builder", "English", "Easy", "88%"],
  ["🃏", "Memory Match", "Urdu", "Medium", "740"],
  ["🧪", "Science Lab", "Science", "Medium", "90%"],
  ["🗺️", "Pakistan Explorer", "Social Studies", "Easy", "84%"],
  ["🌙", "Islamiat Quest", "Islamiat", "Easy", "96%"],
  ["✏️", "Fill the Blanks", "Urdu", "Medium", "81%"],
  ["🧩", "Puzzle Time", "Math", "Hard", "720"],
];
const leaderboard = [
  ["1", "Areeba", "Class 8-B", "4,820", "🥇"],
  ["2", "Hania", "Class 8-A", "4,610", "🥈"],
  ["3", "Zoya", "Class 8-B", "4,440", "🥉"],
  ["4", "Ayesha (You)", "Class 8-B", "4,280", "⭐"],
  ["5", "Mahnoor", "Class 8-C", "4,110", "🎯"],
  ["6", "Fatima", "Class 8-A", "3,980", "📚"],
];

function StatCards({ items }: { items: [string, string, string][] }) {
  return <div className="lz-stats">{items.map(([label,value,detail])=><article className="lz-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>)}</div>;
}

function BarChart({ title, labels = ["Math","English","Urdu","Science","Islamiat","S. Studies"], values = [88,82,69,91,86,77] }: { title:string; labels?:string[]; values?:number[] }) {
  return <article className="lz-card lz-chart"><h3>{title}</h3><div className="lz-bars">{values.map((value,index)=><div key={labels[index]}><i style={{height:`${value}%`}} title={`${labels[index]}: ${value}%`}/><span>{labels[index]}</span></div>)}</div></article>;
}

function LineChart({ title }: { title:string }) {
  return <article className="lz-card lz-chart"><h3>{title}</h3><svg className="lz-line" viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M5 105H295M5 75H295M5 45H295M5 15H295"/><polyline points="8,94 55,77 103,83 151,50 199,60 247,30 292,18"/>{[[8,94],[55,77],[103,83],[151,50],[199,60],[247,30],[292,18]].map(([x,y])=><circle key={x} cx={x} cy={y} r="4"/>)}</svg><div className="lz-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></article>;
}

function StudentZone({ assignedQuiz }: { assignedQuiz?:string }) {
  const [view,setView]=useState<"home"|"game"|"result"|"leaderboard"|"progress">("home");
  const [filter,setFilter]=useState("All");
  const [difficulty,setDifficulty]=useState("Medium");
  const [question,setQuestion]=useState(0);
  const [selected,setSelected]=useState("");
  const [paused,setPaused]=useState(false);
  const [sound,setSound]=useState(true);
  const [dark,setDark]=useState(false);
  const questions=[
    {q:"Which organ pumps blood around the human body?",options:["Brain","Heart","Lungs","Liver"],correct:"Heart",why:"The heart pumps oxygen-rich blood through the circulatory system."},
    {q:"What is 12 × 8?",options:["86","92","96","108"],correct:"96",why:"12 groups of 8 make 96."},
    {q:"پاکستان کا قومی پھول کون سا ہے؟",options:["گلاب","چنبیلی","سورج مکھی","کنول"],correct:"چنبیلی",why:"چنبیلی پاکستان کا قومی پھول ہے۔"},
  ];
  const current=questions[question];
  const startGame=()=>{setQuestion(0);setSelected("");setView("game")};
  const next=()=>{if(question===questions.length-1){setView("result");setSelected("");}else{setQuestion(question+1);setSelected("");}};

  if(view==="game")return <section className={`learning-zone student-zone lz-gameplay ${dark?"lz-dark":""}`}>
    <div className="lz-game-top"><button onClick={()=>setPaused(true)}>Ⅱ</button><div><span>Time</span><strong>00:42</strong></div><div className="lz-lives">♥ ♥ ♥</div><div><span>Score</span><strong>160</strong></div><div><span>Streak</span><strong>🔥 3</strong></div></div>
    <div className="lz-progress"><i style={{width:`${(question+1)/questions.length*100}%`}}/></div>
    <article className={`lz-question ${selected?(selected===current.correct?"correct":"wrong"):""}`}>
      <span>Question {question+1} of {questions.length} • Science</span><h1>{current.q}</h1>
      <div className="lz-answers">{current.options.map(option=><button className={selected===option?(option===current.correct?"correct":"wrong"):selected&&option===current.correct?"correct":""} onClick={()=>!selected&&setSelected(option)} key={option}>{option}</button>)}</div>
      {selected&&<div className="lz-feedback"><strong>{selected===current.correct?"✨ Correct! +10 points":"Not quite — keep going!"}</strong><p>{current.why}</p>{selected===current.correct&&<b>Speed bonus +5 • Streak x2</b>}</div>}
    </article>
    <div className="lz-powerups"><button>◐ 50/50 <small>2 left</small></button><button>↪ Skip <small>1 left</small></button><button>＋ Extra time <small>1 left</small></button>{selected&&<button className="lz-primary" onClick={next}>{question===questions.length-1?"See result":"Next question"} →</button>}</div>
    {paused&&<div className="lz-modal"><div><span className="lz-modal-icon">⏸️</span><h2>Game paused</h2><p>Your score is safe. Take a breath and continue when ready.</p><button className="lz-primary" onClick={()=>setPaused(false)}>Resume game</button><button onClick={startGame}>Restart</button><label><input type="checkbox" checked={sound} onChange={e=>setSound(e.target.checked)}/> Sound {sound?"on":"off"}</label><button className="danger" onClick={()=>window.confirm("Quit this game? Your current progress will be lost.")&&setView("home")}>Quit game</button></div></div>}
  </section>;

  if(view==="result")return <section className={`learning-zone student-zone lz-result ${dark?"lz-dark":""}`}>
    <div className="confetti">◆ ● ▲ ★ ◆ ● ▲</div><div className="result-stars">★ ★ ★</div><span className="eyebrow">Quiz complete</span><h1>Brilliant work, Ayesha!</h1><strong className="result-score">270</strong><p>points earned • New personal best</p><div className="new-badge">🏅 <span><b>New badge unlocked</b><small>Science Star</small></span></div>
    <StatCards items={[["Correct","3","of 3"],["Wrong","0","questions"],["Accuracy","100%","Excellent"],["Time taken","1m 24s","18s faster"],["Best streak","3","answers"]]}/>
    <article className="lz-card review-list"><h3>Review answers</h3>{questions.map(item=><div key={item.q}><span>✓</span><p><strong>{item.q}</strong><small>Your answer: {item.correct} • {item.why}</small></p></div>)}</article>
    <p className="teacher-note">Ms. Sana: “Excellent understanding of today’s topic!”</p>
    <div className="lz-actions"><button className="lz-primary" onClick={startGame}>Play again</button><button onClick={()=>setView("home")}>Next game</button><button onClick={()=>navigator.clipboard?.writeText("I scored 270 points in Quiz Master!")}>Share score</button><button onClick={()=>setView("home")}>Back to Learning Zone</button></div>
  </section>;

  if(view==="leaderboard")return <section className={`learning-zone student-zone ${dark?"lz-dark":""}`}><ZoneHeading title="Leaderboard" subtitle="Friendly competition, fair play, and learning together." back={()=>setView("home")}/><div className="lz-tabs">{["My Class","My School","This Week","All Time"].map((tab,i)=><button className={i===0?"active":""} key={tab}>{tab}</button>)}</div><div className="podium"><article><span>🥈</span><b>Hania</b><small>4,610 pts</small></article><article className="first"><span>🥇</span><b>Areeba</b><small>4,820 pts</small></article><article><span>🥉</span><b>Zoya</b><small>4,440 pts</small></article></div><article className="lz-card rank-list">{leaderboard.map(row=><div className={row[1].includes("You")?"you":""} key={row[0]}><b>{row[0]}</b><span className="rank-avatar">{row[4]}</span><p><strong>{row[1]}</strong><small>{row[2]}</small></p><strong>{row[3]} pts</strong></div>)}</article><p className="fair-note">🛡️ Fair play: only first names and classes are shown. No chat, strangers, ads, or purchases.</p></section>;

  if(view==="progress")return <section className={`learning-zone student-zone ${dark?"lz-dark":""}`}><ZoneHeading title="My Progress" subtitle="Every practice session makes you stronger." back={()=>setView("home")}/><StatCards items={[["Total Points","4,280","+420 this week"],["Level","12","Explorer"],["Games Played","48","7 this week"],["Avg. Accuracy","86%","+5%"],["Daily Streak","7 days","Personal best"],["Play Time","2h 14m","This week"]]}/><div className="lz-chart-grid"><BarChart title="Accuracy by subject"/><LineChart title="Points over time"/><BarChart title="Play time per day" labels={["Mon","Tue","Wed","Thu","Fri","Sat"]} values={[32,48,25,58,42,65]}/><article className="lz-card radar-card"><h3>Strong vs weak subjects</h3><div className="lz-radar"><i/><span>Math</span><span>English</span><span>Urdu</span><span>Science</span><span>Islamiat</span></div></article></div><article className="lz-card badges"><h3>My badges</h3>{[["🏆","First Win",true],["🔥","7-Day Streak",true],["🧮","Math Wizard",true],["🔤","Word Master",false],["💯","Perfect Score",true],["🌅","Early Bird",false]].map(([icon,name,open])=><div className={open?"":"locked"} key={String(name)}><span>{icon}</span><b>{name}</b><small>{open?"Unlocked":"Keep playing"}</small></div>)}</article><div className="practice-tip">💡 You need a little practice in Urdu. Try <button onClick={startGame}>Word Builder</button> today.</div></section>;

  return <section className={`learning-zone student-zone ${dark?"lz-dark":""}`}>
    <div className="lz-hero"><div><span>LEARNING ZONE</span><h1>Ready to play, Ayesha?</h1><p>Learn, earn points, and grow your 7-day streak.</p><div className="hero-pills"><b>⭐ 4,280 points</b><b>Level 12</b><b>🔥 7 days</b></div></div><div className="play-ring"><strong>24</strong><span>of 45 min</span></div></div>
    <div className="lz-student-nav"><button onClick={()=>setView("leaderboard")}>🏆 Leaderboard</button><button onClick={()=>setView("progress")}>📈 My Progress</button><button onClick={()=>setSound(!sound)}>{sound?"🔊":"🔇"} Sound</button><button onClick={()=>setDark(!dark)}>{dark?"☀️ Light":"🌙 Dark"}</button></div>
    <article className="daily-challenge"><span>🎯</span><div><small>DAILY CHALLENGE</small><h2>Science Lightning Round</h2><p>Answer 10 questions before the timer ends.</p></div><div><b>+100 bonus</b><small>Ends in 04:18:32</small><button onClick={startGame}>Play now</button></div></article>
    <div className="lz-toolbar"><div className="lz-chips">{subjects.map(item=><button className={filter===item?"active":""} onClick={()=>setFilter(item)} key={item}>{item}</button>)}</div><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label></div>
    <div className="lz-game-grid">{games.filter(game=>filter==="All"||game[2]===filter).map(game=><article className="game-card" key={game[1]}><span>{game[0]}</span><div><small>{game[2]} • {game[3]}</small><h3>{game[1]}</h3><p>Best score: <b>{game[4]}</b></p></div><button onClick={startGame}>Play</button></article>)}</div>
    <div className="section-head"><div><h2>Assigned by teacher</h2><p>Complete these before the due date to earn bonus points.</p></div></div>
    <div className="assigned-grid"><article className="lz-card"><b>NEW</b><span>🧮</span><div><h3>{assignedQuiz||"Fractions Sprint"}</h3><p>Math • Ms. Sana Malik • Due tomorrow</p><small>10 questions • 15 minutes • +150 points</small></div><button onClick={startGame}>Start</button></article><article className="lz-card"><b className="progress-tag">IN PROGRESS</b><span>🧪</span><div><h3>Living Systems</h3><p>Science • Ms. Hira Khan • Due Friday</p><small>6 of 12 questions completed</small></div><button onClick={startGame}>Continue</button></article></div>
    <div className="safety-strip"><span>🛡️</span><p><strong>Safe learning, always</strong><small>No chat • No strangers • No ads • No purchases • Games available 7:00 AM–7:00 PM</small></p><div><b>24 / 45 min</b><small>Time for a break in 21 minutes</small></div></div>
  </section>;
}

function ZoneHeading({ title, subtitle, back, action }: { title:string; subtitle:string; back?:()=>void; action?:React.ReactNode }) {
  return <div className="lz-heading">{back&&<button className="lz-back" onClick={back}>←</button>}<div><span className="eyebrow">Learning Zone</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function TeacherZone({ assignedQuiz, onAssign }: { assignedQuiz?:string; onAssign?:(title:string)=>void }) {
  const [tab,setTab]=useState<"overview"|"create"|"assigned"|"report">("overview");
  const [title,setTitle]=useState(assignedQuiz||"Fractions Sprint");
  const [toast,setToast]=useState("");
  const assign=()=>{if(window.confirm(`Assign “${title}” to Class 8-B?`)){onAssign?.(title);setToast("Quiz assigned to 32 students");setTab("assigned");setTimeout(()=>setToast(""),2500)}};
  return <section className="learning-zone staff-zone">{toast&&<div className="success-toast">✓ {toast}</div>}<ZoneHeading title="Learning Zone Management" subtitle="Create engaging challenges and track your classes." action={<button className="lz-primary" onClick={()=>setTab("create")}>＋ New Quiz</button>}/><div className="lz-tabs">{[["overview","Overview"],["create","Create Quiz"],["assigned","Assigned Quizzes"],["report","Class Report"]].map(([key,label])=><button className={tab===key?"active":""} onClick={()=>setTab(key as typeof tab)} key={key}>{label}</button>)}</div>
    {tab==="overview"&&<><StatCards items={[["Quizzes Created","18","4 this month"],["Currently Assigned","6","Across 3 classes"],["Average Class Score","84%","+6% this term"],["Participation","92%","118 students"]]}/><div className="lz-chart-grid"><LineChart title="Participation trend"/><BarChart title="Subject accuracy"/></div><article className="lz-card lz-table"><h3>Recent assignments</h3>{[["Fractions Sprint","Class 8-B","18 of 32 completed","Due tomorrow"],["Science Lab Safety","Class 7-A","25 of 29 completed","Due Friday"],["Urdu Word Builder","Class 9-C","Completed","Average 82%"]].map(row=><div key={row[0]}><span>🎮</span><p><strong>{row[0]}</strong><small>{row[1]} • {row[3]}</small></p><b>{row[2]}</b><button onClick={()=>setTab("report")}>View</button></div>)}</article></>}
    {tab==="create"&&<div className="quiz-builder"><article className="lz-card quiz-settings"><h3>Quiz details</h3><label>Quiz title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><div><label>Class<select><option>Class 8</option><option>Class 7</option><option>Class 9</option></select></label><label>Section<select><option>B</option><option>A</option><option>C</option></select></label><label>Subject<select>{subjects.slice(1).map(s=><option key={s}>{s}</option>)}</select></label></div><div><label>Game type<select><option>Quiz Master</option><option>Math Rush</option><option>Fill the Blanks</option></select></label><label>Difficulty<select><option>Medium</option><option>Easy</option><option>Hard</option></select></label><label>Due date<input type="date" defaultValue="2025-06-06"/></label></div></article><article className="lz-card question-builder"><div className="section-head"><div><h3>Question 1</h3><p>Multiple choice • 10 points</p></div><button>Import from Excel</button></div><label>Question<input defaultValue="What is 3/4 written as a decimal?"/></label><div className="option-builder">{["0.25","0.50","0.75","1.25"].map((option,i)=><label key={option}><input type="radio" name="correct" defaultChecked={i===2}/><input defaultValue={option}/></label>)}</div><label>Explanation<textarea defaultValue="Divide 3 by 4 to get 0.75."/></label><button>＋ Add question</button></article><div className="lz-actions"><button>Save Draft</button><button>Preview</button><button className="lz-primary" onClick={assign}>Assign Quiz</button></div></div>}
    {tab==="assigned"&&<><div className="lz-tabs compact"><button className="active">Active</button><button>Completed</button><button>Drafts</button></div><div className="assignment-cards">{[[assignedQuiz||title,"Class 8-B","18 of 32 completed","56%"],["Science Lab Safety","Class 7-A","25 of 29 completed","86%"],["Word Builder","Class 9-C","12 of 30 completed","40%"]].map(row=><article className="lz-card" key={row[0]}><span>🎯</span><div><small>ACTIVE • Due 6 June</small><h3>{row[0]}</h3><p>{row[1]} • {row[2]}</p><div className="lz-progress"><i style={{width:row[3]}}/></div></div><div><button>Edit</button><button>Duplicate</button><button className="danger">Delete</button></div></article>)}</div></>}
    {tab==="report"&&<><div className="lz-filters"><select><option>Class 8</option></select><select><option>Section B</option></select><select><option>All subjects</option></select><input type="date" defaultValue="2025-05-26"/><button>Export PDF</button><button>Excel</button></div><StatCards items={[["Participation","92%","29 of 32"],["Average Score","84%","+6%"],["Avg. Accuracy","86%","On track"],["Top Scorer","Areeba","96%"]]}/><div className="lz-chart-grid"><BarChart title="Score distribution" labels={["0–40","40–60","60–70","70–80","80–90","90+"]} values={[8,18,34,58,82,44]}/><LineChart title="Participation trend"/></div><article className="lz-card lz-table"><h3>Student performance</h3>{[["Areeba Khan","96%","9m 12s","Top"],["Ayesha Malik","88%","11m 08s","On Track"],["Hania Ali","72%","14m 40s","Needs Help"],["Zoya Ahmed","—","—","Not Played"]].map(row=><div key={row[0]}><span>👧</span><p><strong>{row[0]}</strong><small>Class 8-B • Accuracy {row[1]} • {row[2]}</small></p><b>{row[3]}</b>{row[3]==="Not Played"&&<button onClick={()=>setToast("Reminder sent to Zoya")}>Send Reminder</button>}</div>)}</article></>}
  </section>;
}

function ParentZone({ child=0 }: { child?:number }) {
  const [limit,setLimit]=useState("1 hour");
  const name=child?"Sara":"Ali";
  const change=(value:string)=>{if(window.confirm(`Set ${name}’s daily play limit to ${value}?`))setLimit(value)};
  return <section className="learning-zone parent-zone"><div className="readonly-tag">🔒 View only</div><ZoneHeading title={`${name}’s Learning Zone`} subtitle="A clear view of learning through play."/ ><div className="parent-summary">💡 <strong>{name} practised Math for 2 hours this week and improved 8%.</strong></div><StatCards items={[["Total Points",child?"3,540":"4,280","+420 this week"],["Level",child?"9":"12","Explorer"],["Games Played","48","7 this week"],["Accuracy","86%","+5%"],["Play Time","2h 14m","This week"]]}/><div className="lz-chart-grid"><BarChart title="Accuracy by subject"/><LineChart title="Play time per day"/><article className="lz-card radar-card"><h3>Strong vs weak subjects</h3><div className="lz-radar"><i/><span>Math</span><span>English</span><span>Urdu</span><span>Science</span><span>Islamiat</span></div></article></div><article className="lz-card recent-games"><h3>Recent games</h3>{[["Math Rush","92%","Today"],["Science Lab","88%","Yesterday"],["Word Builder","76%","24 May"]].map(row=><div key={row[0]}><span>🎮</span><p><strong>{row[0]}</strong><small>{row[2]}</small></p><b>{row[1]}</b></div>)}</article><article className="lz-card badges"><h3>Badges earned</h3>{[["🏆","First Win"],["🔥","7-Day Streak"],["🧮","Math Wizard"],["💯","Perfect Score"]].map(row=><div key={row[1]}><span>{row[0]}</span><b>{row[1]}</b></div>)}</article><article className="lz-card limit-settings"><h3>Play-time settings</h3><label>Daily play-time limit<select value={limit} onChange={e=>change(e.target.value)}><option>30 min</option><option>1 hour</option><option>2 hours</option></select></label><label className="toggle-row"><span><strong>Quiz completion alerts</strong><small>Notify me when {name} completes a quiz</small></span><input type="checkbox" defaultChecked/></label></article></section>;
}

function PrincipalZone() {
  const [enabled,setEnabled]=useState(true);
  const [toast,setToast]=useState("");
  const confirmToggle=()=>{if(window.confirm(`${enabled?"Disable":"Enable"} Learning Zone for the whole school?`)){setEnabled(!enabled);setToast(`Learning Zone ${enabled?"disabled":"enabled"}`);setTimeout(()=>setToast(""),2200)}};
  return <section className="learning-zone staff-zone">{toast&&<div className="success-toast">✓ {toast}</div>}<ZoneHeading title="Learning Zone Analytics" subtitle="School-wide participation, progress, and safe-play controls." action={<div className="export-actions"><button onClick={()=>window.print()}>PDF</button><button>Excel</button></div>}/><StatCards items={[["Active Players","684","Across Classes 1–12"],["Games Today","1,248","+18% vs last week"],["Average Accuracy","84.6%","+4.2% this term"],["Participation","91%","724 of 796 students"]]}/><div className="lz-chart-grid"><BarChart title="Participation by class" labels={Array.from({length:12},(_,i)=>`C${i+1}`)} values={[72,76,80,85,88,82,91,94,89,86,78,74]}/><BarChart title="Subject-wise accuracy"/><LineChart title="Weekly play trend"/><article className="lz-card popular-games"><h3>Most popular games</h3><div className="lz-donut"><strong>32%</strong><span>Math Rush</span></div><ul><li>Math Rush <b>32%</b></li><li>Quiz Master <b>26%</b></li><li>Word Builder <b>19%</b></li><li>Others <b>23%</b></li></ul></article></div><div className="principal-lists"><article className="lz-card"><h3>Top performing classes</h3>{[["Class 8-B","92% accuracy"],["Class 7-A","90% accuracy"],["Class 10-C","89% accuracy"]].map((row,i)=><div key={row[0]}><b>#{i+1}</b><span>{row[0]}</span><strong>{row[1]}</strong></div>)}</article><article className="lz-card"><h3>Needs participation support</h3>{[["Class 12-B","58% participation"],["Class 11-C","62% participation"],["Class 4-A","69% participation"]].map(row=><div key={row[0]}><span>⚑</span><b>{row[0]}</b><strong>{row[1]}</strong></div>)}</article></div><article className="lz-card lz-table"><h3>Top 10 students school-wide</h3>{leaderboard.concat([["7","Maryam","Class 10-A","3,870","⭐"],["8","Iqra","Class 7-B","3,760","📚"]]).map(row=><div key={row[0]}><b>#{row[0]}</b><span>{row[4]}</span><p><strong>{row[1]}</strong><small>{row[2]}</small></p><strong>{row[3]} pts</strong></div>)}</article><article className="lz-card school-controls"><div className="section-head"><div><h3>School play controls</h3><p>Changes apply to all students after confirmation.</p></div><button className={enabled?"enabled":"disabled"} onClick={confirmToggle}>{enabled?"Enabled":"Disabled"}</button></div><div className="control-grid"><label>School play hours<span><input type="time" defaultValue="07:00"/> to <input type="time" defaultValue="19:00"/></span></label><label>Maximum daily time<select><option>45 minutes</option><option>30 minutes</option><option>1 hour</option></select></label><label>Class group<select><option>All Classes 1–12</option><option>Classes 1–5</option><option>Classes 6–8</option><option>Classes 9–12</option></select></label></div><div className="game-toggles">{games.slice(0,7).map((game,i)=><label key={game[1]}><span>{game[0]} {game[1]}</span><input type="checkbox" defaultChecked={i!==6}/></label>)}</div></article></section>;
}

export function LearningZone({ role, assignedQuiz, child, onAssign }: LearningZoneProps) {
  if(role==="Student")return <StudentZone assignedQuiz={assignedQuiz}/>;
  if(role==="Teacher")return <TeacherZone assignedQuiz={assignedQuiz} onAssign={onAssign}/>;
  if(role==="Parent")return <ParentZone child={child}/>;
  return <PrincipalZone/>;
}
