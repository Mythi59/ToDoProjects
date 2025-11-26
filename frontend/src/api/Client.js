const API_BASE_URL = "https://to-do-projects-backend.vercel.app";

const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    throw error;
  }
};

export const authAPI = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userInfo) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userInfo),
    }),
};

export const companiesAPI = {
  getAll: () => request("/company"),
  getById: (id) => request(`/company/${id}`),
  create: (companyData) =>
    request("/company", {
      method: "POST",
      body: JSON.stringify(companyData),
    }),
  update: (id, companyData) =>
    request(`/company/${id}`, {
      method: "PUT",
      body: JSON.stringify(companyData),
    }),
};

export const projectsAPI = {
  getAll: () => request("/projects"),
  getByProject: (projectId) => request(`/projects/company/${projectId}`),
  getById: (id) => request(`/projects/${id}`),
  create: (projectData) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),
  update: (id, projectData) =>
    request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    }),
};

export const userStoriesAPI = {
  getAll: () => request("/user-stories"),
  getByProject: (projectId) => request(`/user-stories/project/${projectId}`),
  getById: (id) => request(`/user-stories/${id}`),
  create: (userStoryData) =>
    request("/user-stories", {
      method: "POST",
      body: JSON.stringify(userStoryData),
    }),
  update: (id, userStoryData) =>
    request(`/user-stories/${id}`, {
      method: "PUT",
      body: JSON.stringify(userStoryData),
    }),
};

export const ticketsAPI = {
  getAll: () => request("/tickets"),
  getByUserStory: (userStoryId) =>
    request(`/tickets/user-story/${userStoryId}`),
  getByStatus: (status) => request(`/tickets/status/${status}`),
  getHistory: () => request("/tickets/history"),
  getById: (id) => request(`/tickets/${id}`),
  create: (ticketData) =>
    request("/tickets", {
      method: "POST",
      body: JSON.stringify(ticketData),
    }),
  update: (id, ticketData) =>
    request(`/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(ticketData),
    }),
  addComment: (id, commentData) =>
    request(`/tickets/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    }),
};

export default {
  auth: authAPI,
  companies: companiesAPI,
  projects: projectsAPI,
  userStories: userStoriesAPI,
  tickets: ticketsAPI,
};
