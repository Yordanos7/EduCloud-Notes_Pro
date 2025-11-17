import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Mail } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is EduCloud Notes?",
      answer:
        "EduCloud Notes is a cloud-based note-taking platform designed specifically for students. It combines powerful features like real-time collaboration, cloud storage, and PDF export to help you organize and manage your study materials effectively.",
    },
    {
      question: "How do I create a new note?",
      answer:
        "Simply click on the floating '+' button on your dashboard, or navigate to the Editor page. You can start typing immediately and your notes will be auto-saved.",
    },
    {
      question: "Can I share my notes with classmates?",
      answer:
        "Yes! Click the 'Share' button on any note to generate a shareable link. You can choose whether recipients have view-only or edit access.",
    },
    {
      question: "How do I export notes to PDF?",
      answer:
        "Open any note in the editor and click the 'Export PDF' button in the toolbar. Your note will be converted to a beautifully formatted PDF document.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All your notes are encrypted and stored securely in the cloud. We use industry-standard security practices to protect your data.",
    },
    {
      question: "Can I access my notes offline?",
      answer:
        "While EduCloud Notes requires an internet connection for syncing, you can export your notes as PDFs for offline access.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-royal-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-playfair text-2xl font-bold">About & Help</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Welcome to EduCloud Notes
          </h2>
          <p className="text-xl text-white/90">
            Your complete guide to organizing, sharing, and collaborating on
            your study notes
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h3 className="font-playfair text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h3>

        <Card className="shadow-royal-md border-2 p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </section>

      {/* Support Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="font-playfair text-3xl font-bold mb-4">
            Need More Help?
          </h3>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Our support team is here to help
            you.
          </p>
          <Button
            size="lg"
            className="shadow-royal-md hover:scale-105 transition-smooth"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </Button>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h3 className="font-playfair text-3xl font-bold mb-8 text-center">
          Key Features
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-royal-md hover-lift">
            <h4 className="font-playfair text-xl font-semibold mb-2">
              Cloud Storage
            </h4>
            <p className="text-muted-foreground">
              All your notes are automatically saved to the cloud, accessible
              from any device, anywhere.
            </p>
          </Card>
          <Card className="p-6 shadow-royal-md hover-lift">
            <h4 className="font-playfair text-xl font-semibold mb-2">
              Rich Text Editor
            </h4>
            <p className="text-muted-foreground">
              Format your notes with bold, italic, lists, colors, and more using
              our intuitive editor.
            </p>
          </Card>
          <Card className="p-6 shadow-royal-md hover-lift">
            <h4 className="font-playfair text-xl font-semibold mb-2">
              Collaboration
            </h4>
            <p className="text-muted-foreground">
              Share notes with classmates and collaborate in real-time on group
              projects.
            </p>
          </Card>
          <Card className="p-6 shadow-royal-md hover-lift">
            <h4 className="font-playfair text-xl font-semibold mb-2">
              PDF Export
            </h4>
            <p className="text-muted-foreground">
              Export your notes as professional PDFs for offline studying or
              printing.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
