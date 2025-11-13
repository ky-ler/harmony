import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { UseTheme } from "~/components/providers/ThemeProvider";
import { ActionTooltip } from "~/components/ActionTooltip";

export function ThemeToggle() {
  const { setTheme } = UseTheme();

  return (
    <DropdownMenu>
      <ActionTooltip side="right" align="center" label={"Change Theme"}>
        <div className="navItemParent group w-full">
          <DropdownMenuTrigger asChild>
            <button className="navItem group">
              <Sun
                size={24}
                className="group absolute rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
              />
              <Moon
                size={24}
                className="group absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
              />
              <span className="sr-only">Toggle theme</span>
            </button>
          </DropdownMenuTrigger>
        </div>
      </ActionTooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
