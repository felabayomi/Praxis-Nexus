import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Save, Loader2, Plus, Trash2, User, ClipboardList, BookOpen, FileText,
  ChevronDown, ChevronUp, Lightbulb, Download, RefreshCw
} from "lucide-react";

interface ParticipantProfile {
  participantId: string;
  approximateAge: string;
  role: string;
  interviewDate: string;
  interviewMode: string;
  duration: string;
}

interface EvidenceLog {
  excerptId: string;
  excerpt: string;
  codes: string;
  memo: string;
}

interface ThemeEntry {
  name: string;
  codes: string;
  evidenceA: string;
  evidenceB: string;
  meaning: string;
}

interface CodingSheetData {
  profile: ParticipantProfile;
  q1Options: string[];
  q2Options: string[];
  q3Risk: string;
  q3Explanation: string;
  q4Options: string[];
  q5Top1: string;
  q5Top2: string;
  q6Options: string[];
  q7Rank1: string;
  q7Rank2: string;
  q7Rank3: string;
  q8Answer: string;
  q8Conditions: string;
  q9Answer: string;
  q10Options: string[];
  q11Options: string[];
  evidenceLog: EvidenceLog[];
  themes: ThemeEntry[];
}

const EMPTY_PROFILE: ParticipantProfile = {
  participantId: "",
  approximateAge: "",
  role: "",
  interviewDate: "",
  interviewMode: "",
  duration: "",
};

const EMPTY_EVIDENCE: EvidenceLog = {
  excerptId: "",
  excerpt: "",
  codes: "",
  memo: "",
};

const EMPTY_THEME: ThemeEntry = {
  name: "",
  codes: "",
  evidenceA: "",
  evidenceB: "",
  meaning: "",
};

const CODEBOOK = [
  {
    category: "Encounter Experience",
    codes: [
      { code: "ENCOUNTER_CONTEXT", description: "Describes where/when the encounter happened (general setting)." },
      { code: "ENCOUNTER_SEQUENCE", description: "Describes the sequence of events and key moments." },
      { code: "SPECIES_ID_CONFIDENCE", description: "Indicates confidence or uncertainty about which animal was involved." },
    ],
  },
  {
    category: "Risk and Decision-Making",
    codes: [
      { code: "RISK_PERCEPTION_LOW / MODERATE / HIGH", description: "Expresses perceived risk level and rationale." },
      { code: "UNCERTAINTY", description: "Describes uncertainty about what to do or what might happen." },
      { code: "DECISION_DRIVER", description: "Explains influences on decisions (fear, prior knowledge, advice, signage, etc.)." },
      { code: "SAFETY_STRATEGY", description: "Actions taken to stay safe (avoidance, distance, leaving area)." },
      { code: "ESCALATION_CONCERN", description: "Concern about provoking animal or worsening situation." },
    ],
  },
  {
    category: "Information Needs (During Encounter)",
    codes: [
      { code: "NEED_STEP_BY_STEP", description: "Desire for clear 'do/don't' or stepwise guidance." },
      { code: "NEED_SPECIES_BEHAVIOR", description: "Desire for information about animal behavior." },
      { code: "NEED_DANGER_SIGNS", description: "Desire for warning signs and risk cues." },
      { code: "NEED_CONTACTS", description: "Desire for who to call/report to and how." },
      { code: "NEED_AFTERCARE", description: "Desire for post-encounter steps (reporting, medical, vehicle/property, etc.)." },
    ],
  },
  {
    category: "Prevention and Preparedness",
    codes: [
      { code: "PREVENTION_ALERTS", description: "Desire for alerts or push notifications." },
      { code: "PREVENTION_ROUTE", description: "Desire for route guidance or hotspot avoidance." },
      { code: "PREVENTION_SEASONAL", description: "Desire for seasonal/time-based risk information." },
      { code: "PREVENTION_EDUCATION", description: "Desire for education, tips, or preparedness resources." },
      { code: "SELF_EFFICACY", description: "Confidence or lack of confidence in handling encounters." },
    ],
  },
  {
    category: "App Feature Preferences",
    codes: [
      { code: "FEATURE_HELP_NOW", description: "Preference for immediate guidance interface." },
      { code: "FEATURE_REPORTING", description: "Preference for reporting features (photo, details, categories)." },
      { code: "FEATURE_MAP", description: "Preference for map-based sightings display." },
      { code: "FEATURE_OFFLINE_LOW_DATA", description: "Need for offline or low-data usability." },
      { code: "FEATURE_PERSONALIZATION", description: "Desire for context-aware or tailored guidance." },
      { code: "FEATURE_SIMPLE_UI", description: "Desire for fast, simple interface suitable under stress." },
    ],
  },
  {
    category: "Trust, Governance, and Ethics",
    codes: [
      { code: "TRUST_MANAGER", description: "Who should manage the app/data and why." },
      { code: "TRUST_ACCURACY", description: "Concern about information quality and reliability." },
      { code: "PRIVACY_LOCATION", description: "Location privacy concerns and preferences." },
      { code: "PRIVACY_IDENTITY", description: "Identity privacy concerns and preferences." },
      { code: "DATA_MISUSE_WILDLIFE", description: "Concern that wildlife location data could be misused." },
      { code: "SURVEILLANCE_CONCERN", description: "Concern about surveillance or tracking." },
    ],
  },
  {
    category: "Adoption Barriers",
    codes: [
      { code: "BARRIER_CONNECTIVITY", description: "Connectivity, data cost, signal limitations." },
      { code: "BARRIER_COMPLEXITY", description: "Too slow/complex to use during an encounter." },
      { code: "BARRIER_CONSEQUENCES", description: "Fear of negative consequences of reporting/using app." },
      { code: "BARRIER_RELEVANCE", description: "Belief that encounters are too rare or app not needed." },
      { code: "BARRIER_CULTURAL_BELIEF", description: "Beliefs/values that shape attitudes toward wildlife and technology." },
    ],
  },
  {
    category: "Desired Outcomes",
    codes: [
      { code: "DESIRED_OUTCOME_SAFETY", description: "Goal of physical safety and harm reduction." },
      { code: "DESIRED_OUTCOME_CONFIDENCE", description: "Reduced anxiety, increased certainty." },
      { code: "DESIRED_OUTCOME_COEXISTENCE", description: "Avoiding harm to wildlife; humane response." },
      { code: "DESIRED_OUTCOME_COMMUNITY", description: "Shared awareness, community benefit, collective safety." },
    ],
  },
];

