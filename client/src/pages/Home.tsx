import { useState } from "react";
import { BookOpen, ChevronRight, GraduationCap, Plus, Sparkles, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const colors = ["#f39a57", "#4f96db", "#69c996", "#9a7bd7"];

export default function Home() {
  const [mode, setMode] = useState<"home" | "student" | "teacher">("home");
  const [newActivity, setNewActivity] = useState("");
  const stateQuery = trpc.local.state.useQuery();
  const createActivity = trpc.local.createActivity.useMutation({
    onSuccess: () => {
      stateQuery.refetch();
      setNewActivity("");
      toast.success("Atividade salva nesta máquina");
    },
    onError: () => toast.error("Não foi possível salvar a atividade"),
  });
  const completeActivity = trpc.local.completeActivity.useMutation({
    onSuccess: () => stateQuery.refetch(),
  });

  if (mode === "student") {
    return <StudentView activities={stateQuery.data?.activities ?? []} completed={stateQuery.data?.completedActivities ?? []} onBack={() => setMode("home")} onComplete={(id) => completeActivity.mutate({ id })} />;
  }

  if (mode === "teacher") {
    return (
      <main className="app-shell">
        <section className="panel teacher-panel">
          <button className="back-link" onClick={() => setMode("home")}>← Voltar ao início</button>
          <div className="section-heading"><div className="icon-orb purple"><GraduationCap size={24} /></div><div><p className="eyebrow">Área do professor</p><h1>Minhas atividades</h1></div></div>
          <p className="muted">Tudo criado aqui fica salvo na máquina que está executando o aplicativo e aparece para os demais computadores da rede.</p>
          <div className="create-card">
            <label htmlFor="activity">Criar nova atividade</label>
            <div className="input-row"><input id="activity" value={newActivity} onChange={(event) => setNewActivity(event.target.value)} placeholder="Ex.: Caça às vogais" /><button className="primary-button small" disabled={!newActivity.trim() || createActivity.isPending} onClick={() => createActivity.mutate({ title: newActivity, subject: "Atividade livre" })}><Plus size={17} /> Adicionar</button></div>
          </div>
          <div className="activity-list">{(stateQuery.data?.activities ?? []).map((activity, index) => <div className="activity-row" key={activity.id}><span className="activity-dot" style={{ background: colors[index % colors.length] }} /><div><strong>{activity.title}</strong><small>{activity.subject}</small></div><span className="saved-tag">salva</span></div>)}</div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell home-shell">
      <section className="hero-card">
        <div className="cloud cloud-one" /><div className="cloud cloud-two" />
        <div className="sparkle sparkle-one">✦</div><div className="sparkle sparkle-two">✦</div>
        <div className="brand"><div className="abc"><span>A</span><span>B</span><span>C</span></div><div className="kids">KIDS</div></div>
        <p className="tagline">Aprender pode ser uma aventura!</p>
        <div className="welcome-badge"><Sparkles size={15} /> Um mundo de descobertas</div>
        <div className="mode-grid">
          <button className="mode-card green" onClick={() => setMode("student")}><div className="mode-icon"><Star size={24} fill="currentColor" /></div><div><strong>ALUNO</strong><small>Vamos aprender juntos!</small></div><ChevronRight className="arrow" size={23} /></button>
          <button className="mode-card blue" onClick={() => setMode("teacher")}><div className="mode-icon"><Users size={24} /></div><div><strong>PROFESSOR</strong><small>Organize suas atividades</small></div><ChevronRight className="arrow" size={23} /></button>
        </div>
      </section>
      <footer><BookOpen size={15} /> ABC Kids <span>•</span> Aprender brincando</footer>
    </main>
  );
}

function StudentView({ activities, completed, onBack, onComplete }: { activities: { id: string; title: string; subject: string }[]; completed: string[]; onBack: () => void; onComplete: (id: string) => void }) {
  return <main className="app-shell"><section className="panel student-panel"><button className="back-link" onClick={onBack}>← Voltar ao início</button><div className="section-heading"><div className="icon-orb green"><Star size={24} fill="currentColor" /></div><div><p className="eyebrow">Área do aluno</p><h1>Escolha uma aventura</h1></div></div><div className="progress-card"><div><strong>{completed.length}</strong><span>atividades concluídas</span></div><div className="progress-stars">{[0, 1, 2].map((star) => <Star key={star} size={22} fill={star < completed.length ? "#f4b94e" : "none"} />)}</div></div><div className="activity-grid">{activities.map((activity, index) => <button key={activity.id} className="student-activity" style={{ borderTopColor: colors[index % colors.length] }} onClick={() => onComplete(activity.id)}><span className="number-bubble">{index + 1}</span><strong>{activity.title}</strong><small>{completed.includes(activity.id) ? "Concluída! ✓" : activity.subject}</small></button>)}</div></section></main>;
}
