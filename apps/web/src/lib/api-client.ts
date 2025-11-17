const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Important: send cookies with the request
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Notes API
export const notesApi = {
  getAll: () => apiRequest<any[]>("/notes"),

  getById: (id: string) => apiRequest<any>(`/notes/${id}`),

  create: (data: {
    title: string;
    content: string;
    notebookId?: string;
    contentMime?: string;
  }) =>
    apiRequest<any>("/notes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: {
      title?: string;
      content?: string;
      pinned?: boolean;
      contentMime?: string;
    }
  ) =>
    apiRequest<any>(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ message: string }>(`/notes/${id}`, {
      method: "DELETE",
    }),
};

// Notebooks API
export const notebooksApi = {
  getAll: () => apiRequest<any[]>("/notebooks"),

  getById: (id: string) => apiRequest<any>(`/notebooks/${id}`),

  create: (data: {
    title: string;
    description?: string;
    visibility?: string;
  }) =>
    apiRequest<any>("/notebooks", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: { title?: string; description?: string; visibility?: string }
  ) =>
    apiRequest<any>(`/notebooks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ message: string }>(`/notebooks/${id}`, {
      method: "DELETE",
    }),
};

// Tags API
export const tagsApi = {
  getAll: () => apiRequest<any[]>("/tags"),

  create: (name: string) =>
    apiRequest<any>("/tags", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  addToNote: (noteId: string, tagName: string) =>
    apiRequest<any>("/tags/note", {
      method: "POST",
      body: JSON.stringify({ noteId, tagName }),
    }),

  removeFromNote: (noteId: string, tagId: string) =>
    apiRequest<{ message: string }>(`/tags/note/${noteId}/${tagId}`, {
      method: "DELETE",
    }),
};

// Share API
export const shareApi = {
  createLink: (data: {
    noteId: string;
    permission: "VIEW" | "EDIT";
    expiresIn?: number;
    password?: string;
  }) =>
    apiRequest<any>("/share/link", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getLinks: (noteId: string) => apiRequest<any[]>(`/share/link/${noteId}`),

  revokeLink: (token: string) =>
    apiRequest<{ message: string }>(`/share/link/${token}`, {
      method: "DELETE",
    }),

  addCollaborator: (data: {
    noteId: string;
    email: string;
    role: "VIEWER" | "EDITOR";
  }) =>
    apiRequest<any>("/share/collaborator", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getCollaborators: (noteId: string) =>
    apiRequest<any[]>(`/share/collaborator/${noteId}`),

  removeCollaborator: (id: string) =>
    apiRequest<{ message: string }>(`/share/collaborator/${id}`, {
      method: "DELETE",
    }),
};
