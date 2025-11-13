import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { ServerInfo } from "~/types";
import { NavAction } from "~/components/nav/NavAction";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { NavItem } from "./NavItem";
import { ThemeToggle } from "~/components/nav/ThemeToggle";
import { LoginButton } from "~/components/LoginButton";
import { UserActions } from "~/components/nav/UserActions";

export const NavSidebar = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: servers } = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      const response = await api.get("servers");
      return response.data as ServerInfo[];
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-gray-200 py-3 dark:bg-card">
      {isAuthenticated && (
        <>
          <NavAction />{" "}
          <Separator className="mx-auto h-0.5 w-8 rounded-md bg-gray-300 dark:bg-secondary" />
        </>
      )}

      <ScrollArea className="w-full flex-1">
        {servers?.map((server) => (
          <div key={server.id} className="mb-4">
            <NavItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ThemeToggle />

        {!isAuthenticated ? <LoginButton /> : <UserActions user={user} />}
      </div>
    </div>
  );
};
