import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "~/hooks/useModalStore";
import { api } from "~/lib/api";
import { GetServerFromInvite } from "~/types";

const Invite = () => {
  const { inviteCode } = useParams();
  const { onOpen } = useModal();

  const { isLoading, data: server } = useQuery({
    queryKey: ["serverFromInvite", inviteCode],
    queryFn: async () => {
      return (await api.get(`servers/invite/${inviteCode}`))
        .data as GetServerFromInvite;
    },
  });

  useEffect(() => {
    if (!isLoading)
      onOpen("acceptInvite", {
        serverFromInvite: server,
      });
  }, [isLoading, onOpen, server]);

  if (isLoading) return <div>Loading...</div>;

  return <div></div>;
};
export default Invite;
