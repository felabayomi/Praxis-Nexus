import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, ChevronDown, ChevronUp, Save, RefreshCw,
  User, Calendar, MessageSquare, ClipboardList
} from "lucide-react";

interface InterviewResponse {
  id: number;
  participant_id: string;
  submitted_at: string;
  consent_recording: boolean;
  q1_description: string | null;
  q1_options: string[];
  q2_options: string[];
  q2_probe: string | null;
  q3_risk: string | null;
  q3_probe: string | null;
  q4_options: string[];
  q4_probe: string | null;
  q5_options: string[];
  q5_probe: string | null;
  q6_options: string[];
  q6_probe: string | null;
  q7_rank1: string | null;
  q7_rank2: string | null;
  q7_rank3: string | null;
  q7_probe: string | null;
  q8_answer: string | null;
  q8_probe: string | null;
  q9_answer: string | null;
  q9_probe: string | null;
  q10_options: string[];
  q10_probe: string | null;
  q11_options: string[];
  q11_probe: string | null;
  q12_workflow: string | null;
  q12_probe: string | null;
  closing_question: string | null;
  transcript?: string | null;
}

interface QuestionDisplayProps {
  label: string;
  options?: string[];
  answer?: string | null;
  probe?: string | null;
  ranks?: { rank1?: string | null; rank2?: string | null; rank3?: string | null };
}

function QuestionDisplay({ label, options, answer, probe, ranks }: QuestionDisplayProps) {
  return (
    <div className="space-y-2 py-3 border-b border-border/50 last:border-0">
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-400">{label}</p>
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {options.map((opt) => (
            <Badge key={opt} variant="secondary" className="text-xs">{opt}</Badge>
          ))}
        </div>
      )}
      {answer && <p className="text-sm text-foreground">{answer}</p>}
      {ranks && (
        <div className="flex flex-wrap gap-3 text-sm">
          {ranks.rank1 && <span><strong className="text-violet-600 dark:text-violet-400">1.</strong> {ranks.rank1}</span>}
          {ranks.rank2 && <span><strong className="text-violet-600 dark:text-violet-400">2.</strong> {ranks.rank2}</span>}
          {ranks.rank3 && <span><strong className="text-violet-600 dark:text-violet-400">3.</strong> {ranks.rank3}</span>}
        </div>
      )}
      {probe && (
        <p className="text-sm text-muted-foreground italic border-l-2 border-violet-300 dark:border-violet-700 pl-3">
          {probe}
        </p>
      )}
    </div>
  );
}

export function InterviewResponses() {
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [transcripts, setTranscripts] = useState<Record<number, string>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/interview/responses");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResponses(data);
      const txMap: Record<number, string> = {};
      data.forEach((r: InterviewResponse) => {
        if (r.transcript) txMap[r.id] = r.transcript;
      });
      setTranscripts(txMap);
    } catch {
      toast({ title: "Error", description: "Failed to load responses.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResponses(); }, []);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const saveTranscript = async (id: number) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/interview/responses/${id}/transcript`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcripts[id] || "" }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Saved", description: "Transcript saved successfully." });
      await fetchResponses();
    } catch {
      toast({ title: "Error", description: "Failed to save transcript.", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-violet-500/10 mb-6">
          <ClipboardList className="h-8 w-8 text-violet-500" />
        </div>
        <h2 className="font-sans text-xl font-bold text-foreground mb-2">No Responses Yet</h2>
        <p className="text-muted-foreground">
          Interview responses will appear here once participants submit the fillable form.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-foreground" data-testid="text-responses-title">
            Interview Responses
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {responses.length} response{responses.length !== 1 ? "s" : ""} received
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchResponses} className="gap-2" data-testid="button-refresh-responses">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {responses.map((r) => {
          const isExpanded = expandedIds.has(r.id);
          return (
            <Card key={r.id} className="overflow-hidden" data-testid={`card-response-${r.id}`}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(r.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="font-sans text-base">Participant {r.participant_id}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(r.submitted_at).toLocaleDateString()} at {new Date(r.submitted_at).toLocaleTimeString()}
                        </span>
                        {r.transcript && <Badge variant="outline" className="text-xs">Has Transcript</Badge>}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent className="space-y-4 border-t">
                  <div className="space-y-0 divide-y-0">
                    <QuestionDisplay label="Q1. Encounter description" options={r.q1_options} probe={r.q1_description} />
                    <QuestionDisplay label="Q2. Animal(s) involved" options={r.q2_options} probe={r.q2_probe} />
                    <QuestionDisplay label="Q3. Risk perception" answer={r.q3_risk} probe={r.q3_probe} />
                    <QuestionDisplay label="Q4. Immediate response" options={r.q4_options} probe={r.q4_probe} />
                    <QuestionDisplay label="Q5. In-the-moment information needs" options={r.q5_options} probe={r.q5_probe} />
                    <QuestionDisplay label="Q6. Prevention supports" options={r.q6_options} probe={r.q6_probe} />
                    <QuestionDisplay label="Q7. App features (priority ranking)" ranks={{ rank1: r.q7_rank1, rank2: r.q7_rank2, rank3: r.q7_rank3 }} probe={r.q7_probe} />
                    <QuestionDisplay label="Q8. Willingness to report" answer={r.q8_answer} probe={r.q8_probe} />
                    <QuestionDisplay label="Q9. Trust and governance" answer={r.q9_answer} probe={r.q9_probe} />
                    <QuestionDisplay label="Q10. Privacy and ethical concerns" options={r.q10_options} probe={r.q10_probe} />
                    <QuestionDisplay label="Q11. Barriers to use" options={r.q11_options} probe={r.q11_probe} />
                    <QuestionDisplay label="Q12. Ideal workflow" probe={r.q12_workflow || r.q12_probe} />
                    {r.closing_question && (
                      <QuestionDisplay label="Closing Question" probe={r.closing_question} />
                    )}
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      <Label className="font-semibold text-base">Interview Transcript</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add the full transcript from the recorded interview here. This will be available for the AI Paper Generator to use.
                    </p>
                    <Textarea
                      placeholder="Paste or type the interview transcript here..."
                      value={transcripts[r.id] || ""}
                      onChange={(e) => setTranscripts((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      rows={10}
                      className="font-mono text-sm"
                      data-testid={`textarea-transcript-${r.id}`}
                    />
                    <Button
                      onClick={() => saveTranscript(r.id)}
                      disabled={savingId === r.id}
                      className="gap-2 bg-violet-600 hover:bg-violet-700"
                      data-testid={`button-save-transcript-${r.id}`}
                    >
                      {savingId === r.id ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                      ) : (
                        <><Save className="h-4 w-4" /> Save Transcript</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
