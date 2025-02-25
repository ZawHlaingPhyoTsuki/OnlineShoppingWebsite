import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Popular",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "pages",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Shop With Sidebar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Shop Without Sidebar",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 70,
        title: "Contact",
        newTab: false,
        path: "/contact",
      },
      {
        id: 62,
        title: "Error",
        newTab: false,
        path: "/error",
      }
    ],
  },
];
