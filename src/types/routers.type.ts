export interface RouteItem {
  title: string;
  url?: string; // optional top-level link
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // optional icon
  items?: {
    title: string;
    url?: string; // optional sub-link
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // optional icon for sub-items
  }[];
}
