# Harmony

Harmony is a full-stack chat application. It is inspired by platforms like Discord and Slack.

This repository contains two main projects:

  * `./api/`: A .NET 8 Web API backend.
  * `./client/`: A React (Vite + TypeScript) frontend application.

## Technology Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| **Backend** | **.NET 8** | Core application framework. |
| | **ASP.NET Core Web API** | Building the RESTful API endpoints. |
| | **Entity Framework Core** | ORM for database communication. |
| | **PostgreSQL** | Relational database. |
| | **Auth0** | Authentication (JWT) and user management. |
| **Frontend** | **React** | Core UI library. |
| | **TypeScript** | Static typing. |
| | **Vite** | Build tool and dev server. |
| | **TanStack Query (React Query)** | Server-state management and data fetching. |
| | **Zustand** | Client-state management (e.g., for modals). |
| | **React Router** | Application routing. |
| | **Tailwind CSS** | Utility-first CSS framework. |
| | **Shadcn/UI** | Re-usable UI components. |

## Core Features

  * **Authentication**: Users are managed via Auth0. The API is secured and expects a JWT, and the client uses `auth0-react` to handle the login flow.
  * **Servers**: Users can create servers, which act as top-level communities.
  * **Channels**: Each server can have multiple channels for discussion.
  * **Members**: Users are "members" of servers, and their roles can be managed.
  * **Invites**: A system for inviting users to servers.
  * **Messaging**: The data model supports sending messages within channels.

## Getting Started

### Prerequisites

  * [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
  * [Node.js](https://nodejs.org/en) (v18 or higher)
  * A running **PostgreSQL** database
  * An **Auth0** account, configured with:
      * A "Web Application" (for the React client)
      * An "API" (for the .NET backend)

### 1\. Backend Setup (`/api`)

1.  **Configure Settings**:

      * Navigate to `api/Api/`.
      * Create an `appsettings.Development.json` file.
      * Add your PostgreSQL connection string and Auth0 API settings:
        ```json
        {
          "ConnectionStrings": {
            "DefaultConnection": "Host=localhost;Database=harmony;Username=postgres;Password=YOUR_DB_PASSWORD"
          },
          "Auth0": {
            "Domain": "YOUR_AUTH0_DOMAIN.us.auth0.com",
            "Audience": "YOUR_AUTH0_API_AUDIENCE"
          }
        }
        ```

2.  **Run the API**:

      * Open a terminal in `api/Api/`.
      * Run `dotnet restore` to install dependencies.
      * Run `dotnet ef database update` to apply the database migrations.
      * Run `dotnet run` to start the backend server (typically on `http://localhost:5000`).

### 2\. Frontend Setup (`/client`)

1.  **Configure Environment**:

      * Navigate to the `client/` directory.
      * Create a `.env` file from the example:
        ```sh
        cp .env.example .env
        ```
      * Edit `.env` with your Auth0 **Web Application** settings and the API URL:
        ```.env
        VITE_AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN.us.auth0.com"
        VITE_AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
        VITE_AUTH0_AUDIENCE="YOUR_AUTH0_API_AUDIENCE"
        VITE_API_URL="http://localhost:5000"
        ```

2.  **Run the Client**:

      * Open a **second terminal** in the `client/` directory.
      * Run `npm install` to install dependencies.
      * Run `npm run dev` to start the Vite development server (typically on `http://localhost:5173`).

### 3\. Running the Application

  * Ensure both the backend API and the frontend client are running in their respective terminals.
  * Open your browser and navigate to the client URL (e.g., `http://localhost:5173`).
  * You will be redirected to Auth0 to log in or sign up.
