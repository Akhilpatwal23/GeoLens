"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Container from "./Container";
import { NAV_LINKS } from "@/constants/navigation";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-blue-700">Geo</span>
            <span className="text-red-600">Scope</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-700"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Search Button */}
          <button
            className="rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;