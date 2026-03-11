import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, ArrowRight, ArrowLeft, Lock, Mail, 
  Brain, FileText, ClipboardList, BookOpen, CheckSquare, MessageSquare, ExternalLink,
  Code2, Shield, CheckCircle2, AlertCircle, ShieldCheck, RefreshCw
} from "lucide-react";
import { QuasiReasoningView } from "@/components/QuasiReasoningView";
import { QuasiPaperView } from "@/components/QuasiPaperView";
import { QuasiPresentationView } from "@/components/QuasiPresentationView";
import { QuasiSearchDialog } from "@/components/QuasiSearchDialog";
import { InterviewResponses } from "@/components/InterviewResponses";
import { CodingSheet } from "@/components/CodingSheet";

const ACCESS_CODE = "QUASI2026";
const REMEMBER_KEY = "praxis-nexus-quasi-remember";

type ViewMode = "reasoning" | "paper";
type ActiveSection = null | "project" | "interview-protocol" | "coding-sheet" | "recruitment-consent" | "data-security";

function InterviewProtocol() {
  const questions = [
    {
      id: "q1",
      label: "Q1. Encounter description",
      main: "Describe a wildlife encounter you remember clearly.",
      options: ["Road/driving", "Near home", "Park/trail", "Work setting", "Other: ____"],
      optionType: "check",
      probes: ["What happened first, and what happened next?"],
    },
    {
      id: "q2",
      label: "Q2. Animal(s) involved",
      main: null,
      options: ["Deer", "Bear", "Coyote", "Snake", "Raccoon/opossum", "Birds", "Other: ____"],
      optionType: "check",
      probes: ["What makes you confident about the animal identification?"],
    },
    {
      id: "q3",
      label: "Q3. Risk perception",
      main: "How risky did it feel at the time?",
      options: ["Low", "Moderate", "High"],
      optionType: "radio",
      probes: ["What specific signs made it feel that way?"],
    },
    {
      id: "q4",
      label: "Q4. Immediate response",
      main: "What did you do in the moment?",
      options: ["Kept distance", "Left area", "Waited/stayed still", "Tried to scare away", "Took photo/video", "Called someone", "Other: ____"],
      optionType: "check",
      probes: ["Why did you choose that response?"],
    },
    {
      id: "q5",
      label: "Q5. In-the-moment information needs",
      main: "What would have helped most during the encounter? (Choose top 2)",
      options: ["Step-by-step safety guidance", "Species behavior info", "Danger signs", "Who to contact", "What to do after", "Other: ____"],
      optionType: "check",
      probes: ["What would you want it to say exactly?"],
    },
    {
      id: "q6",
      label: "Q6. Prevention supports",
      main: "Before encounters occur, what would help prevent problems?",
      options: ["Alerts", "Season/time reminders", "Route suggestions", "Education/tips", "Other: ____"],
      optionType: "check",
      probes: ["When would you realistically use that?"],
    },
    {
      id: "q7",
      label: "Q7. App features (priority ranking)",
      main: "What are your top three app features? (Rank 1\u20133)",
      options: ["'Help Now' guidance", "Reporting", "Sightings map", "Emergency/local contacts", "Notifications", "Offline/low-data mode", "Other: ____"],
      optionType: "rank",
      probes: ["What would make you trust the guidance?"],
    },
    {
      id: "q8",
      label: "Q8. Willingness to report",
      main: "Would you report encounters through an app?",
      options: ["Yes", "Maybe/depends", "No"],
      optionType: "radio",
      probes: ["What would need to be true for you to report?"],
    },
    {
      id: "q9",
      label: "Q9. Trust and governance",
      main: "Who would you trust to manage the app and its data?",
      options: ["Government", "Nonprofit", "University", "Community org", "Private company", "Other: ____"],
      optionType: "radio",
      probes: ["Why that choice?"],
    },
    {
      id: "q10",
      label: "Q10. Privacy and ethical concerns",
      main: "What privacy protections would you require?",
      options: ["Anonymous option", "Control location precision", "Retention limits", "Delete submissions", "No third-party sharing", "Other: ____"],
      optionType: "check",
      probes: ["What worries you most?"],
    },
    {
      id: "q11",
      label: "Q11. Barriers to use",
      main: "What might stop you from using the app?",
      options: ["Too complex", "Don't trust accuracy", "Data/connectivity", "Fear of consequences", "Not relevant often", "Other: ____"],
      optionType: "check",
      probes: ["Which is the biggest barrier and why?"],
    },
    {
      id: "q12",
      label: "Q12. Ideal workflow",
      main: "Walk me through the best version of the app during an encounter \u2014 from opening it to feeling safe again.",
      options: [],
      optionType: "open",
      probes: ["What do you see first? What steps do you take? What outcome do you expect?"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-violet-600">Appendix A</Badge>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-interview-title">
              Semi-Structured Interview Protocol
            </h1>
            <p className="text-muted-foreground text-sm">Qualitative Pilot Study</p>
          </div>

          <Card className="border-violet-200 dark:border-violet-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">Opening Script</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Thank you for participating. I'm exploring experiences with wildlife encounters and what kinds of information or features might be helpful in a mobile app designed to support prevention and reduce harm during encounters. Participation is voluntary. You may skip any question, and you can stop at any time. With your permission, I would like to record this interview so I can accurately capture your words. Your name will not be used in the write-up, and I will remove identifying details."
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id} className="overflow-hidden" data-testid={`card-${q.id}`}>
                <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
                  <CardTitle className="font-sans text-base text-violet-700 dark:text-violet-400">
                    {q.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {q.main && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Main question:</p>
                      <p className="text-sm text-foreground italic">"{q.main}"</p>
                    </div>
                  )}
                  {q.options.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {q.optionType === "check" ? "Options (check all that apply):" : q.optionType === "radio" ? "Options (choose one):" : "Options (rank 1\u20133):"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => (
                          <span
                            key={opt}
                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-muted/60 text-foreground"
                          >
                            <CheckSquare className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {q.probes.length > 0 && (
                    <div className="border-l-2 border-violet-300 dark:border-violet-700 pl-3">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Probe:</p>
                      {q.probes.map((probe) => (
                        <p key={probe} className="text-sm text-muted-foreground italic">"{probe}"</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-violet-200 dark:border-violet-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">Closing Question</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Is there anything else you think is important about wildlife encounters or how a mobile app could help?"
              </p>
            </CardContent>
          </Card>

          <Card className="border-violet-200 dark:border-violet-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">Closing Script</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Thank you for your time. If you think of anything else you want to add later, you can share it with me. As a reminder, participation is voluntary and your identity will be protected in the write-up."
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-sans text-lg text-amber-700 dark:text-amber-400">Interviewer Note</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Because participants are immediate family members, voluntary participation and the option to skip questions or stop at any time were reiterated to reduce any perception of obligation."
              </p>
            </CardContent>
          </Card>

          <footer className="text-center pt-4 pb-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">&copy; Felix Abayomi 2026</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

const CONSENT_STORAGE_KEY = "praxis-consent-forms";

interface ConsentFormData {
  participantId: string;
  c2Participation: string;
  c2AudioRecording: string;
  c3AudioPermission: string;
  c3ConsentAgreed: boolean;
  c3ParticipantName: string;
  c3ParticipantDate: string;
  c3ParticipantSignature: string;
  c3ResearcherSignature: string;
  c3ResearcherDate: string;
}

const EMPTY_CONSENT: ConsentFormData = {
  participantId: "",
  c2Participation: "",
  c2AudioRecording: "",
  c3AudioPermission: "",
  c3ConsentAgreed: false,
  c3ParticipantName: "",
  c3ParticipantDate: "",
  c3ParticipantSignature: "",
  c3ResearcherSignature: "",
  c3ResearcherDate: "",
};

function RecruitmentConsent() {
  const [forms, setForms] = useState<ConsentFormData[]>([{ ...EMPTY_CONSENT, participantId: "A" }, { ...EMPTY_CONSENT, participantId: "B" }]);
  const [activeForm, setActiveForm] = useState(0);
  const [cloudStatus, setCloudStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveConsentSlot = async (form: ConsentFormData, index: number) => {
    const res = await fetch(`/api/consent-forms/slot-${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: form }),
    });
    if (!res.ok) throw new Error("Server error");
  };

  const activeFormRef = useRef(activeForm);
  useEffect(() => { activeFormRef.current = activeForm; }, [activeForm]);

  // DB is the single source of truth. Local storage is only a fallback when DB is unreachable.
  const loadConsentFromCloud = async () => {
    setCloudStatus("saving");
    try {
      const res = await fetch("/api/consent-forms");
      if (res.ok) {
        const { data } = await res.json();
        if (data && Array.isArray(data) && data.length > 0) {
          setForms(data);
          localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
          setCloudStatus("saved");
          setTimeout(() => setCloudStatus("idle"), 2500);
          return;
        }
      }
    } catch { /* network error — fall through */ }

    // DB empty or unreachable — try local storage
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) as ConsentFormData[] : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        setForms(parsed);
        await Promise.all(parsed.map((f, i) => saveConsentSlot(f, i)));
        setCloudStatus("saved");
        setTimeout(() => setCloudStatus("idle"), 2500);
        return;
      }
    } catch { /* ignore */ }

    // Nothing anywhere — start with two blank participants
    setForms([{ ...EMPTY_CONSENT, participantId: "A" }, { ...EMPTY_CONSENT, participantId: "B" }]);
    setCloudStatus("idle");
  };

  useEffect(() => {
    loadConsentFromCloud();
  }, []);

  const save = (updated: ConsentFormData[]) => {
    setForms(updated);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    const idx = activeFormRef.current;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      setCloudStatus("saving");
      try {
        await saveConsentSlot(updated[idx], idx);
        setCloudStatus("saved");
        setTimeout(() => setCloudStatus("idle"), 2000);
      } catch {
        setCloudStatus("error");
      }
    }, 800);
  };

  const updateField = (field: keyof ConsentFormData, value: string | boolean) => {
    const updated = [...forms];
    updated[activeForm] = { ...updated[activeForm], [field]: value };
    save(updated);
  };

  const form = forms[activeForm];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-violet-600">Appendix C</Badge>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-consent-title">
              Recruitment Script and Informed Consent
            </h1>
            <p className="text-muted-foreground text-sm">Qualitative Pilot Study</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {forms.map((f, i) => (
              <Button
                key={i}
                variant={activeForm === i ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveForm(i)}
                className={activeForm === i ? "bg-violet-600" : ""}
                data-testid={`button-consent-form-${i}`}
              >
                Participant {f.participantId || String.fromCharCode(65 + i)}
              </Button>
            ))}
            <div className="ml-auto">
              {cloudStatus === "saving" && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" /> Saving to cloud…
                </span>
              )}
              {cloudStatus === "saved" && (
                <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" /> Saved to cloud
                </span>
              )}
              {cloudStatus === "error" && (
                <Button variant="outline" size="sm" onClick={() => uploadAllConsentsToCloud(forms)} className="gap-1.5 text-red-600 border-red-300 text-xs" data-testid="button-retry-consent-save">
                  Retry save
                </Button>
              )}
            </div>
          </div>

          <Card className="border-violet-200 dark:border-violet-900/50" data-testid="card-c1-recruitment">
            <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">C1. Recruitment Script</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Email / Text / Verbal Invitation</p>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <p className="text-sm leading-relaxed">Hello,</p>
              <p className="text-sm leading-relaxed">
                I am conducting a small-scale qualitative pilot study for a course project that explores how everyday residents who encounter wildlife perceive the potential usefulness of a mobile application for reporting wildlife encounters and receiving practical guidance. Participation involves a one-time semi-structured interview lasting approximately 30–45 minutes.
              </p>
              <p className="text-sm leading-relaxed">
                Your participation is completely voluntary. You may choose not to participate or to stop at any time. If you agree, the interview may be audio-recorded to support accurate transcription. Your name will not be used in any written report, and identifying details will be removed.
              </p>
              <p className="text-sm leading-relaxed">
                If you are interested in participating, please let me know and we can schedule a time that works for you. Thank you.
              </p>
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm">Sincerely,</p>
                <p className="text-sm font-medium">Felix O. Abayomi</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-violet-200 dark:border-violet-900/50" data-testid="card-c2-verbal-consent">
            <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">C2. Verbal Informed Consent Script</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Read Before Interview Begins</p>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <p className="text-sm leading-relaxed italic">
                "Thank you for agreeing to participate. I am conducting a qualitative pilot study for a course project on how everyday residents perceive the usefulness of a mobile app for reporting wildlife encounters and receiving guidance."
              </p>
              <p className="text-sm leading-relaxed italic">
                "Participation is voluntary. You may skip any question, take a break, or stop the interview at any time without any penalty or negative consequences. The interview will last about 30–45 minutes."
              </p>
              <p className="text-sm leading-relaxed italic">
                "With your permission, I would like to audio-record this interview so I can accurately transcribe what you say. The recording and transcript will be stored securely, and your name will not be used in the report. I will remove identifying details and use a pseudonym."
              </p>
              <p className="text-sm leading-relaxed italic">"Do you have any questions?"</p>
              <p className="text-sm leading-relaxed italic">"Do you consent to participate in this interview?"</p>
              <p className="text-sm leading-relaxed italic">"Do you consent to audio recording?"</p>
              <div className="mt-4 p-4 rounded-lg bg-muted/40 border border-border/50 space-y-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Record Responses</p>
                <div className="flex flex-wrap gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Participation</Label>
                    <div className="flex gap-3">
                      <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${form.c2Participation === "yes" ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                        <input type="radio" className="sr-only" checked={form.c2Participation === "yes"} onChange={() => updateField("c2Participation", "yes")} data-testid="radio-c2-participation-yes" />
                        <CheckCircle2 className={`h-4 w-4 ${form.c2Participation === "yes" ? "text-violet-600" : "text-muted-foreground/40"}`} />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${form.c2Participation === "no" ? "border-red-400 bg-red-500/10" : "border-border hover:border-red-300"}`}>
                        <input type="radio" className="sr-only" checked={form.c2Participation === "no"} onChange={() => updateField("c2Participation", "no")} data-testid="radio-c2-participation-no" />
                        <AlertCircle className={`h-4 w-4 ${form.c2Participation === "no" ? "text-red-600" : "text-muted-foreground/40"}`} />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Audio Recording</Label>
                    <div className="flex gap-3">
                      <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${form.c2AudioRecording === "yes" ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                        <input type="radio" className="sr-only" checked={form.c2AudioRecording === "yes"} onChange={() => updateField("c2AudioRecording", "yes")} data-testid="radio-c2-audio-yes" />
                        <CheckCircle2 className={`h-4 w-4 ${form.c2AudioRecording === "yes" ? "text-violet-600" : "text-muted-foreground/40"}`} />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${form.c2AudioRecording === "no" ? "border-red-400 bg-red-500/10" : "border-border hover:border-red-300"}`}>
                        <input type="radio" className="sr-only" checked={form.c2AudioRecording === "no"} onChange={() => updateField("c2AudioRecording", "no")} data-testid="radio-c2-audio-no" />
                        <AlertCircle className={`h-4 w-4 ${form.c2AudioRecording === "no" ? "text-red-600" : "text-muted-foreground/40"}`} />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-violet-200 dark:border-violet-900/50" data-testid="card-c3-written-consent">
            <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">C3. Short Written Consent Form</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Study Title</p>
                <p className="text-sm leading-relaxed font-medium">
                  Evaluating and Recommending a Pragmatic Mobile App Prototype for Human–Wildlife Conflict Prevention and Resolution: A Qualitative Pilot Study
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Researcher</p>
                <p className="text-sm">Felix O. Abayomi</p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Purpose of the Study</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The purpose of this study is to explore how everyday residents who encounter wildlife describe the ways a mobile app for reporting encounters and receiving guidance could help prevent or mitigate human–wildlife conflict.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Procedures</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    If you agree to participate, you will complete one interview lasting approximately 30–45 minutes. The interview will include questions about your experiences with wildlife encounters and your views on what features or guidance would be useful in a mobile app.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Voluntary Participation</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your participation is voluntary. You may skip any question and you may stop participation at any time without penalty.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Risks and Discomforts</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    This study involves minimal risk. Some questions may involve recalling stressful encounters. You may pause, skip questions, or stop at any time.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Benefits</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    There may be no direct benefit to you. However, your input may help inform practical ideas for user-centered technology to support safer human–wildlife interactions.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Confidentiality</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your name will not be used in any report. The researcher will use a pseudonym and remove identifying details. Audio recordings and transcripts will be stored in a password-protected folder or encrypted storage. Audio files will be deleted after transcription.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-muted/40 border border-border/50 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Audio Recording Permission</p>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${form.c3AudioPermission === "agree" ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                    <Checkbox checked={form.c3AudioPermission === "agree"} onCheckedChange={() => updateField("c3AudioPermission", form.c3AudioPermission === "agree" ? "" : "agree")} data-testid="checkbox-c3-audio-agree" />
                    <span className="text-sm">I agree to be audio-recorded.</span>
                  </label>
                  <label className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${form.c3AudioPermission === "disagree" ? "border-red-400 bg-red-500/10" : "border-border hover:border-red-300"}`}>
                    <Checkbox checked={form.c3AudioPermission === "disagree"} onCheckedChange={() => updateField("c3AudioPermission", form.c3AudioPermission === "disagree" ? "" : "disagree")} data-testid="checkbox-c3-audio-disagree" />
                    <span className="text-sm">I do not agree to be audio-recorded.</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 space-y-4">
                <p className="text-xs font-medium text-violet-700 dark:text-violet-300 uppercase tracking-wider">Consent Statement</p>
                <label className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${form.c3ConsentAgreed ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                  <Checkbox checked={form.c3ConsentAgreed} onCheckedChange={(checked) => updateField("c3ConsentAgreed", checked === true)} className="mt-0.5" data-testid="checkbox-c3-consent" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    I have read (or have read to me) the information above. I have had the opportunity to ask questions. I agree to participate in this study voluntarily.
                  </span>
                </label>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Participant Name (printed)</Label>
                    <Input value={form.c3ParticipantName} onChange={(e) => updateField("c3ParticipantName", e.target.value)} placeholder="Full name" className="h-9 text-sm" data-testid="input-c3-participant-name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Date</Label>
                    <Input type="date" value={form.c3ParticipantDate} onChange={(e) => updateField("c3ParticipantDate", e.target.value)} className="h-9 text-sm" data-testid="input-c3-participant-date" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Participant Signature</Label>
                    <Input value={form.c3ParticipantSignature} onChange={(e) => updateField("c3ParticipantSignature", e.target.value)} placeholder="Type name as signature" className="h-9 text-sm italic" data-testid="input-c3-participant-sig" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Researcher Signature</Label>
                    <Input value={form.c3ResearcherSignature} onChange={(e) => updateField("c3ResearcherSignature", e.target.value)} placeholder="Type name as signature" className="h-9 text-sm italic" data-testid="input-c3-researcher-sig" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Researcher Date</Label>
                    <Input type="date" value={form.c3ResearcherDate} onChange={(e) => updateField("c3ResearcherDate", e.target.value)} className="h-9 text-sm" data-testid="input-c3-researcher-date" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20" data-testid="card-c4-family-note">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-sans text-lg text-amber-700 dark:text-amber-400">C4. Special Note for Family Participants</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because participants are immediate family members, the researcher emphasized that participation was completely voluntary, that there were no consequences for declining or withdrawing, and that participants could skip any question or stop the interview at any time.
              </p>
            </CardContent>
          </Card>

          <footer className="text-center pt-4 pb-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">&copy; Felix Abayomi 2026</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

function DataSecurityPlan() {
  const sections = [
    {
      id: "d1",
      title: "D1. Purpose",
      content: "This appendix documents the procedures used to protect participant confidentiality and ensure responsible handling of interview data for this qualitative pilot study. The plan addresses data collection, storage, de-identification, access control, retention, and disposal.",
    },
    {
      id: "d2",
      title: "D2. Data Types Collected",
      content: "The study collects the following data:",
      bullets: [
        "Audio recordings of two semi-structured interviews (if participants consent to recording)",
        "Interview transcripts generated from recordings (or detailed notes if recording is declined)",
        "Researcher analytic materials, including coding notes, memos, and theme development worksheets",
      ],
      note: "No sensitive personal identifiers are intentionally collected. Participants are instructed not to provide exact addresses, employer names, or other identifying details during the interview.",
    },
    {
      id: "d3",
      title: "D3. De-Identification Procedures",
      content: "To minimize identification risk:",
      numbered: [
        "Participants are assigned pseudonyms (e.g., Participant A and Participant B).",
        "During transcription, direct identifiers are removed or generalized (e.g., \"my workplace\" instead of the employer name; \"local park\" instead of a named location).",
        "Any incidental identifying information is redacted from excerpts used in the findings chapter.",
        "Only de-identified excerpts are included in Chapter 4 and Chapter 5.",
      ],
    },
    {
      id: "d4",
      title: "D4. Data Storage and Access Control",
      content: "All digital files are stored in a password-protected folder on the researcher's personal device and/or in encrypted cloud storage with multi-factor authentication enabled (if used). Access is restricted to the researcher only. No data are stored on shared or public computers.",
    },
    {
      id: "d5",
      title: "D5. Data Transmission",
      content: "If interviews are conducted online, the researcher minimizes exposure risk by:",
      bullets: [
        "conducting interviews in a private setting,",
        "avoiding collection of unnecessary identifying information, and",
        "downloading and storing audio files only within the secure storage location described above.",
      ],
      note: "Transcripts and recordings are not shared through unsecured channels.",
    },
    {
      id: "d6",
      title: "D6. Retention and Disposal",
      bullets: [
        "Audio recordings are deleted after transcription is completed and verified for accuracy.",
        "De-identified transcripts and analytic notes are retained only as long as needed to complete the course project and associated writing.",
        "At the conclusion of the project (or per course requirements), transcripts and analytic materials are securely deleted (digital deletion from primary storage and cloud recycle bins).",
      ],
    },
    {
      id: "d7",
      title: "D7. Confidentiality Limits",
      content: "Confidentiality is maintained to the extent possible within a small pilot study. Because the participants are immediate family members, extra care is taken to protect privacy in reporting by avoiding descriptions that could reveal identity (e.g., unique workplace details, exact locations, or highly specific personal narratives).",
    },
    {
      id: "d8",
      title: "D8. Researcher Responsibility Statement",
      content: "The researcher is responsible for ensuring that confidentiality practices are followed consistently, that data are not used beyond the stated purpose of the study, and that reporting is limited to de-identified, relevant excerpts that support the thematic findings.",
      isHighlighted: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <Badge className="bg-violet-600">Appendix D</Badge>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-security-title">
              Data Security and De-Identification Plan
            </h1>
            <p className="text-muted-foreground text-sm">Qualitative Pilot Study</p>
          </div>

          {sections.map((section) => (
            <Card
              key={section.id}
              className={
                section.isHighlighted
                  ? "border-violet-300 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20"
                  : "border-violet-200 dark:border-violet-900/50"
              }
              data-testid={`card-${section.id}`}
            >
              <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <CardTitle className="font-sans text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {section.content && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                )}
                {section.bullets && (
                  <ul className="space-y-2 pl-1">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-violet-500 mt-1.5 shrink-0">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.numbered && (
                  <ol className="space-y-2 pl-1">
                    {section.numbered.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {section.note && (
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-violet-300 dark:border-violet-700 pl-3 mt-3">
                    {section.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          <footer className="text-center pt-4 pb-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">&copy; Felix Abayomi 2026</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

function QuasiContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("reasoning");
  const [showPresentation, setShowPresentation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (showPresentation) {
    return <QuasiPresentationView onClose={() => setShowPresentation(false)} />;
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold hidden sm:inline" data-testid="text-project-name">
              Quasi-Qualitative
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="grid grid-cols-2 h-9">
              <TabsTrigger value="reasoning" className="gap-2 text-sm" data-testid="tab-reasoning">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Reasoning</span>
              </TabsTrigger>
              <TabsTrigger value="paper" className="gap-2 text-sm" data-testid="tab-paper">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Paper</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ThemeToggle />
        </div>
      </header>

      {viewMode === "reasoning" ? (
        <QuasiReasoningView 
          onOpenPresentation={() => setShowPresentation(true)}
          onOpenSearch={() => setShowSearch(true)}
        />
      ) : (
        <QuasiPaperView />
      )}

      <QuasiSearchDialog 
        open={showSearch} 
        onOpenChange={setShowSearch}
      />
    </>
  );
}

function QuasiHub({ onSelectSection }: { onSelectSection: (section: ActiveSection) => void }) {
  return (
    <main className="flex-1">
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium mb-6">
            <FlaskConical className="h-4 w-4" />
            <span>Research Methodology</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-3" data-testid="text-hub-title">
            Quasi-Qualitative Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Topic and Research Question Development
          </p>
          <p className="text-sm text-muted-foreground mt-4">Felix Abayomi &middot; EdD Candidate, Antioch University</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700"
            onClick={() => onSelectSection("project")}
            data-testid="card-quasi-project"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge className="bg-violet-600 mb-1">Main Project</Badge>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-xl mb-1">Quasi-Qualitative Research</CardTitle>
                  <CardDescription>
                    Reasoning view with theoretical framework, research design, participants, data collection, data interpretation, ethics, and chapter summary. Includes AI Dissertation Generator.
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700"
            onClick={() => onSelectSection("interview-protocol")}
            data-testid="card-interview-protocol"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge className="bg-violet-600 mb-1">Appendix A</Badge>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-xl mb-1">Semi-Structured Interview Protocol</CardTitle>
                  <CardDescription>
                    Qualitative pilot study interview guide with 12 structured questions covering wildlife encounters, risk perception, app features, trust, privacy, and ideal workflows.
                  </CardDescription>
                  <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                    <Link href="/interview">
                      <Button variant="outline" size="sm" className="gap-2 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-700 hover:bg-violet-500/10" data-testid="link-fillable-form">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open Fillable Form
                      </Button>
                    </Link>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700"
            onClick={() => onSelectSection("coding-sheet")}
            data-testid="card-coding-sheet"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge className="bg-violet-600 mb-1">Appendix B</Badge>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-xl mb-1">Coding Sheet and Codebook</CardTitle>
                  <CardDescription>
                    Thematic analysis tools including coding sheet template, open coding categories codebook (8 domains, 40+ codes), qualitative evidence log, and theme development worksheet.
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700"
            onClick={() => onSelectSection("recruitment-consent")}
            data-testid="card-recruitment-consent"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge className="bg-violet-600 mb-1">Appendix C</Badge>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-xl mb-1">Recruitment Script and Informed Consent</CardTitle>
                  <CardDescription>
                    Recruitment invitation, verbal informed consent script, short written consent form, and special note for family participants.
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700"
            onClick={() => onSelectSection("data-security")}
            data-testid="card-data-security"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge className="bg-violet-600 mb-1">Appendix D</Badge>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-xl mb-1">Data Security and De-Identification Plan</CardTitle>
                  <CardDescription>
                    Data protection procedures including de-identification, storage, access control, retention, disposal, and researcher responsibility statement.
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      <footer className="px-4 sm:px-6 py-8 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">&copy; Felix Abayomi 2026</p>
        </div>
      </footer>
    </main>
  );
}

export default function QuasiQualitative() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showAccessScreen, setShowAccessScreen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(REMEMBER_KEY) === "true") {
      setHasAccess(true);
    }
  }, []);

  const handleEnterClick = () => {
    if (typeof window !== 'undefined' && localStorage.getItem(REMEMBER_KEY) === "true") {
      setHasAccess(true);
      return;
    }
    setShowAccessScreen(true);
    setError("");
    setAccessCode("");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ACCESS_CODE) {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, "true");
      }
      setHasAccess(true);
    } else {
      setError("Invalid access code. Please try again or request access.");
    }
  };

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Request for Quasi-Qualitative Project Access");
    const body = encodeURIComponent(
      `Dear Felix,\n\nI am writing to request access to your Quasi-Qualitative Project on Praxis Nexus.\n\nName: \nAffiliation: \nReason for access: \n\nThank you for considering my request.\n\nBest regards`
    );
    window.location.href = `mailto:praxinex@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleBack = () => {
    setShowAccessScreen(false);
    setError("");
    setAccessCode("");
  };

  if (hasAccess) {
    if (activeSection === "project") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
          <div className="flex items-center px-4 sm:px-6 h-10 bg-violet-500/5 dark:bg-violet-950/30 border-b border-violet-200/50 dark:border-violet-900/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2 h-8 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 px-2"
              data-testid="button-back-quasi-hub"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Quasi-Qualitative
            </Button>
          </div>
          <QuasiContent />
        </div>
      );
    }

    if (activeSection === "interview-protocol") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2"
              data-testid="button-back-quasi-hub-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Quasi-Qualitative</span>
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline font-medium">Appendix A</span>
              <ThemeToggle />
            </div>
          </header>
          <InterviewProtocol />
          <div className="border-t-4 border-violet-200 dark:border-violet-900">
            <InterviewResponses />
          </div>
        </div>
      );
    }

    if (activeSection === "coding-sheet") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2"
              data-testid="button-back-quasi-hub-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Quasi-Qualitative</span>
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline font-medium">Appendix B</span>
              <ThemeToggle />
            </div>
          </header>
          <CodingSheet />
        </div>
      );
    }

    if (activeSection === "recruitment-consent") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2"
              data-testid="button-back-quasi-hub-5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Quasi-Qualitative</span>
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline font-medium">Appendix C</span>
              <ThemeToggle />
            </div>
          </header>
          <RecruitmentConsent />
        </div>
      );
    }

    if (activeSection === "data-security") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="gap-2"
              data-testid="button-back-quasi-hub-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Quasi-Qualitative</span>
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline font-medium">Appendix D</span>
              <ThemeToggle />
            </div>
          </header>
          <DataSecurityPlan />
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-hub">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Hub</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
                <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="font-sans text-sm font-semibold hidden sm:inline" data-testid="text-project-name">
                Quasi-Qualitative
              </span>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <QuasiHub onSelectSection={setActiveSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-hub">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Hub</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold" data-testid="text-project-name">
              Quasi-Qualitative
            </span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        {!showAccessScreen ? (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium">
                <FlaskConical className="h-4 w-4" />
                <span>Research Methodology</span>
              </div>
              
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground" data-testid="text-project-title">
                Quasi-Qualitative Project
              </h1>
              
              <h2 className="font-sans text-xl sm:text-2xl text-muted-foreground leading-relaxed" data-testid="text-project-subtitle">
                Topic and Research Question Development
              </h2>
            </div>

            <div className="pt-4">
              <p className="text-lg text-foreground font-sans" data-testid="text-author">
                Felix Abayomi
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                EdD Candidate, Antioch University
              </p>
            </div>

            <div className="pt-6">
              <Button 
                size="lg" 
                onClick={handleEnterClick}
                className="font-sans gap-2 bg-violet-600"
                data-testid="button-enter-project"
              >
                Enter Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                &copy; Felix Abayomi 2026
              </p>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
                <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="font-sans text-2xl">Access Required</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                This project is protected. Enter your access code to continue.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setError("");
                    }}
                    className="text-center text-lg tracking-wider"
                    data-testid="input-access-code"
                  />
                  {error && (
                    <p className="text-sm text-destructive text-center" data-testid="text-error">
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    data-testid="checkbox-remember-me"
                  />
                  <Label 
                    htmlFor="remember-me" 
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Keep me signed in
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-sans gap-2 bg-violet-600"
                  data-testid="button-submit-code"
                >
                  <Lock className="h-4 w-4" />
                  Access Project
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full font-sans gap-2"
                onClick={handleRequestAccess}
                data-testid="button-request-access"
              >
                <Mail className="h-4 w-4" />
                Request Access
              </Button>

              <Button 
                variant="ghost" 
                className="w-full font-sans gap-2 text-muted-foreground"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
