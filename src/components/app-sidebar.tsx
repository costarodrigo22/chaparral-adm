import {
  History,
  Layers,
  LifeBuoy,
  Rabbit,
  Send,
  Settings,
  Star,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from '@/components/ui/sidebar';
const data = {
  homeNav: [
    {
      title: 'Seções da home',
      url: '#',
      icon: Layers,
      items: [
        {
          title: 'Cabeçalho',
          url: '/sections/header',
          icon: Rabbit,
          description: 'Cabeçalho da página',
        },
        {
          title: 'Receitas',
          url: '/sections/recipes',
          icon: Rabbit,
          description: 'Seção de receitas da página',
        },
        {
          title: 'Seja parceiro',
          url: '/sections/be-a-partner',
          icon: Rabbit,
          description: 'Seção de parceiros da página',
        },
        {
          title: 'PDVs',
          url: '/sections/PDVs',
          icon: Rabbit,
          description: 'Seção de PDVs da página',
        },
      ],
    },
  ],
  aboutNav: [
    {
      title: 'Seções do Sobre',
      url: '#',
      icon: Layers,
      items: [
        {
          title: 'História',
          url: '/sections/about',
          icon: Rabbit,
          description: 'Seção Sobre da página',
        },
        {
          title: 'Sustentabilidade',
          url: '/sections/sustainability',
          icon: Rabbit,
          description: 'Seção de sustentabilidade da página',
        },
        {
          title: 'Missão e valores',
          url: '/sections/mission_values',
          icon: Rabbit,
          description: 'Seção missão e valores da página',
        },
        {
          title: 'Institucional',
          url: '/sections/institutional',
          icon: Rabbit,
          description: 'Parte institucional da página',
        },
      ],
    },
  ],
  navConfig: [
    {
      title: 'Configurações',
      url: '#',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'Perfil da empresa',
          url: '/config/BusinessProfile',
          icon: History,
          description: 'View your recent prompts',
        },
        {
          title: 'Usuários',
          url: '/config/users',
          icon: Star,
          description: 'Browse your starred prompts',
        },
        {
          title: 'Locais de retirada',
          url: '/config/PickupLocations',
          icon: Star,
          description: 'Browse your starred prompts',
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Home</SidebarLabel>
          <NavMain items={data.homeNav} />
        </SidebarItem>
        <SidebarItem>
          <SidebarLabel>Sobre</SidebarLabel>
          <NavMain items={data.aboutNav} />
        </SidebarItem>
        <SidebarItem>
          <SidebarLabel>Configurações</SidebarLabel>
          <NavMain items={data.navConfig} />
        </SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}
