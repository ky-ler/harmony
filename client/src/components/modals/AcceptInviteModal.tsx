import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModal } from "~/hooks/useModalStore";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { api } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const AcceptInviteModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, modalType, modalData } = useModal();
  const isModalOpen = isOpen && modalType === "acceptInvite";
  const { serverFromInvite } = modalData;
  const queryClient = useQueryClient();
  const { inviteCode } = useParams();
  const navigate = useNavigate();

  const acceptInvite = async (isMember: boolean | undefined = false) => {
    setIsLoading(true);

    if (!isMember) {
      try {
        await api.patch(`servers/invite/${inviteCode}/accept`);
        await queryClient.invalidateQueries({
          queryKey: ["servers"],
        });
      } catch (error) {
        console.error(error);
      }
    }

    onClose();
    queryClient.removeQueries({
      queryKey: ["serverFromInvite"],
      exact: false,
    });
    navigate(`/servers/${serverFromInvite?.id}`);

    setIsLoading(false);
  };

  const handleClose = () => {
    navigate("/");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-card p-0">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-normal">
            {serverFromInvite?.userIsMember
              ? "You are already a member of"
              : "You are invited to join"}
            <div className="font-bold">{serverFromInvite?.name}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="text-md flex flex-col items-center justify-center gap-2 text-center font-semibold text-primary-foreground/90">
          <img
            src={serverFromInvite?.imageUrl}
            alt="{serverFromInvite?.name} icon"
            className="h-24 w-24 rounded-full object-cover"
          />
          <p>
            {serverFromInvite?.memberCount}{" "}
            {serverFromInvite?.memberCount == 1 ? "member" : "members"}
          </p>
        </div>
        <div className="flex flex-col items-center p-6">
          <Button
            onClick={() => acceptInvite(serverFromInvite?.userIsMember)}
            disabled={isLoading}
          >
            {serverFromInvite?.userIsMember ? "View Server" : "Accept Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
