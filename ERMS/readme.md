
#  Engineering Resource Management System

##  Overview

A full-stack application to manage engineering team assignments across projects. Track who’s working on what, how much capacity is used, and plan future allocations with ease.

> **Duration:** 2 Days (16 hours)  
> **Stack:** React + TypeScript (frontend), Node.js + Express (backend), MongoDB (database), pnpm (package manager)

---


##  Authentication & Roles

- **JWT-based Auth**
- **Roles:**
  - `manager`: Can assign engineers and manage projects.
  - `engineer`: Can view own profile and assignments.

---

##  Setup Instructions

### Prerequisites

- Node.js (v18+)
- pnpm
- MongoDB instance (local/cloud)

### 1. Clone the Repository

```bash
git clone <url>
cd engg-resource-manager
```

### 2. Backend Setup

```bash
cd RMS-backend
pnpm install
pnpm run dev
```

### 3. Frontend Setup

```bash
cd engineering-resource-management
pnpm install
pnpm run dev
```



## API Endpoints

### Auth

```http
POST /api/auth/login         # Login
GET /api/auth/profile        # Fetch current user profile
```

### Engineers

```http
GET /api/engineers
GET /api/engineers/:id
GET /api/engineers/:id/capacity
```

### Projects

```http
GET /api/projects
POST /api/projects
GET /api/projects/:id
```

### Assignments

```http
GET /api/assignments
POST /api/assignments
PUT /api/assignments/:id
DELETE /api/assignments/:id
```

---

##  Sample JSON Data

### 🔹 User (Engineer)

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "role": "engineer",
  "skills": ["React", "Node.js"],
  "seniority": "mid",
  "maxCapacity": 100,
  "department": "Frontend"
}
```

### 🔹 Project

```json
{
  "name": "Website Redesign",
  "description": "Modernize the UI/UX",
  "startDate": "2024-06-01",
  "endDate": "2024-08-01",
  "requiredSkills": ["React", "Tailwind"],
  "teamSize": 3,
  "status": "active",
  "managerId": "663fa9..."
}
```

### 🔹 Assignment

```json
{
  "engineerId": "663fa0...",
  "projectId": "663fa1...",
  "allocationPercentage": 60,
  "startDate": "2024-06-10",
  "endDate": "2024-07-31",
  "role": "Frontend Developer"
}
```

---

## Dashboard Features

### Manager

-  Team Overview: Capacity bars per engineer
-  Create Assignments
-  View Projects + Create/Edit/Delete
-  Availability Forecast

### Engineer

-  View current and upcoming assignments
-  View/edit own profile

---


##  AI-Powered Development

### Tools Used

- **ChatGPT**: API design, validation functions, error handling

### Examples

- Generated 70% of the initial form validation logic in React Hook Form
- Refactored MongoDB aggregation queries using AI code review
- Prompted ChatGPT for Express API best practices

### Challenges

- AI suggested verbose logic for capacity calc – rewrote it for clarity
- Occasional misuse of Mongoose schema types, which we caught in testing



##  Sample Seed Data

Includes:

-  4 Engineers (mix of seniority, skills, capacities)
-  3 Projects (planning, active, completed)
-  6 Assignments (varying percentages and durations)

---

##  Success Criteria

- Engineers show correct available capacity
- Assignments update in real-time UI
- Managers can filter by skill/project/status
- Clean UI usable by non-tech managers



> Built using React, Node.js, and AI-assisted engineering
