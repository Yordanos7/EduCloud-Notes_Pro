import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Share2,
  Trash2,
  Edit,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";
import gsap from "gsap";
import { useToast } from "@/hooks/use-toast";
import { notesApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  pinned: boolean;
}

const SubDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const gridRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (gridRef.current && !loading) {
      const cards = gridRef.current.querySelectorAll(".note-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [notes, loading]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await notesApi.getAll();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewNote = () => {
    navigate("/editor");
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesApi.delete(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast({
        title: "Note deleted",
        description: "Your note has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const handleShareNote = (noteId: string) => {
    navigate(`/collaborate/${noteId}`);
  };

  const handleShareNoteOld = async (noteId: string) => {
    try {
      const { shareApi } = await import("@/lib/api-client");
      const shareLink = await shareApi.createLink({
        noteId,
        permission: "VIEW",
      });

      // Copy to clipboard
      await navigator.clipboard.writeText(shareLink.url);

      toast({
        title: "Share link created",
        description: "Link copied to clipboard!",
      });
    } catch (error) {
      console.error("Error creating share link:", error);
      toast({
        title: "Error",
        description: "Failed to create share link OLD",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getSnippet = (content: string) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="font-playfair text-2xl font-bold text-foreground">
              EduCloud Notes
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="font-playfair text-4xl font-bold mb-2 text-foreground">
            My Notes
          </h2>
          <p className="text-muted-foreground text-lg">
            Organize and manage all your study materials
          </p>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Loading notes...</p>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="note-card hover-lift shadow-royal-md border-2 cursor-pointer group"
                >
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl line-clamp-1">
                      {note.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Updated {getRelativeTime(note.updatedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {getSnippet(note.content)}
                    </p>

                    <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-smooth">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editor/${note.id}`);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareNote(note.id);
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notes.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">
                  No notes yet. Create your first note!
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-royal-lg hover:scale-110 transition-smooth animate-float"
        onClick={handleNewNote}
      >
        <Plus className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default SubDashboard;
