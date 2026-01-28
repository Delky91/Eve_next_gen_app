import React from "react";
import { navLinks } from "@/lib/links";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../modeToggle";
import Navigation from "./Navigation";

function Navbar() {
  return (
    <nav className="fixed top-0 flex h-12 w-full items-center justify-between border-b bg-black">
      <Link
        href={navLinks[0].href!}
        className="flex items-center gap-2 ps-2 align-middle font-medium tracking-tight text-white transition-opacity hover:opacity-80"
      >
        <Image src="/globe.svg" alt="logo" width={30} height={30} />
        <p>Placeholder</p>
      </Link>

      <div className="flex pe-2">
        <div className="flex items-center gap-6 text-sm font-medium text-white/60">
          <Navigation />
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