const STORAGE_KEY = "praxis-coding-sheets";

interface InterviewResponseData {
  id: number;
  participant_id: string;
  submitted_at: string;
  q1_options: string[];
  q2_options: string[];
  q3_risk: string | null;
  q3_probe: string | null;
  q4_options: string[];
  q5_options: string[];
  q6_options: string[];
  q7_rank1: string | null;
  q7_rank2: string | null;
  q7_rank3: string | null;
  q8_answer: string | null;
  q8_probe: string | null;
  q9_answer: string | null;
  q10_options: string[];
  q11_options: string[];
}

function mapResponseToSheet(resp: InterviewResponseData): Partial<CodingSheetData> {
  return {
    profile: {
      participantId: resp.participant_id,
      approximateAge: "",
      role: "",
      interviewDate: new Date(resp.submitted_at).toLocaleDateString(),
      interviewMode: "",
      duration: "",
    },
    q1Options: resp.q1_options || [],
    q2Options: resp.q2_options || [],
    q3Risk: resp.q3_risk || "",
    q3Explanation: resp.q3_probe || "",
    q4Options: resp.q4_options || [],
    q5Top1: (resp.q5_options || [])[0] || "",
    q5Top2: (resp.q5_options || [])[1] || "",
    q6Options: resp.q6_options || [],
    q7Rank1: resp.q7_rank1 || "",
    q7Rank2: resp.q7_rank2 || "",
    q7Rank3: resp.q7_rank3 || "",
    q8Answer: resp.q8_answer || "",
    q8Conditions: resp.q8_probe || "",
    q9Answer: resp.q9_answer || "",
    q10Options: resp.q10_options || [],
    q11Options: resp.q11_options || [],
  };
}

