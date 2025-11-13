import { useAuth0 } from "@auth0/auth0-react";
import { ActionTooltip } from "./ActionTooltip";
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <ActionTooltip side="right" align="center" label={"Log In"}>
      <button
        onClick={() => loginWithRedirect()}
        className="navItemParent group"
      >
        <div className="navItem group">
          <LogIn size={24} />
        </div>
      </button>
    </ActionTooltip>
  );
};
