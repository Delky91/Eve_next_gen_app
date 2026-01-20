"use client";

import { navLinks } from "@/lib/links";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {navLinks.map((link) => {
          return link.inNewTab ? (
            <NavigationMenuItem className="mr-3" key={link.name}>
              <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {link.NavMenuParent?.menuChildren.map((linkChild) => (
                    <ListItem title={linkChild.name} href={linkChild.href} key={linkChild.name}>
                      {linkChild.desc}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <Link href={link.href!} key={link.name} className="mr-3">
              {link.name}
            </Link>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} target="_blank">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
