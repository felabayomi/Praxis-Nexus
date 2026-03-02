import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlaskConical, ArrowLeft, Send, CheckCircle2, Loader2,
  MessageSquare, ClipboardList, AlertCircle, ShieldCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  participant_id: string;
  consent_recording: boolean;
  q1_description: string;
  q1_options: string[];
  q2_options: string[];
  q2_probe: string;
  q3_risk: string;
  q3_probe: string;
  q4_options: string[];
  q4_probe: string;
  q5_options: string[];
  q5_probe: string;
  q6_options: string[];
  q6_probe: string;
  q7_rank1: string;
  q7_rank2: string;
  q7_rank3: string;
  q7_probe: string;
  q8_answer: string;
  q8_probe: string;
  q9_answer: string;
  q9_probe: string;
  q10_options: string[];
  q10_probe: string;
  q11_options: string[];
  q11_probe: string;
  q12_workflow: string;
  q12_probe: string;
  closing_question: string;
}

const initialFormData: FormData = {
  participant_id: "",
  consent_recording: false,
  q1_description: "",
  q1_options: [],
  q2_options: [],
  q2_probe: "",
  q3_risk: "",
  q3_probe: "",
  q4_options: [],
  q4_probe: "",
  q5_options: [],
  q5_probe: "",
  q6_options: [],
  q6_probe: "",
  q7_rank1: "",
  q7_rank2: "",
  q7_rank3: "",
  q7_probe: "",
  q8_answer: "",
  q8_probe: "",
  q9_answer: "",
  q9_probe: "",
  q10_options: [],
  q10_probe: "",
  q11_options: [],
  q11_probe: "",
  q12_workflow: "",
  q12_probe: "",
  closing_question: "",
};

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
            selected.includes(opt)
              ? "border-violet-400 bg-violet-500/10 dark:bg-violet-900/30"
              : "border-border hover:border-violet-300 dark:hover:border-violet-700"
          }`}
          data-testid={`option-${opt.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`}
        >
          <Checkbox
            checked={selected.includes(opt)}
            onCheckedChange={() => toggle(opt)}
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function QuestionCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden" data-testid={`card-question-${number}`}>
      <CardHeader className="bg-violet-500/5 dark:bg-violet-950/30 pb-3">
        <CardTitle className="font-sans text-base text-violet-700 dark:text-violet-400">
          {number}. {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">{children}</CardContent>
    </Card>
  );
}

export default function InterviewForm() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const { toast } = useToast();

  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.participant_id.trim()) {
      toast({ title: "Participant ID required", description: "Please enter your participant ID to continue.", variant: "destructive" });
      return;
    }
    if (!form.consent_recording) {
      toast({ title: "Consent required", description: "Please confirm your consent before submitting.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/interview/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      setSubmissionId(data.id);
      setIsSubmitted(true);
      toast({ title: "Response submitted", description: "Thank you for participating in this study." });
    } catch {
      toast({ title: "Submission failed", description: "Please try again or contact the researcher.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold hidden sm:inline">Interview Protocol</span>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-sans text-2xl font-bold text-foreground" data-testid="text-submitted-title">
              Response Submitted
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for your time and participation. Your responses have been securely recorded. If you think of anything else you want to add later, please contact the researcher.
            </p>
            <p className="text-sm text-muted-foreground">
              Submission reference: #{submissionId}
            </p>
            <div className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground italic">
                As a reminder, participation is voluntary and your identity will be protected in the write-up.
              </p>
              <Link href="/">
                <Button variant="outline" className="gap-2" data-testid="button-back-home">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Praxis Nexus
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const q7Options = [
    "'Help Now' guidance",
    "Reporting",
    "Sightings map",
    "Emergency/local contacts",
    "Notifications",
    "Offline/low-data mode",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-background to-fuchsia-50 dark:from-violet-950/20 dark:via-background dark:to-fuchsia-950/20">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 border-b bg-background/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-hub">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500/10">
              <FlaskConical className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="font-sans text-sm font-semibold hidden sm:inline">Interview Protocol</span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
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
                <CardTitle className="font-sans text-lg">Opening Statement</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Thank you for participating. I'm exploring experiences with wildlife encounters and what kinds of information or features might be helpful in a mobile app designed to support prevention and reduce harm during encounters. Participation is voluntary. You may skip any question, and you can stop at any time. With your permission, I would like to record this interview so I can accurately capture your words. Your name will not be used in the write-up, and I will remove identifying details."
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-sans text-lg text-amber-700 dark:text-amber-400">Participant Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="participant-id" className="text-sm font-medium">
                  Participant ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="participant-id"
                  placeholder="Enter your assigned participant ID"
                  value={form.participant_id}
                  onChange={(e) => updateForm("participant_id", e.target.value)}
                  className="max-w-xs"
                  data-testid="input-participant-id"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={form.consent_recording}
                  onCheckedChange={(checked) => updateForm("consent_recording", checked === true)}
                  className="mt-0.5"
                  data-testid="checkbox-consent"
                />
                <span className="text-sm text-foreground leading-relaxed">
                  I consent to participate in this interview. I understand that participation is voluntary, I may skip any question, and I can stop at any time. <span className="text-destructive">*</span>
                </span>
              </label>
            </CardContent>
          </Card>

          <QuestionCard number="Q1" title="Encounter description">
            <p className="text-sm font-medium text-foreground">Describe a wildlife encounter you remember clearly.</p>
            <CheckboxGroup
              options={["Road/driving", "Near home", "Park/trail", "Work setting"]}
              selected={form.q1_options}
              onChange={(v) => updateForm("q1_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What happened first, and what happened next?</Label>
              <Textarea
                placeholder="Describe the encounter in your own words..."
                value={form.q1_description}
                onChange={(e) => updateForm("q1_description", e.target.value)}
                rows={4}
                data-testid="textarea-q1"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q2" title="Animal(s) involved">
            <p className="text-sm font-medium text-foreground">Which animal(s) were involved?</p>
            <CheckboxGroup
              options={["Deer", "Bear", "Coyote", "Snake", "Raccoon/opossum", "Birds"]}
              selected={form.q2_options}
              onChange={(v) => updateForm("q2_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What makes you confident about the animal identification?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q2_probe}
                onChange={(e) => updateForm("q2_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q2-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q3" title="Risk perception">
            <p className="text-sm font-medium text-foreground">How risky did it feel at the time?</p>
            <RadioGroup
              value={form.q3_risk}
              onValueChange={(v) => updateForm("q3_risk", v)}
              className="flex flex-wrap gap-4"
            >
              {["Low", "Moderate", "High"].map((level) => (
                <label key={level} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${form.q3_risk === level ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                  <RadioGroupItem value={level} data-testid={`radio-q3-${level.toLowerCase()}`} />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What specific signs made it feel that way?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q3_probe}
                onChange={(e) => updateForm("q3_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q3-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q4" title="Immediate response">
            <p className="text-sm font-medium text-foreground">What did you do in the moment?</p>
            <CheckboxGroup
              options={["Kept distance", "Left area", "Waited/stayed still", "Tried to scare away", "Took photo/video", "Called someone"]}
              selected={form.q4_options}
              onChange={(v) => updateForm("q4_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Why did you choose that response?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q4_probe}
                onChange={(e) => updateForm("q4_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q4-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q5" title="In-the-moment information needs">
            <p className="text-sm font-medium text-foreground">What would have helped most during the encounter? (Choose top 2)</p>
            <CheckboxGroup
              options={["Step-by-step safety guidance", "Species behavior info", "Danger signs", "Who to contact", "What to do after"]}
              selected={form.q5_options}
              onChange={(v) => updateForm("q5_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What would you want it to say exactly?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q5_probe}
                onChange={(e) => updateForm("q5_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q5-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q6" title="Prevention supports">
            <p className="text-sm font-medium text-foreground">Before encounters occur, what would help prevent problems?</p>
            <CheckboxGroup
              options={["Alerts", "Season/time reminders", "Route suggestions", "Education/tips"]}
              selected={form.q6_options}
              onChange={(v) => updateForm("q6_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">When would you realistically use that?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q6_probe}
                onChange={(e) => updateForm("q6_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q6-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q7" title="App features (priority ranking)">
            <p className="text-sm font-medium text-foreground">What are your top three app features? (Rank 1\u20133)</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-violet-600 dark:text-violet-400">Rank 1 (Most important)</Label>
                <Select value={form.q7_rank1} onValueChange={(v) => updateForm("q7_rank1", v)}>
                  <SelectTrigger data-testid="select-q7-rank1">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {q7Options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-violet-600 dark:text-violet-400">Rank 2</Label>
                <Select value={form.q7_rank2} onValueChange={(v) => updateForm("q7_rank2", v)}>
                  <SelectTrigger data-testid="select-q7-rank2">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {q7Options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-violet-600 dark:text-violet-400">Rank 3</Label>
                <Select value={form.q7_rank3} onValueChange={(v) => updateForm("q7_rank3", v)}>
                  <SelectTrigger data-testid="select-q7-rank3">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {q7Options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What would make you trust the guidance?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q7_probe}
                onChange={(e) => updateForm("q7_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q7-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q8" title="Willingness to report">
            <p className="text-sm font-medium text-foreground">Would you report encounters through an app?</p>
            <RadioGroup
              value={form.q8_answer}
              onValueChange={(v) => updateForm("q8_answer", v)}
              className="flex flex-wrap gap-4"
            >
              {["Yes", "Maybe/depends", "No"].map((opt) => (
                <label key={opt} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${form.q8_answer === opt ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                  <RadioGroupItem value={opt} data-testid={`radio-q8-${opt.replace(/[^a-zA-Z]/g, "").toLowerCase()}`} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What would need to be true for you to report?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q8_probe}
                onChange={(e) => updateForm("q8_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q8-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q9" title="Trust and governance">
            <p className="text-sm font-medium text-foreground">Who would you trust to manage the app and its data?</p>
            <RadioGroup
              value={form.q9_answer}
              onValueChange={(v) => updateForm("q9_answer", v)}
              className="grid sm:grid-cols-2 gap-2"
            >
              {["Government", "Nonprofit", "University", "Community org", "Private company"].map((opt) => (
                <label key={opt} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all ${form.q9_answer === opt ? "border-violet-400 bg-violet-500/10" : "border-border hover:border-violet-300"}`}>
                  <RadioGroupItem value={opt} data-testid={`radio-q9-${opt.replace(/\s/g, "-").toLowerCase()}`} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Why that choice?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q9_probe}
                onChange={(e) => updateForm("q9_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q9-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q10" title="Privacy and ethical concerns">
            <p className="text-sm font-medium text-foreground">What privacy protections would you require?</p>
            <CheckboxGroup
              options={["Anonymous option", "Control location precision", "Retention limits", "Delete submissions", "No third-party sharing"]}
              selected={form.q10_options}
              onChange={(v) => updateForm("q10_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">What worries you most?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q10_probe}
                onChange={(e) => updateForm("q10_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q10-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q11" title="Barriers to use">
            <p className="text-sm font-medium text-foreground">What might stop you from using the app?</p>
            <CheckboxGroup
              options={["Too complex", "Don't trust accuracy", "Data/connectivity", "Fear of consequences", "Not relevant often"]}
              selected={form.q11_options}
              onChange={(v) => updateForm("q11_options", v)}
            />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Which is the biggest barrier and why?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q11_probe}
                onChange={(e) => updateForm("q11_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q11-probe"
              />
            </div>
          </QuestionCard>

          <QuestionCard number="Q12" title="Ideal workflow">
            <p className="text-sm font-medium text-foreground">
              Walk me through the best version of the app during an encounter — from opening it to feeling safe again.
            </p>
            <div className="space-y-2">
              <Textarea
                placeholder="What do you see first? What steps do you take? What outcome do you expect?"
                value={form.q12_workflow}
                onChange={(e) => updateForm("q12_workflow", e.target.value)}
                rows={5}
                data-testid="textarea-q12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Any additional details about steps or expectations?</Label>
              <Textarea
                placeholder="Your answer..."
                value={form.q12_probe}
                onChange={(e) => updateForm("q12_probe", e.target.value)}
                rows={2}
                data-testid="textarea-q12-probe"
              />
            </div>
          </QuestionCard>

          <Card className="border-violet-200 dark:border-violet-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="font-sans text-lg">Closing Question</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground italic">
                "Is there anything else you think is important about wildlife encounters or how a mobile app could help?"
              </p>
              <Textarea
                placeholder="Your thoughts..."
                value={form.closing_question}
                onChange={(e) => updateForm("closing_question", e.target.value)}
                rows={4}
                data-testid="textarea-closing"
              />
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  Because participants are immediate family members, voluntary participation and the option to skip questions or stop at any time were reiterated to reduce any perception of obligation.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-4 pt-4 pb-8">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 bg-violet-600 hover:bg-violet-700 px-8"
              data-testid="button-submit-interview"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Response
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center max-w-sm">
              Your responses are confidential. You may skip any question. By submitting, you confirm your voluntary participation.
            </p>
          </div>

          <footer className="text-center pb-8 border-t border-border/50 pt-6">
            <p className="text-sm text-muted-foreground mb-1">Felix Abayomi</p>
            <p className="text-xs text-muted-foreground">EdD Candidate, Antioch University</p>
            <p className="text-xs text-muted-foreground mt-3">&copy; Felix Abayomi 2026</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
