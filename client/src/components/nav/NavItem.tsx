import { NavLink, useParams } from "react-router-dom";
import { cn } from "~/lib/utils";
import { ActionTooltip } from "~/components/ActionTooltip";

type NavItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

export const NavItem = ({ id, imageUrl, name }: NavItemProps) => {
  const { serverId } = useParams();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <NavLink
        to={`servers/${id}`}
        className="group relative flex items-center"
      >
        {/* <button onClick={onClick} className="group relative flex items-center"> */}
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-primary-foreground transition-all",
            serverId !== id && "group-hover:h-5",
            serverId === id ? "h-9" : "h-2",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-12 w-12 overflow-hidden rounded-3xl transition-all group-hover:rounded-2xl",
            serverId === id && "rounded-2xl bg-primary/10 text-primary",
          )}
        >
          <img
            src={imageUrl}
            alt="Server Icon"
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      </NavLink>
      {/* </button> */}
    </ActionTooltip>
  );
};
