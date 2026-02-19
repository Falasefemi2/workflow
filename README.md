# Company Internal Management System

This is a web application for internal company management, providing tools for
Human Resources, employees, and system administrators.

## Features

- **Employee Management:** Manage employee profiles, documents, and biodata.
- **HR Management:** Handle candidate offers, employee onboarding, HMO
  management, and leave approvals.
- **Administrative Tools:** System setup, user management, and approval
  workflows for memos and vouchers.
- **Employee Self-Service:** Employees can manage their documents, apply for
  leave, and access company policies.

## Technologies Used

- **Frontend:** React, TypeScript, Vite
- **UI:** Tailwind CSS, shadcn/ui, Radix UI
- **Routing:** React Router
- **Data Tables:** TanStack Table
- **Charts:** Recharts
- **Linting:** ESLint
- **Package Manager:** bun

## Getting Started

### Prerequisites

- Node.js
- Bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Falasefemi2/workflow
   ```
2. Navigate to the project directory:
   ```bash
   cd web
   ```
3. Install dependencies:
   ```bash
   bun install
   ```

### Available Scripts

- **`bun dev`**: Runs the app in development mode. Open
  [http://localhost:5173](http://localhost:5173) to view it in the browser.
- **`bun build`**: Builds the app for production to the `dist` folder.
- **`bun lint`**: Lints the codebase using ESLint.
- **`bun preview`**: Serves the production build locally.

## Project Structure

The project follows a standard Vite + React project structure.

- `src/`: Contains the main application source code.
  - `components/`: Shared UI components.
  - `hooks/`: Custom React hooks for data fetching and business logic.
  - `lib/`: Utility functions.
  - `pages/`: Application pages, organized by user role (admin, employee, hr).
  - `auth/`: Components and pages related to authentication.
- `public/`: Static assets.
