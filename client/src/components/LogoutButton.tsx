import { useAuth0 } from "@auth0/auth0-react";
import { ActionTooltip } from "./ActionTooltip";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const { /*user,*/ logout } = useAuth0();

  return (
    <ActionTooltip side="right" align="center" label={"Log Out"}>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="group relative flex items-center"
      >
        {/* <img
          src={user?.picture}
          alt="User avatar"
          className="h-12 w-12 overflow-hidden rounded-3xl object-cover transition-all group-hover:rounded-2xl"
        /> */}
        <div className="group relative mx-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-primary/10 text-primary transition-all group-hover:rounded-2xl">
          <LogOut size={24} />
        </div>
      </button>
    </ActionTooltip>
  );
};
