import { MemberRole, ServerInfo } from "~/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";
import { useModal } from "~/hooks/useModalStore";
import { api } from "~/lib/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type ServerHeaderProps = {
  server: ServerInfo;
  role?: MemberRole;
};

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAdmin = role === MemberRole.Admin;
  const isModerator = isAdmin || role == MemberRole.Moderator;

  console.log(server?.members);

  const handleLeave = async () => {
    const response = await api.delete(`servers/${server.id}/leave`);
    if (response.status === 204) {
      navigate("/");
      queryClient.removeQueries({ queryKey: ["server", server.id] });
      queryClient.removeQueries({ queryKey: ["invite"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["servers"],
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="text-md flex h-12 w-full items-center border-b-2 border-gray-200 px-3 font-semibold transition dark:border-secondary">
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-0.5 border-0 text-xs font-medium">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => onOpen("invite", { server })}
          >
            Invite People <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              className="cursor-pointer px-3 py-2 text-sm"
              onClick={() => onOpen("editServer", { server })}
            >
              Server Settings <Settings className="ml-auto h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer px-3 py-2 text-sm"
              onClick={() => onOpen("members", { server })}
            >
              Manage Members <User className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </>
        )}

        {isModerator && (
          <>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
              Create Channel <PlusCircle className="ml-auto h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-destructive">
            Delete Server <Trash className="ml-auto h-4 w-4 text-destructive" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={handleLeave}
          >
            Leave Server <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
