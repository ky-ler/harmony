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
