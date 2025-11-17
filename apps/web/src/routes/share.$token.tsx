import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
  Eye,
  Edit as EditIcon,
  Save,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useToast } from "@/hooks/use-toast";

export default function SharedNotePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState<any>(null);
  const [permission, setPermission] = useState<string>("");
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start editing the note...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
    ],
    content: "",
    editable: false, // Will be set based on permission
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  useEffect(() => {
    if (token) {
      loadSharedNote();
    }
  }, [token]);

  const loadSharedNote = async (pwd?: string) => {
    try {
      setLoading(true);
      setError("");

      const url = pwd
        ? `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/public/share/${token}?password=${encodeURIComponent(pwd)}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/public/share/${token}`;

      const response = await fetch(url, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresPassword) {
          setRequiresPassword(true);
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Failed to load shared note");
      }

      setNote(data.note);
      setNoteTitle(data.note.title);
      setPermission(data.permission);
      setRequiresPassword(false);

      // Set editor content and make it editable if permission is EDIT
      if (editor) {
        editor.commands.setContent(data.note.content);
        editor.setEditable(data.permission === "EDIT");
      }
    } catch (err: any) {
      console.error("Error loading shared note:", err);
      setError(err.message || "Failed to load shared note");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!editor || permission !== "EDIT") return;

    try {
      setSaving(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/public/share/${token}/save`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: noteTitle,
            content: editor.getHTML(),
            password: password || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save note");
      }

      toast({
        title: "Success",
        description: "Your changes have been saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save note",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadSharedNote(password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading shared note...</p>
      </div>
    );
  }

  if (requiresPassword) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-royal-lg border-2">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-playfair text-2xl">
              Password Protected
            </CardTitle>
            <p className="text-muted-foreground">
              This note is password protected. Please enter the password to view
              it.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Unlock Note
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-royal-lg border-2">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{error || "Note not found"}</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-2xl font-bold">{note.title}</h1>
              <p className="text-sm text-muted-foreground">
                Shared by {note.owner.name || note.owner.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  permission === "EDIT"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {permission === "EDIT" ? (
                  <>
                    <EditIcon className="w-3 h-3 inline mr-1" />
                    Can Edit
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 inline mr-1" />
                    View Only
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {permission === "EDIT" && editor ? (
          <Card className="shadow-royal-md border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Input
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="font-playfair text-2xl font-bold border-none focus-visible:ring-0 px-0 flex-1"
                  placeholder="Note title..."
                />
                <Button onClick={handleSaveNote} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Editor Toolbar */}
              <div className="border-t border-b border-border bg-muted/30 px-4 py-2 flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant={editor.isActive("bold") ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant={editor.isActive("italic") ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "secondary"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "secondary"
                      : "ghost"
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
                  type="button"
                  variant={
                    editor.isActive("bulletList") ? "secondary" : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant={
                    editor.isActive("orderedList") ? "secondary" : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
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

              {/* Editor Content */}
              <div className="border rounded-lg bg-background">
                <EditorContent editor={editor} />
              </div>

              <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                You have edit access. Make your changes and click "Save Changes"
                above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-royal-md border-2">
            <CardContent className="pt-6">
              <h1 className="font-playfair text-3xl font-bold mb-6">
                {note.title}
              </h1>
              <div
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <p className="text-center text-sm text-muted-foreground mt-6">
                This is a read-only view. You cannot edit this note.
              </p>
            </CardContent>
          </Card>
        )}

        {permission === "VIEW" && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            This is a read-only view. You cannot edit this note.
          </p>
        )}

        <div className="text-center mt-6">
          <Button onClick={() => navigate("/")}>Go to CloudCB</Button>
        </div>
      </div>
    </div>
  );
}
