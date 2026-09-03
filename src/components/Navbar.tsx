"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BrainCircuit, ShieldCheck, Sparkles, Menu, X, ArrowRight, Sun, Moon, LogIn, LogOut, User } from "lucide-react";
import { useTranslation, LanguageSwitcher } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTheme } from "@/lib/theme/ThemeContext";

export function Navbar() {
  const { t } = useTranslation();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window === "undefined") return;

    const isHomePage = window.location.pathname === "/" || window.location.pathname === "";

    if (isHomePage) {
      e.preventDefault();
      const elem = document.getElementById(targetId);
      if (elem) {
        const navHeight = 84;
        const targetTop = elem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${targetId}`);
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0F1117]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-700/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
                DocuBrain
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                  RAG
                </span>
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                AI Knowledge Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with smooth anchor scrolling */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a
              href="/#how-it-works"
              onClick={(e) => handleSmoothAnchor(e, "how-it-works")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="/#security"
              onClick={(e) => handleSmoothAnchor(e, "security")}
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t.nav.security}
            </a>
            <a
              href="/#faq"
              onClick={(e) => handleSmoothAnchor(e, "faq")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action CTA & Controls */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Switcher with Flags */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Переключить тему"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/app/knowledge-base"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user?.name || t.nav.companyPanel}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                  title={t.nav.signOut}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 px-3 py-2 rounded-lg"
                >
                  {t.nav.signIn}
                </button>

                <button
                  onClick={() => openAuthModal("register")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-md shadow-indigo-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                  <span>{t.nav.launchDemo}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#161922] border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 space-y-3">
          <a
            href="/#how-it-works"
            onClick={(e) => handleSmoothAnchor(e, "how-it-works")}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="/#security"
            onClick={(e) => handleSmoothAnchor(e, "security")}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t.nav.security}
          </a>
          <a
            href="/#faq"
            onClick={(e) => handleSmoothAnchor(e, "faq")}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/app/knowledge-base"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium text-sm"
                >
                  {user?.name || t.nav.companyPanel}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 px-4 rounded-xl border border-gray-200 text-gray-600 text-xs"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="w-full text-center py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("register");
                  }}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-indigo-700 text-white font-medium text-sm shadow-md"
                >
                  {t.nav.signUp}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
