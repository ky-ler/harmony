import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "~/lib/api";
import { ServerInfo } from "~/types";
import { ServerHeader } from "./ServerHeader";
import { useEffect } from "react";

export const ServerSidebar = () => {
  const { user } = useAuth0();
  const { serverId } = useParams();

  const navigate = useNavigate();

  const { isLoading, data: server } = useQuery({
    queryKey: ["servers", serverId],
    queryFn: async () => {
      return (await api.get(`servers/${serverId}`)).data as ServerInfo;
    },
  });

  useEffect(() => {
    if (!server && !isLoading) {
      navigate("/");
    }
  }, [isLoading, navigate, server]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const textChannels = server!.channels.filter(
    (channel) => channel.channelType === 0,
  );

  const voiceChannels = server!.channels.filter(
    (channel) => channel.channelType === 1,
  );

  const members = server!.members.filter(
    (member) => member.userId !== user?.sub,
  );

  const role = server!.members.find((member) => member.userId === user?.sub)
    ?.memberRole;

  const joinServer = async () => {
    await api.patch(`servers/join/1df66f00-caf7-4779-bfca-219f82111bb0`);
  };

  return (
    <div className="flex h-full w-full flex-col bg-gray-100 dark:bg-card/80">
      <ServerHeader server={server!} role={role} />
      <button onClick={joinServer}>Swag</button>
    </div>
  );
};
