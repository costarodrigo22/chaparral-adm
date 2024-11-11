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
// import { NavProjects } from '@/components/nav-projects';
// import { NavSecondary } from '@/components/nav-secondary';
// import { NavUser } from '@/components/nav-user';
// import { StorageCard } from '@/components/storage-card';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarItem,
  // SidebarLabel,
} from '@/components/ui/sidebar';
const data = {
  // teams: [
  //   {
  //     name: 'Acme Inc',
  //     logo: Atom,
  //     plan: 'Enterprise',
  //   },
  //   {
  //     name: 'Acme Corp.',
  //     logo: Eclipse,
  //     plan: 'Startup',
  //   },
  //   {
  //     name: 'Evil Corp.',
  //     logo: Rabbit,
  //     plan: 'Free',
  //   },
  // ],
  // user: {
  //   name: 'Rodrigo',
  //   email: 'rodrigo@example.com',
  //   avatar: '/avatars/shadcn.jpg',
  // },
  navMain: [
    {
      title: 'Seções',
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
          title: 'Sobre',
          url: '/sections/about',
          icon: Rabbit,
          description: 'Seção Sobre da página',
        },
        {
          title: 'Missão e valores',
          url: '/sections/mission_values',
          icon: Rabbit,
          description: 'Seção missão e valores da página',
        },
        // {
        //   title: 'Detalhes',
        //   url: '/sections/details',
        //   icon: Rabbit,
        //   description: 'Detalhes da página',
        // },
        // {
        //   title: 'Produtos',
        //   url: '/sections/products',
        //   icon: Rabbit,
        //   description: 'Seção de produtos da página',
        // },
        {
          title: 'Institucional',
          url: '/sections/institutional',
          icon: Rabbit,
          description: 'Parte institucional da página',
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
    {
      title: 'Configurações',
      url: '#',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/config/dashboard',
          icon: History,
          description: 'View your recent prompts',
        },
        {
          title: 'Usuários',
          url: '/config/users',
          icon: Star,
          description: 'Browse your starred prompts',
        },
      ],
    },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#',
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#',
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#',
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#',
    //     },
    //   ],
    // },
    // {
    //   title: 'API',
    //   url: '#',
    //   icon: Code2,
    //   items: [
    //     {
    //       title: 'Chat',
    //       url: '#',
    //     },
    //     {
    //       title: 'Completion',
    //       url: '#',
    //     },
    //     {
    //       title: 'Images',
    //       url: '#',
    //     },
    //     {
    //       title: 'Video',
    //       url: '#',
    //     },
    //     {
    //       title: 'Speech',
    //       url: '#',
    //     },
    //   ],
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    //   ],
    // },
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
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
  // searchResults: [
  //   {
  //     title: 'Routing Fundamentals',
  //     teaser:
  //       'The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.',
  //     url: '#',
  //   },
  //   {
  //     title: 'Layouts and Templates',
  //     teaser:
  //       'The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.',
  //     url: '#',
  //   },
  //   {
  //     title: 'Data Fetching, Caching, and Revalidating',
  //     teaser:
  //       'Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.',
  //     url: '#',
  //   },
  //   {
  //     title: 'Server and Client Composition Patterns',
  //     teaser:
  //       'When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ',
  //     url: '#',
  //   },
  //   {
  //     title: 'Server Actions and Mutations',
  //     teaser:
  //       'Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.',
  //     url: '#',
  //   },
  // ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          {/* <SidebarLabel>Platform</SidebarLabel> */}
          <NavMain items={data.navMain} />
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} /> */}
        </SidebarItem>
        {/* <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem> */}
        {/* <SidebarItem>
          <StorageCard />
        </SidebarItem> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
