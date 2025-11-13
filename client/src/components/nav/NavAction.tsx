import { Plus } from "lucide-react";

import { ActionTooltip } from "~/components/ActionTooltip";
import { useModal } from "~/hooks/useModalStore";

export const NavAction = () => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button
        className="group flex items-center"
        onClick={() => onOpen("createServer")}
      >
        <div className="navItem">
          <Plus
            className="transition group-hover:text-primary-foreground"
            size={24}
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
