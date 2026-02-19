export interface RouteItem {
  title: string;
  url?: string; // optional top-level link
  items?: {
    title: string;
    url?: string; // optional sub-link
  }[];
}
