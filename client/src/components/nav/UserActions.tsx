import { LogOut, UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { ActionTooltip } from "~/components/ActionTooltip";
import { User, useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useModal } from "~/hooks/useModalStore";
import { Link } from "react-router-dom";

export const UserActions = ({ user }: User) => {
  const { logout } = useAuth0();
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <ActionTooltip side="right" align="center" label={"Profile"}>
        <DropdownMenuTrigger
          asChild
          className="group relative flex w-full items-center"
        >
          <div className="w-full">
            <Avatar className="mx-3 flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 p-0 transition-all hover:rounded-2xl hover:bg-primary/10">
              <AvatarImage
                src={user.picture}
                alt={user.name}
                className="group pointer-events-none h-full w-full object-cover group-hover:rounded-2xl"
              />
            </Avatar>
          </div>
        </DropdownMenuTrigger>
      </ActionTooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onOpen("editUserProfile", { user })}>
          <Link to="/profile/edit">
            Edit Profile <UserIcon size={16} className="ml-auto inline-block" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out <LogOut size={16} className="ml-auto inline-block" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
