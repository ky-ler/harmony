import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  domain: string;
  clientId: string;
  authorizationParams: {
    redirect_uri: string;
    audience: string;
    scope: string;
  };
  children: React.ReactNode; // this is the outlet
};

export const Auth0ProviderWithRedirectCallback = ({
  domain,
  clientId,
  authorizationParams,
  children,
}: AuthProviderProps) => {
  const navigate = useNavigate();
  // idk what type appState is
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={authorizationParams}
    >
      {children}
    </Auth0Provider>
  );
};
