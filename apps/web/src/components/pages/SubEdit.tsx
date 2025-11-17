import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Save,
  Share2,
  Download,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { notesApi } from "@/lib/api-client";
import gsap from "gsap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import jsPDF from "jspdf";

const SubEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("Untitled Note");
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your notes...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  useEffect(() => {
    if (toolbarRef.current) {
      gsap.fromTo(
        toolbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  // Auto-save effect
  useEffect(() => {
    if (!id || loading || !editor) return;

    const timer = setTimeout(() => {
      handleSave(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, editor?.getHTML()]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const note = await notesApi.getById(id!);
      setTitle(note.title);
      if (editor) {
        editor.commands.setContent(note.content);
      }
      setLastSaved(new Date(note.updatedAt));
    } catch (error) {
      console.error("Error loading note:", error);
      toast({
        title: "Error",
        description: "Failed to load note",
        variant: "destructive",
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (isAutoSave = false) => {
    if (!editor) return;

    try {
      setSaving(true);
      const content = editor.getHTML();

      if (id) {
        // Update existing note
        await notesApi.update(id, {
          title,
          content,
          contentMime: "text/html",
        });
      } else {
        // Create new note
        const newNote = await notesApi.create({
          title,
          content,
          contentMime: "text/html",
        });
        // Navigate to the new note's edit page
        navigate(`/editor/${newNote.id}`, { replace: true });
      }

      setLastSaved(new Date());

      if (!isAutoSave) {
        toast({
          title: "Note saved",
          description: "Your note has been saved successfully.",
        });
      }
    } catch (error) {
      console.error("Error saving note:", error);
      if (!isAutoSave) {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (id) {
      navigate(`/collaborate/${id}`);
    } else {
      toast({
        title: "Save first",
        description: "Please save your note before sharing.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    if (!editor) return;

    try {
      toast({
        title: "Generating PDF...",
        description: "Creating your PDF document.",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Helper function to add text with word wrap
      const addText = (
        text: string,
        fontSize: number,
        fontStyle: string = "normal",
        color: number[] = [0, 0, 0]
      ) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", fontStyle);
        pdf.setTextColor(color[0], color[1], color[2]);

        const lines = pdf.splitTextToSize(text, contentWidth);
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += fontSize * 0.5;
        });
      };

      // Add title
      addText(title, 20, "bold", [26, 26, 26]);
      yPosition += 5;

      // Add date
      const dateText = `Generated on ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;
      addText(dateText, 10, "normal", [102, 102, 102]);
      yPosition += 10;

      // Add separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Parse HTML content and convert to text
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = editor.getHTML();

      const processNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          if (text) {
            addText(text, 11, "normal", [51, 51, 51]);
            yPosition += 2;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const tagName = element.tagName.toLowerCase();

          switch (tagName) {
            case "h1":
              yPosition += 5;
              addText(element.textContent || "", 18, "bold", [26, 26, 26]);
              yPosition += 5;
              break;
            case "h2":
              yPosition += 4;
              addText(element.textContent || "", 16, "bold", [26, 26, 26]);
              yPosition += 4;
              break;
            case "h3":
              yPosition += 3;
              addText(element.textContent || "", 14, "bold", [26, 26, 26]);
              yPosition += 3;
              break;
            case "p":
              const pText = element.textContent?.trim();
              if (pText) {
                addText(pText, 11, "normal", [51, 51, 51]);
                yPosition += 4;
              }
              break;
            case "strong":
            case "b":
              addText(element.textContent || "", 11, "bold", [26, 26, 26]);
              break;
            case "em":
            case "i":
              addText(element.textContent || "", 11, "italic", [51, 51, 51]);
              break;
            case "ul":
            case "ol":
              yPosition += 2;
              Array.from(element.children).forEach((li, index) => {
                const bullet = tagName === "ul" ? "• " : `${index + 1}. `;
                const liText = li.textContent?.trim();
                if (liText) {
                  pdf.setFontSize(11);
                  pdf.setFont("helvetica", "normal");
                  pdf.setTextColor(51, 51, 51);
                  const lines = pdf.splitTextToSize(
                    bullet + liText,
                    contentWidth - 5
                  );
                  lines.forEach((line: string, lineIndex: number) => {
                    if (yPosition > pageHeight - margin) {
                      pdf.addPage();
                      yPosition = margin;
                    }
                    pdf.text(line, margin + (lineIndex > 0 ? 5 : 0), yPosition);
                    yPosition += 5.5;
                  });
                }
              });
              yPosition += 2;
              break;
            case "a":
              const linkText = element.textContent || "";
              const href = element.getAttribute("href") || "";
              addText(`${linkText} (${href})`, 11, "normal", [0, 102, 204]);
              break;
            case "br":
              yPosition += 5;
              break;
            default:
              // Process children for other elements
              Array.from(element.childNodes).forEach(processNode);
          }
        }
      };

      // Process all nodes
      Array.from(tempDiv.childNodes).forEach(processNode);

      // Generate blob and create download link
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      const fileName = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${new Date().getTime()}.pdf`;

      // Create temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      toast({
        title: "Success!",
        description: "Your note has been exported to PDF.",
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast({
        title: "Export failed",
        description: "Failed to export note to PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading note...</p>
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="max-w-md font-playfair text-xl font-semibold border-none focus-visible:ring-0 px-2"
              placeholder="Note title..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="border-t border-border bg-muted/30 px-4 py-2">
          <div className="container mx-auto flex flex-wrap gap-1">
            <Button
              variant={editor.isActive("bold") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
            <Button
              variant={
                editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant={
                editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
            <Button
              variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
            <Button
              variant={editor.isActive("link") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                const url = window.prompt("Enter URL:");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-royal-md border border-border overflow-hidden">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="fixed bottom-4 left-4 text-sm text-muted-foreground bg-card px-3 py-2 rounded-full shadow-royal-sm border border-border">
        {saving
          ? "Saving..."
          : lastSaved
            ? `Last saved ${lastSaved.toLocaleTimeString()}`
            : "All changes saved"}
      </div>
    </div>
  );
};

export default SubEdit;
