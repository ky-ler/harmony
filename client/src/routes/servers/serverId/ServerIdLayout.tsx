import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ServerSidebar } from "~/components/server/ServerSidebar";
import { api } from "~/lib/api";
import { ServerInfo } from "~/types";

export const ServerIdLayout = () => {
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { serverId } = useParams();

  // const { isLoading, data: server } = useQuery(currentServerQuery(serverId!));

  const { isLoading, data: server } = useQuery({
    queryKey: ["servers", serverId],
    queryFn: async () => {
      return (await api.get(`servers/${serverId}`)).data as ServerInfo;
    },
  });

  useEffect(() => {
    const servers = queryClient.getQueryData<ServerInfo[]>(["servers"]);
    const isUserInServer = servers?.find((server) => server.id === serverId);
    if (!isLoading && !isUserInServer) navigate("/");
  }, [isLoading, navigate, queryClient, serverId]);

  if (isLoading) return <div>Loading...</div>;

  if (!server || !user) navigate("/");

  return (
    <div className="h-full bg-primary-foreground">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
