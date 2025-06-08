import httpService from "@/service/ApiService";

// Get all engineers with capacity data
export async function getEngineersWithCapacity() {
  const res = await httpService.get("/api/engineers");
  return res.data;
}

// Get list of engineers (raw, for assignment form)
export async function getEngineers() {
  const res = await httpService.get("/api/engineers");
  return res.data;
}

// Get list of projects
export async function getProjects() {
  const res = await httpService.get("/api/projects");
  return res.data;
}

// Get a single project by ID
export async function getProjectById(id: string) {
  const res = await httpService.get(`/api/projects/${id}`);
  return res.data;
}

// Create a new project
export async function createProject(data: any) {
  const res = await httpService.post("/api/projects", data);
  return res.data;
}

// Update an existing project
export async function updateProject(id: string, data: any) {
  const res = await httpService.put(`/api/projects/${id}`, data);
  return res.data;
}

// Delete a project
export async function deleteProject(id: string) {
  const res = await httpService.delete(`/api/projects/${id}`);
  return res.data;
}

// Create a new assignment
export async function createAssignment(data: any) {
  const res = await httpService.post("/api/assignments", data);
  return res.data;
}

// Get assignments for the logged-in engineer
export async function getMyAssignments() {
  const res = await httpService.get("/api/assignments/me");
  return res.data;
}

// -------- Authentication --------

// Log in (returns token & user object)
export async function loginUser(email: string, password: string) {
  const res = await httpService.post("/api/auth/login", { email, password });
  return res.data;
}
