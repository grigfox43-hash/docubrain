"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { BrainCircuit, X, Mail, Lock, User, Building, ArrowRight, CheckCircle2 } from "lucide-react";

export function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, authModalTab, login } = useAuth();
  const { t, language } = useTranslation();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setActiveTab(authModalTab);
    setError("");
  }, [authModalTab, isAuthModalOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "register" && !consentChecked) {
      setError(
        language === "en"
          ? "Please agree to the Privacy Policy and Terms of Service to register."
          : "Пожалуйста, подтвердите согласие с Политикой конфиденциальности и Условиями использования (152-ФЗ, GDPR)."
      );
      return;
    }

    setLoading(true);
    setError("");

    const endpoint = activeTab === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      activeTab === "login"
        ? { email, password }
        : { name, company_name: company, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ошибка авторизации");
      }

      login(data.user);
      router.push("/app/knowledge-base");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-md">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
              DocuBrain
            </span>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Закрыть (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === "login"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.authModal.loginTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === "register"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.authModal.registerTab}
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="font-heading font-extrabold text-xl text-gray-900 dark:text-white">
            {activeTab === "login" ? t.authModal.loginTitle : t.authModal.registerTitle}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {language === "ru"
              ? "Изолированный контур компании с базой знаний и ботами"
              : "Isolated tenant perimeter with knowledge base and bot integrations"}
          </p>
        </div>

        {/* Error notice */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {activeTab === "register" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  {t.authModal.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.authModal.namePlaceholder}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  {t.authModal.companyLabel}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t.authModal.companyPlaceholder}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              {t.authModal.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.authModal.emailPlaceholder}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              {t.authModal.passLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {activeTab === "register" && (
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="authConsent"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer"
              />
              <label
                htmlFor="authConsent"
                className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight cursor-pointer select-none"
              >
                {t.legal.consentCheckboxPrefix}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:text-indigo-700"
                >
                  {t.legal.consentCheckboxPrivacy}
                </Link>
                {t.legal.consentCheckboxAnd}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:text-indigo-700"
                >
                  {t.legal.consentCheckboxTerms}
                </Link>
                {t.legal.consentCheckboxLaw}
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {activeTab === "login"
                    ? t.authModal.btnSubmitLogin
                    : t.authModal.btnSubmitRegister}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500">
          {activeTab === "login" ? (
            <button
              onClick={() => setActiveTab("register")}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              {t.authModal.needAccount}
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              {t.authModal.alreadyHaveAccount}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
