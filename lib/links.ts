type navLink = {
  name: string;
  href: string;
};

type navLinks = navLink[];

export const navLinks: navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Search",
    href: "/search",
  },
];
