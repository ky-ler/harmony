import { env } from "~/lib/env";
import { Outlet } from "react-router-dom";
import { Auth0ProviderWithRedirectCallback } from "~/components/providers/AuthProvider";

export const AuthLayout = () => {
  return (
    <Auth0ProviderWithRedirectCallback
      domain={env.AUTH0_DOMAIN}
      clientId={env.AUTH0_CLIENT}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://harmony/api`,
        scope:
          "openid profile email read:current_user update:current_user_metadata",
      }}
    >
      <Outlet />
    </Auth0ProviderWithRedirectCallback>
  );
};
