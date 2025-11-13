import { useAuth0 } from "@auth0/auth0-react";
import { LoaderIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin" />
    </div>
  );
};
