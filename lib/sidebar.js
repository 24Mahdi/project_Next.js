export const sidebarRoutes = (user) => [
  {
    name: "الرئيسية",
    icon: "eva:home-fill",
    route: "/",
  },
  {
    name: "الملف الشخصي",
    icon: "bi:person-fill",
    route: `/profile/${user?.id}`,
  },
  {
    name: "الدردشة",
    icon: "eva:message-circle-fill",
    route: "/messages",
  },
];
