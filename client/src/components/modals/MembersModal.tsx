import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "~/components/ui/dropdown-menu";

import { useModal } from "~/hooks/useModalStore";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UserAvatar } from "~/components/UserAvatar";
import { Check, Crown, Loader2, MoreVertical, Shield } from "lucide-react";
import { MemberRole } from "~/types";
import { useState } from "react";
import { api } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const roleIcons = {
  Admin: <Crown className="h-4 w-4 fill-yellow-500 text-yellow-500" />,
  Moderator: <Shield className="h-4 w-4 fill-emerald-500 text-emerald-500" />,
  Member: null,
};

export const MembersModal = () => {
  const [loadingId, setLoadingId] = useState("");
  const { onOpen, isOpen, onClose, modalType, modalData } = useModal();
  const isModalOpen = isOpen && modalType === "members";
  const queryClient = useQueryClient();
  const { server } = modalData;

  const handleRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      await api.patch(`servers/${server?.id}/members/${memberId}`, {
        MemberRole: role,
      });

      await queryClient.invalidateQueries({
        queryKey: ["servers", server?.id],
      });

      onOpen("members", {
        server: await queryClient.getQueryData(["servers", server?.id]),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  const handleKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      await api.delete(`servers/${server?.id}/members/${memberId}`);

      await queryClient.invalidateQueries({
        queryKey: ["servers", server?.id],
      });

      onOpen("members", {
        server: await queryClient.getQueryData(["servers", server?.id]),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-card">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-primary-foreground/75">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-96 flex-1 pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-1 text-xs font-semibold">
                  {member.username}{" "}
                  {MemberRole[member.memberRole] == "Moderator" &&
                    roleIcons.Moderator}
                  {MemberRole[member.memberRole] == "Admin" && roleIcons.Admin}
                </div>
              </div>
              {server?.userId != member.userId && loadingId != member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4" />
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {MemberRole[member.memberRole] == "Member" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRoleChange(
                                      member.id,
                                      MemberRole.Moderator,
                                    )
                                  }
                                >
                                  Moderator
                                </DropdownMenuItem>
                              )}
                              {MemberRole[member.memberRole] == "Moderator" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRoleChange(
                                      member.id,
                                      MemberRole.Member,
                                    )
                                  }
                                >
                                  Moderator
                                  {MemberRole[member.memberRole] ==
                                    "Moderator" && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleKick(member.id)}>
                          <span className="text-red-500">Kick</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              )}
              {loadingId == member.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