export function CodingSheet() {
  const [sheets, setSheets] = useState<CodingSheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState<number>(0);
  const [showCodebook, setShowCodebook] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSheets(JSON.parse(saved));
      } catch {
        setSheets([createEmptySheet()]);
      }
    } else {
      setSheets([createEmptySheet()]);
    }
  }, []);

  function createEmptySheet(): CodingSheetData {
    return {
      profile: { ...EMPTY_PROFILE },
      q1Options: [], q2Options: [], q3Risk: "", q3Explanation: "",
      q4Options: [], q5Top1: "", q5Top2: "", q6Options: [],
      q7Rank1: "", q7Rank2: "", q7Rank3: "",
      q8Answer: "", q8Conditions: "", q9Answer: "",
      q10Options: [], q11Options: [],
      evidenceLog: [{ ...EMPTY_EVIDENCE }],
      themes: [{ ...EMPTY_THEME }],
    };
  }

  const save = (updatedSheets: CodingSheetData[]) => {
    setSheets(updatedSheets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSheets));
  };

  const addSheet = () => {
    const updated = [...sheets, createEmptySheet()];
    save(updated);
    setActiveSheet(updated.length - 1);
  };

  const removeSheet = (index: number) => {
    if (sheets.length <= 1) return;
    const updated = sheets.filter((_, i) => i !== index);
    save(updated);
    if (activeSheet >= updated.length) setActiveSheet(updated.length - 1);
  };

  const importFromResponses = async () => {
    setImportLoading(true);
    try {
      const res = await fetch("/api/interview/responses");
      if (!res.ok) throw new Error("Failed to fetch responses");
      const responses: InterviewResponseData[] = await res.json();
      if (responses.length === 0) {
        toast({ title: "No responses found", description: "No interview responses have been submitted yet." });
        setImportLoading(false);
        return;
      }
      const newSheets: CodingSheetData[] = responses.map((resp) => {
        const mapped = mapResponseToSheet(resp);
        return {
          ...createEmptySheet(),
          ...mapped,
        };
      });
      save(newSheets);
      setActiveSheet(0);
      toast({
        title: "Responses imported",
        description: `${responses.length} response(s) mapped to coding sheets. Option summaries have been auto-filled.`,
      });
    } catch {
      toast({ title: "Import failed", description: "Could not fetch interview responses.", variant: "destructive" });
    }
    setImportLoading(false);
  };

  const updateSheet = (data: Partial<CodingSheetData>) => {
    const updated = [...sheets];
    updated[activeSheet] = { ...updated[activeSheet], ...data };
    save(updated);
  };

  const updateProfile = (field: keyof ParticipantProfile, value: string) => {
    const updated = [...sheets];
    updated[activeSheet].profile = { ...updated[activeSheet].profile, [field]: value };
    save(updated);
  };

  const toggleCheckbox = (field: "q1Options" | "q2Options" | "q4Options" | "q6Options" | "q10Options" | "q11Options", value: string) => {
    const current = sheets[activeSheet][field];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    updateSheet({ [field]: next });
  };

  const updateEvidence = (idx: number, field: keyof EvidenceLog, value: string) => {
    const updated = [...sheets];
    const log = [...updated[activeSheet].evidenceLog];
    log[idx] = { ...log[idx], [field]: value };
    updated[activeSheet].evidenceLog = log;
    save(updated);
  };

  const addEvidence = () => {
    const updated = [...sheets];
    updated[activeSheet].evidenceLog = [...updated[activeSheet].evidenceLog, { ...EMPTY_EVIDENCE }];
    save(updated);
  };

  const removeEvidence = (idx: number) => {
    const updated = [...sheets];
    updated[activeSheet].evidenceLog = updated[activeSheet].evidenceLog.filter((_, i) => i !== idx);
    save(updated);
  };

  const updateTheme = (idx: number, field: keyof ThemeEntry, value: string) => {
    const updated = [...sheets];
    const themes = [...updated[activeSheet].themes];
    themes[idx] = { ...themes[idx], [field]: value };
    updated[activeSheet].themes = themes;
    save(updated);
  };

  const addTheme = () => {
    const updated = [...sheets];
    updated[activeSheet].themes = [...updated[activeSheet].themes, { ...EMPTY_THEME }];
    save(updated);
  };

  const removeTheme = (idx: number) => {
    const updated = [...sheets];
    updated[activeSheet].themes = updated[activeSheet].themes.filter((_, i) => i !== idx);
    save(updated);
  };

  const sheet = sheets[activeSheet];
  if (!sheet) return null;

  function CheckboxOptions({ field, options }: { field: "q1Options" | "q2Options" | "q4Options" | "q6Options" | "q10Options" | "q11Options"; options: string[] }) {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer transition-all ${
              sheet[field].includes(opt)
                ? "border-violet-400 bg-violet-500/10"
                : "border-border hover:border-violet-300"
            }`}
          >
            <Checkbox
              checked={sheet[field].includes(opt)}
              onCheckedChange={() => toggleCheckbox(field, opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-3">
        <Badge className="bg-violet-600">Appendix B</Badge>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-coding-title">
          Coding Sheet and Codebook
        </h1>
        <p className="text-muted-foreground text-sm">Thematic Analysis for Qualitative Pilot Study</p>
      </div>

      <Card className="border-violet-200 dark:border-violet-900/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This appendix provides the coding sheet template and codebook used to support transparent, systematic thematic analysis of the interview transcripts. The structured "options" portion of the interview protocol is used as an organizing aid for summary and comparison, while the primary qualitative findings are derived from open-ended narrative responses and evidence excerpts.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 flex-wrap">
        {sheets.map((s, i) => (
          <Button
            key={i}
            variant={activeSheet === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSheet(i)}
            className={activeSheet === i ? "bg-violet-600" : ""}
            data-testid={`button-sheet-${i}`}
          >
            <User className="h-3.5 w-3.5 mr-1.5" />
            {s.profile.participantId || `Participant ${i + 1}`}
          </Button>
        ))}
        <Button variant="outline" size="sm" onClick={addSheet} className="gap-1.5" data-testid="button-add-sheet">
          <Plus className="h-3.5 w-3.5" /> Add Participant
        </Button>
        <div className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={importFromResponses}
            disabled={importLoading}
            className="gap-1.5 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-700 hover:bg-violet-500/10"
            data-testid="button-import-responses"
          >
            {importLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            Import from Responses
          </Button>
        </div>
      </div>

      <Card data-testid="card-profile">
        <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-sans text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              B1. Participant Profile (De-identified)
            </CardTitle>
            {sheets.length > 1 && (
              <Button variant="ghost" size="sm" onClick={() => removeSheet(activeSheet)} className="text-destructive gap-1.5">
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4 grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Participant ID</Label>
            <RadioGroup value={sheet.profile.participantId} onValueChange={(v) => updateProfile("participantId", v)} className="flex gap-4">
              {["A", "B"].map(v => (
                <label key={v} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${sheet.profile.participantId === v ? "border-violet-400 bg-violet-500/10" : "border-border"}`}>
                  <RadioGroupItem value={v} /> {v}
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Approximate age</Label>
            <Input value={sheet.profile.approximateAge} onChange={(e) => updateProfile("approximateAge", e.target.value)} placeholder="e.g. 35" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Role (general)</Label>
            <Input value={sheet.profile.role} onChange={(e) => updateProfile("role", e.target.value)} placeholder="e.g. Educator" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Interview date</Label>
            <Input type="date" value={sheet.profile.interviewDate} onChange={(e) => updateProfile("interviewDate", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Interview mode</Label>
            <RadioGroup value={sheet.profile.interviewMode} onValueChange={(v) => updateProfile("interviewMode", v)} className="flex gap-4">
              {["In-person", "Online"].map(v => (
                <label key={v} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${sheet.profile.interviewMode === v ? "border-violet-400 bg-violet-500/10" : "border-border"}`}>
                  <RadioGroupItem value={v} /> {v}
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Duration (minutes)</Label>
            <Input value={sheet.profile.duration} onChange={(e) => updateProfile("duration", e.target.value)} placeholder="e.g. 30" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Option Summary (Structured Responses)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q1. Encounter context</Label>
            <CheckboxOptions field="q1Options" options={["Road/driving", "Near home", "Park/trail", "Work setting"]} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q2. Animal(s) involved</Label>
            <CheckboxOptions field="q2Options" options={["Deer", "Bear", "Coyote", "Snake", "Raccoon/opossum", "Birds"]} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q3. Perceived risk level</Label>
            <RadioGroup value={sheet.q3Risk} onValueChange={(v) => updateSheet({ q3Risk: v })} className="flex gap-4">
              {["Low", "Moderate", "High"].map(v => (
                <label key={v} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${sheet.q3Risk === v ? "border-violet-400 bg-violet-500/10" : "border-border"}`}>
                  <RadioGroupItem value={v} /> {v}
                </label>
              ))}
            </RadioGroup>
            <Textarea placeholder="Brief explanation (1\u20132 lines)..." value={sheet.q3Explanation} onChange={(e) => updateSheet({ q3Explanation: e.target.value })} rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q4. Immediate response</Label>
            <CheckboxOptions field="q4Options" options={["Kept distance", "Left area", "Waited/stayed still", "Tried to scare away", "Took photo/video", "Called someone"]} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q5. In-the-moment information needs (top 2)</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">1st choice</Label>
                <Select value={sheet.q5Top1} onValueChange={(v) => updateSheet({ q5Top1: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {["Step-by-step safety guidance", "Species behavior info", "Danger signs", "Who to contact", "After-steps"].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">2nd choice</Label>
                <Select value={sheet.q5Top2} onValueChange={(v) => updateSheet({ q5Top2: v })}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {["Step-by-step safety guidance", "Species behavior info", "Danger signs", "Who to contact", "After-steps"].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q6. Prevention supports</Label>
            <CheckboxOptions field="q6Options" options={["Alerts", "Season/time reminders", "Route suggestions", "Education/tips"]} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q7. Top app features (rank 1\u20133)</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {(["q7Rank1", "q7Rank2", "q7Rank3"] as const).map((f, i) => (
                <div key={f} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Rank {i + 1}</Label>
                  <Select value={sheet[f]} onValueChange={(v) => updateSheet({ [f]: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {["Help Now", "Reporting", "Sightings map", "Emergency/local contacts", "Notifications", "Offline/low-data"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q8. Would report via app?</Label>
            <RadioGroup value={sheet.q8Answer} onValueChange={(v) => updateSheet({ q8Answer: v })} className="flex gap-4">
              {["Yes", "Maybe/depends", "No"].map(v => (
                <label key={v} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${sheet.q8Answer === v ? "border-violet-400 bg-violet-500/10" : "border-border"}`}>
                  <RadioGroupItem value={v} /> {v}
                </label>
              ))}
            </RadioGroup>
            <Textarea placeholder="Conditions (1\u20132 lines)..." value={sheet.q8Conditions} onChange={(e) => updateSheet({ q8Conditions: e.target.value })} rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q9. Most trusted manager</Label>
            <RadioGroup value={sheet.q9Answer} onValueChange={(v) => updateSheet({ q9Answer: v })} className="grid sm:grid-cols-3 gap-2">
              {["Government", "Nonprofit", "University", "Community org", "Private company"].map(v => (
                <label key={v} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${sheet.q9Answer === v ? "border-violet-400 bg-violet-500/10" : "border-border"}`}>
                  <RadioGroupItem value={v} /> {v}
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q10. Required privacy protections</Label>
            <CheckboxOptions field="q10Options" options={["Anonymous option", "Control location precision", "Retention limits", "Delete submissions", "No third-party sharing"]} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-violet-700 dark:text-violet-400">Q11. Barriers to use</Label>
            <CheckboxOptions field="q11Options" options={["Too complex", "Don't trust accuracy", "Data/connectivity limits", "Fear of consequences", "Not relevant often"]} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
          <CardTitle className="font-sans text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Qualitative Evidence Log
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-xs text-muted-foreground">
            Use this log to capture excerpts from interview transcripts and apply initial codes.
          </p>
          {sheet.evidenceLog.map((entry, idx) => (
            <Card key={idx} className="border-dashed">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Excerpt {idx + 1}</Label>
                  {sheet.evidenceLog.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeEvidence(idx)} className="text-destructive h-7 px-2">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Excerpt ID</Label>
                    <Input value={entry.excerptId} onChange={(e) => updateEvidence(idx, "excerptId", e.target.value)} placeholder="e.g. A-1" />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Initial code(s)</Label>
                    <Input value={entry.codes} onChange={(e) => updateEvidence(idx, "codes", e.target.value)} placeholder="e.g. ENCOUNTER_CONTEXT, RISK_PERCEPTION_HIGH" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Transcript excerpt (quoted)</Label>
                  <Textarea value={entry.excerpt} onChange={(e) => updateEvidence(idx, "excerpt", e.target.value)} placeholder="Paste excerpt here..." rows={3} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Analytic memo (1\u20132 lines)</Label>
                  <Textarea value={entry.memo} onChange={(e) => updateEvidence(idx, "memo", e.target.value)} placeholder="Your interpretation..." rows={2} />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" size="sm" onClick={addEvidence} className="gap-1.5" data-testid="button-add-evidence">
            <Plus className="h-3.5 w-3.5" /> Add Evidence Entry
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          className="bg-violet-500/5 dark:bg-violet-950/30 pb-3 cursor-pointer"
          onClick={() => setShowCodebook(!showCodebook)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="font-sans text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              B2. Codebook (Open Coding Categories)
            </CardTitle>
            {showCodebook ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </div>
        </CardHeader>
        {showCodebook && (
          <CardContent className="pt-4 space-y-6">
            <p className="text-xs text-muted-foreground">
              Apply codes to meaningful units of text (phrases, sentences, or short paragraphs). Multiple codes may be applied to one excerpt. Codes are used to identify patterns that later form themes.
            </p>
            {CODEBOOK.map((cat) => (
              <div key={cat.category} className="space-y-2">
                <h3 className="font-sans text-sm font-bold text-violet-700 dark:text-violet-400">{cat.category}</h3>
                <div className="space-y-1.5">
                  {cat.codes.map((c) => (
                    <div key={c.code} className="flex items-start gap-2 text-sm">
                      <Badge variant="outline" className="font-mono text-xs shrink-0 mt-0.5">{c.code}</Badge>
                      <span className="text-muted-foreground">{c.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader
          className="bg-violet-500/5 dark:bg-violet-950/30 pb-3 cursor-pointer"
          onClick={() => setShowThemes(!showThemes)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="font-sans text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              B3. Theme Development Worksheet
            </CardTitle>
            {showThemes ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </div>
        </CardHeader>
        {showThemes && (
          <CardContent className="pt-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              Use after coding both interviews. Recommended target: 3\u20136 themes total.
            </p>
            {sheet.themes.map((theme, idx) => (
              <Card key={idx} className="border-dashed">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Theme {idx + 1}</Label>
                    {sheet.themes.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeTheme(idx)} className="text-destructive h-7 px-2">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Theme name</Label>
                    <Input value={theme.name} onChange={(e) => updateTheme(idx, "name", e.target.value)} placeholder="e.g. Fear-Driven Decision Making" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Codes contributing to theme</Label>
                    <Input value={theme.codes} onChange={(e) => updateTheme(idx, "codes", e.target.value)} placeholder="e.g. RISK_PERCEPTION_HIGH, UNCERTAINTY, SAFETY_STRATEGY" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Key evidence (Participant A)</Label>
                      <Textarea value={theme.evidenceA} onChange={(e) => updateTheme(idx, "evidenceA", e.target.value)} rows={2} placeholder="Quote or summary..." />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Key evidence (Participant B)</Label>
                      <Textarea value={theme.evidenceB} onChange={(e) => updateTheme(idx, "evidenceB", e.target.value)} rows={2} placeholder="Quote or summary..." />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Theme meaning (1\u20132 sentences)</Label>
                    <Textarea value={theme.meaning} onChange={(e) => updateTheme(idx, "meaning", e.target.value)} rows={2} placeholder="What this theme means for the study..." />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={addTheme} className="gap-1.5" data-testid="button-add-theme">
              <Plus className="h-3.5 w-3.5" /> Add Theme
            </Button>
          </CardContent>
        )}
      </Card>

      <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-sans text-base text-amber-700 dark:text-amber-400">B4. Analytic Integrity Note (Pilot Scope)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            Because this is a two-participant pilot, themes are presented as preliminary and intended to illuminate potential user needs, perceived usefulness, and barriers rather than to claim saturation or represent broader populations.
          </p>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground pt-4 pb-8">
        <p>All coding sheet data is saved locally in your browser.</p>
      </div>
    </div>
  );
}
