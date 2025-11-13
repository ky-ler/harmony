import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "~/index.css";
import ErrorPage from "~/error-page.tsx";
import { ThemeProvider } from "~/components/providers/ThemeProvider";
import { MainLayout } from "~/routes/layouts/MainLayout";
import { ProtectedRoute } from "~/routes/layouts/ProtectedRoute";
import { AuthLayout } from "~/routes/layouts/AuthLayout";
import { ServerIdLayout } from "~/routes/servers/serverId/ServerIdLayout";
import Invite from "./routes/servers/serverId/Invite";
import { Login } from "./routes/user/Login";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "servers/:serverId",
                // loader: serverIdLoader,
                element: <ServerIdLayout />,
                id: "serverId",
              },
              {
                path: "invite/:inviteCode",
                element: <Invite />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
