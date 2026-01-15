type navLink = {
  name: string;
  inNewTab: boolean;
  href?: string;
  haveNavMenu?: boolean;
  NavMenuParent?: navMenuParent;
};

type navMenuParent = {
  sectionName: string;
  menuChildren: menuChild[];
};

type menuChild = {
  name: string;
  href: string;
  desc: string;
};

type navLinks = navLink[];

export const navLinks: navLinks = [
  {
    name: "Home",
    href: "/",
    inNewTab: false,
  },
  {
    name: "Search",
    href: "/search",
    inNewTab: false,
  },
  {
    name: "Others",
    inNewTab: true,
    haveNavMenu: true,
    NavMenuParent: {
      sectionName: "Outside Links",
      menuChildren: [
        {
          name: "alysii-pi",
          href: "https://alysii.com/eve/pi/",
          desc: "Placeholder",
        },
        {
          name: "Market-Browser",
          href: "https://evemarketbrowser.com/region/",
          desc: "Placeholder",
        },
      ],
    },
  },
];
