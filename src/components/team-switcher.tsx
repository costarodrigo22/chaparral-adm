// import * as React from 'react';
// import { ChevronsUpDown } from 'lucide-react';

import {
  DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo-adm.svg';
import logoWhite from '@/assets/logo-adm-white.svg';

export function TeamSwitcher() {
  // const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <DropdownMenu>
      <div className="flex items-center rounded gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
        <img src={logo} className="w-20 dark:hidden" />
        <img src={logoWhite} className="w-20 hidden dark:block" />
        {/* <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" /> */}
      </div>
      {/* <DropdownMenuContent
        className="w-64"
        align="start"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Teams
        </DropdownMenuLabel>
        {teams.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team)}
            className="items-start gap-2 px-1.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <team.logo className="h-5 w-5 shrink-0" />
            </div>
            <div className="grid flex-1 leading-tight">
              <div className="line-clamp-1 font-medium">{team.name}</div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{team.plan}</div>
              </div>
            </div>
            <DropdownMenuShortcut className="self-center">
              ⌘{index + 1}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Plus className="h-5 w-5" />
          </div>
          <div className="font-medium text-muted-foreground">Add workspace</div>
        </DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
