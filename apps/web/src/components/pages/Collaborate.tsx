import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Copy,
  Link as LinkIcon,
  Trash2,
  UserPlus,
  Edit,
  Clock,
  Lock,
  Save,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareApi, notesApi } from "@/lib/api-client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { authClient } from "@/lib/auth-client";

const Collaborate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [note, setNote] = useState<any>(null);
  const [shareLinks, setShareLinks] = useState<any[]>([]);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditor, setIsEditor] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [saving, setSaving] = useState(false);

  // Form states
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [collaboratorRole] = useState<"EDITOR">("EDITOR"); // Always EDITOR
  const [linkPermission, setLinkPermission] = useState<"VIEW" | "EDIT">("VIEW");
  const [linkExpireDays, setLinkExpireDays] = useState<number | undefined>(
    undefined
  );
  const [linkPassword, setLinkPassword] = useState("");

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
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [noteData, linksData, collaboratorsData] = await Promise.all([
        notesApi.getById(id!),
        shareApi.getLinks(id!),
        shareApi.getCollaborators(id!),
      ]);

      // Generate full URLs for existing links
      const linksWithUrls = linksData.map((link: any) => ({
        ...link,
        url: `${window.location.origin}/share/${link.token}`,
      }));

      // Check if current user is owner or editor
      const session = await authClient.getSession();
      const currentUserId = session?.data?.user?.id;
      const isOwner = noteData.ownerId === currentUserId;
      const isCollaborator = collaboratorsData.some(
        (c: any) => c.userId === currentUserId && c.role === "EDITOR"
      );

      setNote(noteData);
      setNoteTitle(noteData.title);
      setNoteContent(noteData.content);
      setShareLinks(linksWithUrls);
      setCollaborators(collaboratorsData);
      setIsEditor(isOwner || isCollaborator);

      // Set editor content
      if (editor) {
        editor.commands.setContent(noteData.content);
      }
    } catch (error) {
      console.error("Error loading collaboration data:", error);
      toast({
        title: "Error",
        description: "Failed to load collaboration data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!editor || !isEditor) return;

    try {
      setSaving(true);
      await notesApi.update(id!, {
        title: noteTitle,
        content: editor.getHTML(),
        contentMime: "text/html",
      });

      toast({
        title: "Note saved",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateShareLink = async () => {
    try {
      const data: any = {
        noteId: id!,
        permission: linkPermission,
      };

      if (linkExpireDays) {
        data.expiresIn = linkExpireDays;
      }

      if (linkPassword) {
        data.password = linkPassword;
      }

      const shareLink = await shareApi.createLink(data);

      // Generate the full URL
      const fullUrl = `${window.location.origin}/share/${shareLink.token}`;
      shareLink.url = fullUrl;

      await navigator.clipboard.writeText(fullUrl);

      toast({
        title: "Share link created",
        description: "Link copied to clipboard!",
      });

      setShareLinks([shareLink, ...shareLinks]);
      setLinkPassword("");
      setLinkExpireDays(undefined);
    } catch (error) {
      console.error("Error creating share link:", error);
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    }
  };

  const handleRevokeLink = async (token: string) => {
    try {
      await shareApi.revokeLink(token);
      setShareLinks(shareLinks.filter((link) => link.token !== token));
      toast({
        title: "Link revoked",
        description: "Share link has been revoked",
      });
    } catch (error) {
      console.error("Error revoking link:", error);
      toast({
        title: "Error",
        description: "Failed to revoke link",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleAddCollaborator = async () => {
    if (!newCollaboratorEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const collaborator = await shareApi.addCollaborator({
        noteId: id!,
        email: newCollaboratorEmail,
        role: collaboratorRole,
      });

      setCollaborators([...collaborators, collaborator]);
      setNewCollaboratorEmail("");

      toast({
        title: "Collaborator added",
        description: `${newCollaboratorEmail} has been added`,
      });
    } catch (error: any) {
      console.error("Error adding collaborator:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add collaborator",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCollaborator = async (collaboratorId: string) => {
    try {
      await shareApi.removeCollaborator(collaboratorId);
      setCollaborators(collaborators.filter((c) => c.id !== collaboratorId));
      toast({
        title: "Collaborator removed",
        description: "Collaborator has been removed",
      });
    } catch (error) {
      console.error("Error removing collaborator:", error);
      toast({
        title: "Error",
        description: "Failed to remove collaborator",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Note not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-playfair text-2xl font-bold">
              Collaboration Settings
            </h1>
            <p className="text-sm text-muted-foreground">{note.title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Note Editor - Only show if user is owner or editor */}
          {isEditor && editor && (
            <Card className="shadow-royal-md border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-playfair flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Edit Note
                  </CardTitle>
                  <Button onClick={handleSaveNote} disabled={saving} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
                <CardDescription>
                  Edit the note content and save your changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="noteTitle">Title</Label>
                  <Input
                    id="noteTitle"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="font-semibold text-lg"
                  />
                </div>

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
                    <LinkIcon2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Editor Content */}
                <div className="border rounded-lg bg-background">
                  <EditorContent editor={editor} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Collaborator */}
          <Card className="shadow-royal-md border-2">
            <CardHeader>
              <CardTitle className="font-playfair flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Add Editor
              </CardTitle>
              <CardDescription>
                Add registered users as editors to collaborate on this note
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="editor@example.com"
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  User must be registered to be added as an editor
                </p>
              </div>
              <Button onClick={handleAddCollaborator} className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Editor
              </Button>
            </CardContent>
          </Card>

          {/* Current Collaborators */}
          <Card className="shadow-royal-md border-2">
            <CardHeader>
              <CardTitle className="font-playfair">
                Collaborators ({collaborators.length})
              </CardTitle>
              <CardDescription>
                People who have access to this note
              </CardDescription>
            </CardHeader>
            <CardContent>
              {collaborators.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No collaborators yet
                </p>
              ) : (
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {collaborator.user.name?.[0]?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {collaborator.user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {collaborator.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          <Edit className="w-3 h-3 inline mr-1" />
                          Editor
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveCollaborator(collaborator.id)
                          }
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create Share Link */}
          <Card className="shadow-royal-md border-2">
            <CardHeader>
              <CardTitle className="font-playfair flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Create Share Link
              </CardTitle>
              <CardDescription>
                Generate a link that anyone can use to access this note
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permission">Permission</Label>
                  <select
                    id="permission"
                    value={linkPermission}
                    onChange={(e) =>
                      setLinkPermission(e.target.value as "VIEW" | "EDIT")
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="VIEW">View Only</option>
                    <option value="EDIT">Can Edit</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires">Expires In (days)</Label>
                  <Input
                    id="expires"
                    type="number"
                    placeholder="Never"
                    value={linkExpireDays || ""}
                    onChange={(e) =>
                      setLinkExpireDays(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password (optional)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave empty for no password"
                  value={linkPassword}
                  onChange={(e) => setLinkPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateShareLink} className="w-full">
                <LinkIcon className="w-4 h-4 mr-2" />
                Generate Link
              </Button>
            </CardContent>
          </Card>

          {/* Active Share Links */}
          <Card className="shadow-royal-md border-2">
            <CardHeader>
              <CardTitle className="font-playfair">
                Active Share Links ({shareLinks.length})
              </CardTitle>
              <CardDescription>Links that are currently active</CardDescription>
            </CardHeader>
            <CardContent>
              {shareLinks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No active share links
                </p>
              ) : (
                <div className="space-y-3">
                  {shareLinks.map((link) => (
                    <div
                      key={link.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              link.permission === "EDIT"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {link.permission === "EDIT"
                              ? "Can Edit"
                              : "View Only"}
                          </span>
                          {link.isProtected && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                              <Lock className="w-3 h-3 inline mr-1" />
                              Protected
                            </span>
                          )}
                          {link.expiresAt && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Expires{" "}
                              {new Date(link.expiresAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(link.url)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeLink(link.token)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={link.url}
                          readOnly
                          className="flex-1 font-mono text-sm"
                          onClick={(e) => {
                            e.currentTarget.select();
                            handleCopyLink(link.url);
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(link.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
