import {
  IconUserCircle,
  IconCategoryPlus,
  IconUsersGroup,
  IconLayoutDashboard,
} from "@tabler/icons-react";

const adminRoutes = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard/admin",
        icon: IconLayoutDashboard, // আইকন যোগ করা হলো
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: IconUserCircle,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: IconCategoryPlus,
      },
      {
        title: "All Users",
        url: "/admin-dashboard/all-user",
        icon: IconUsersGroup,
      },
    ],
  },
];

export default adminRoutes;