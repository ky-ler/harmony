import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: window.location.pathname } });
  }

  return <Outlet />;
};
