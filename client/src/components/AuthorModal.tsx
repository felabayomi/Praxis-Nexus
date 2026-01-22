import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Database, FileText, Mail, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AuthorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthorModal({ open, onOpenChange }: AuthorModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. I'll respond as soon as possible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or email directly at praxinex@gmail.com",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl">Felix Abayomi</DialogTitle>
          <DialogDescription>
            EdD Researcher exploring AI's ecological and economic entanglements
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="about" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 mt-4 grid w-auto grid-cols-5 h-auto">
            <TabsTrigger value="about" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Database className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1.5 text-xs sm:text-sm py-2">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-6 py-4">
            <TabsContent value="about" className="mt-0 space-y-4">
              <h3 className="font-serif text-lg font-semibold">About the Author</h3>
              <p className="text-muted-foreground leading-relaxed">
                Felix Abayomi is a doctoral researcher in the EdD (Doctor of Education) program, 
                Cohort 2026. His research explores the complex intersections of artificial intelligence, 
                ecological conservation, and economic systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This academic inquiry journal, Praxis Nexus, documents his ongoing investigation into 
                how AI technologies are reshaping human-wildlife relations and conservation practices 
                across the Global South and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The research draws on interdisciplinary frameworks from science and technology studies, 
                political ecology, and critical data studies to examine the ethical, social, and 
                environmental implications of AI-mediated conservation.
              </p>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0 space-y-4">
              <h3 className="font-serif text-lg font-semibold">Privacy Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                This website respects your privacy and is committed to protecting your personal information.
              </p>
              <h4 className="font-medium mt-4">Information Collection</h4>
              <p className="text-muted-foreground leading-relaxed">
                We only collect information that you voluntarily provide through the contact form, 
                including your name, email address, and message content. This information is used 
                solely to respond to your inquiry.
              </p>
              <h4 className="font-medium mt-4">Cookies and Tracking</h4>
              <p className="text-muted-foreground leading-relaxed">
                This website uses minimal local storage for theme preferences and presentation 
                template selections. We do not use third-party tracking or analytics cookies.
              </p>
              <h4 className="font-medium mt-4">Data Security</h4>
              <p className="text-muted-foreground leading-relaxed">
                Contact form submissions are transmitted securely and handled in accordance with 
                academic research ethics standards.
              </p>
            </TabsContent>

            <TabsContent value="data" className="mt-0 space-y-4">
              <h3 className="font-serif text-lg font-semibold">Data Usage</h3>
              <p className="text-muted-foreground leading-relaxed">
                This section outlines how data is used in connection with this academic journal.
              </p>
              <h4 className="font-medium mt-4">Research Data</h4>
              <p className="text-muted-foreground leading-relaxed">
                All research content presented in this journal follows institutional ethics guidelines 
                and data protection regulations. Any case studies or examples have been appropriately 
                anonymized where necessary.
              </p>
              <h4 className="font-medium mt-4">User Data</h4>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, share, or transfer your personal information to third parties. 
                Contact information is retained only for the purpose of responding to inquiries 
                and is deleted after correspondence is complete.
              </p>
              <h4 className="font-medium mt-4">AI Features</h4>
              <p className="text-muted-foreground leading-relaxed">
                The AI-enhanced presentation mode uses language models to generate supplementary 
                insights. These features process only the published journal content and do not 
                collect or store user interactions.
              </p>
            </TabsContent>

            <TabsContent value="terms" className="mt-0 space-y-4">
              <h3 className="font-serif text-lg font-semibold">Terms of Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing this website, you agree to the following terms and conditions.
              </p>
              <h4 className="font-medium mt-4">Academic Use</h4>
              <p className="text-muted-foreground leading-relaxed">
                The content of this journal is provided for educational and research purposes. 
                You may cite this work following standard academic citation practices, with 
                appropriate attribution to the author.
              </p>
              <h4 className="font-medium mt-4">Copyright</h4>
              <p className="text-muted-foreground leading-relaxed">
                All original content, including text, research findings, and analytical frameworks, 
                is copyright © Felix Abayomi 2026. Unauthorized reproduction or distribution 
                without permission is prohibited.
              </p>
              <h4 className="font-medium mt-4">Disclaimer</h4>
              <p className="text-muted-foreground leading-relaxed">
                This journal represents ongoing academic inquiry and should be understood as 
                work in progress. The views expressed are those of the author and do not 
                necessarily represent institutional positions.
              </p>
            </TabsContent>

            <TabsContent value="contact" className="mt-0 space-y-4">
              <h3 className="font-serif text-lg font-semibold">Contact & Support</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Have questions about the research or interested in collaboration? 
                Send me a message using the form below.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-contact-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    data-testid="input-contact-subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your message..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="input-contact-message"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="p-4 border-t text-center text-xs text-muted-foreground">
          © Felix Abayomi 2026. All rights reserved.
        </div>
      </DialogContent>
    </Dialog>
  );
}
