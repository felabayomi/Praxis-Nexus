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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Database, FileText, Mail, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@shared/contactSchema";

interface AuthorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthorModal({ open, onOpenChange }: AuthorModalProps) {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. I'll respond as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or email directly at praxinex@gmail.com",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl">Felix Olusola Abayomi</DialogTitle>
          <DialogDescription>
            EdD Student, Antioch University - Exploring AI's ecological and economic entanglements
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
                <strong>Felix Olusola ABAYOMI</strong> is a doctoral student in the EdD in Educational 
                and Professional Practice program at Antioch University (Online), Yellow Springs, Ohio.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His research explores the complex intersections of artificial intelligence, 
                ecological conservation, and economic systems, with a particular focus on how AI 
                technologies are reshaping human-wildlife relations and conservation practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This academic inquiry journal, Praxis Nexus, documents his ongoing investigation 
                as part of the EdD Cohort 2026, drawing on interdisciplinary frameworks from science 
                and technology studies, political ecology, and critical data studies to examine the 
                ethical, social, and environmental implications of AI-mediated conservation.
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your@email.com" 
                              {...field} 
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What is this regarding?" 
                            {...field} 
                            data-testid="input-contact-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..."
                            rows={4}
                            {...field} 
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
              </Form>
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
