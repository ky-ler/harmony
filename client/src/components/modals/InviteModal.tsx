import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModal } from "~/hooks/useModalStore";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "~/hooks/useOrigin";
import { MouseEvent, useState } from "react";
import { api } from "~/lib/api";

export const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, isOpen, onClose, modalType, modalData } = useModal();
  const isModalOpen = isOpen && modalType === "invite";
  const { server } = modalData;
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const refreshInvite = async () => {
    try {
      setIsLoading(true);
      const response = await api.patch(`servers/${server!.id}/invite`);
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-card p-0">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite People
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-end p-6">
          <Label className="text-xs font-bold uppercase">
            Server Invite Link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              value={inviteUrl}
              readOnly
              onDoubleClick={(e: MouseEvent<HTMLInputElement>) => {
                e.currentTarget.select();
                navigator.clipboard.writeText(inviteUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
            />
            <Button
              disabled={isLoading}
              variant={"ghost"}
              size={"icon"}
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <Button
            onClick={refreshInvite}
            disabled={isLoading}
            variant={"link"}
            size={"sm"}
            className="mt-4 justify-end text-xs text-primary-foreground"
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
