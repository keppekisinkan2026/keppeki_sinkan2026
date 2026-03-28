export type NavigationLink = {
  id: string;
  label: string;
  href: string;
};

export const siteRoutes = {
  home: "/",
  title: "/title",
  departments: "/maintenance/departments",
  flow: "/maintenance/flow",
  events: "/maintenance/events",
  past: "/maintenance/past",
  qa: "/maintenance/qa",
} as const;

export const headerLinks: readonly NavigationLink[] = [
  { id: "home", label: "ホーム", href: siteRoutes.title },
  { id: "about", label: "劇団紹介", href: `${siteRoutes.title}#about` },
  { id: "departments", label: "部署紹介", href: siteRoutes.departments },
  { id: "flow", label: "公演ができるまで", href: siteRoutes.flow },
  { id: "events", label: "新歓イベント", href: siteRoutes.events },
  { id: "past", label: "過去公演", href: siteRoutes.past },
  { id: "qa", label: "Q&A", href: siteRoutes.qa },
];

export const titleNavigationLinks: readonly NavigationLink[] = [
  { id: "home", label: "ホーム", href: siteRoutes.title },
  { id: "about", label: "劇団紹介", href: "#about" },
  { id: "departments", label: "部署紹介", href: siteRoutes.departments },
  { id: "flow", label: "公演ができるまで", href: siteRoutes.flow },
  { id: "events", label: "新歓イベント", href: siteRoutes.events },
  { id: "past", label: "過去公演", href: siteRoutes.past },
  { id: "qa", label: "Q&A", href: siteRoutes.qa },
];

export const headerHiddenPaths = new Set<string>([siteRoutes.home, siteRoutes.title]);
export const footerHiddenPaths = new Set<string>([siteRoutes.home]);
