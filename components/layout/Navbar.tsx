"use client";

import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import Container from "./Container";
import { NAV_LINKS } from "@/constants/navigation";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("geoscope-theme-change", callback);
  return () => window.removeEventListener("geoscope-theme-change", callback);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

const Navbar = () => {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("geoscope-theme", nextIsDark ? "dark" : "light");
    window.dispatchEvent(new Event("geoscope-theme-change"));
  }

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

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-gray-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;