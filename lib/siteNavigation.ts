export type NavigationLink = {
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
  { label: "ホーム", href: siteRoutes.title },
  { label: "劇団紹介", href: `${siteRoutes.title}#about` },
  { label: "部署紹介", href: siteRoutes.departments },
  { label: "公演ができるまで", href: siteRoutes.flow },
  { label: "新歓イベント", href: siteRoutes.events },
  { label: "過去公演", href: siteRoutes.past },
  { label: "Q&A", href: siteRoutes.qa },
];

export const titleNavigationLinks: readonly NavigationLink[] = [
  { label: "ホーム", href: siteRoutes.title },
  { label: "劇団紹介", href: "#about" },
  { label: "部署紹介", href: siteRoutes.departments },
  { label: "公演ができるまで", href: siteRoutes.flow },
  { label: "新歓イベント", href: siteRoutes.events },
  { label: "過去公演", href: siteRoutes.past },
  { label: "Q&A", href: siteRoutes.qa },
];

export const headerHiddenPaths = new Set<string>([siteRoutes.home, siteRoutes.title]);
export const footerHiddenPaths = new Set<string>([siteRoutes.home]);
