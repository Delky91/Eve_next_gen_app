import React from "react";
import { navLinks } from "@/lib/links";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";

type navLink = {
  name: string;
  href: string;
};

type navLinks = navLink[];

function Navbar() {
  return (
    <nav className="flex h-12 w-screen bg-black">
      <Link href={navLinks[0].href} className="ml-3 flex items-center align-middle">
        <Image src="/globe.svg" alt="logo" width={30} height={30} />
        <p className="ml-3 text-white">Placeholder</p>
      </Link>
      <div>
        {navLinks.map((link) => {
          return (
            <Link href={link.href} key={link.name}>
              {link.name}
            </Link>
          );
        })}
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
