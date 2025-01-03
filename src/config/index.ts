import { IconComponents, IconDashboard } from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";

export const navLinks: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  {
    label: "Admin",
    icon: IconComponents,
    initiallyOpened: true,
    links: [
      {
        label: "Customers",
        link: "/dashboard/customers",
      },
      {
        label: "Locations",
        link: "/dashboard/locations",
      },
    ],
  },
];
