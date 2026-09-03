"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NeuralBackground } from "@/components/NeuralBackground";
import { HeroChatSimulation } from "@/components/HeroChatSimulation";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Server,
  FileCheck,
  Zap,
  Check,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  ChevronDown,
  Layers,
  Database,
  Cpu,
} from "lucide-react";

// Feature flag: Hide pricing temporarily as requested by the user, preserving code for later
const SHOW_PRICING = false;

export default function HomePage() {
  const { t, language } = useTranslation();
  const { isAuthenticated, openAuthModal } = useAuth();
  const router = useRouter();

  const handleProtectedAction = (targetUrl: string = "/app/knowledge-base") => {
    if (isAuthenticated) {
      router.push(targetUrl);
    } else {
      openAuthModal("register");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          const navHeight = 84;
          const targetTop = elem.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth",
          });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <NeuralBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.12]">
              {t.hero.titlePart1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleProtectedAction("/app/knowledge-base")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-base shadow-lg shadow-indigo-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.hero.ctaDemo}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium text-base transition-colors"
              >
                <span>{t.nav.howItWorks}</span>
              </a>
            </div>
          </div>

          {/* Interactive Chat Simulation */}
          <HeroChatSimulation />
        </div>
      </section>

      {/* 2. HOW IT WORKS (Anchor id="how-it-works") */}
      <section
        id="how-it-works"
        className="py-20 bg-white dark:bg-[#12151E] border-y border-gray-200/80 dark:border-gray-800/80 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t.howItWorks.tag}
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              {t.howItWorks.title}
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                1
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                {t.howItWorks.step1Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step1Desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
                <span>PDF • DOCX • Notion OAuth</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                2
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                {t.howItWorks.step2Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step2Desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Qdrant / Cosine Similarity</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                3
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                {t.howItWorks.step3Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t.howItWorks.step3Desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Slack Events API • Telegram Bot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECURITY ACCENT SECTION (Anchor id="security") */}
      <section
        id="security"
        className="py-24 relative overflow-hidden bg-gray-900 text-white scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 text-xs font-semibold mb-6">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                {t.security.tag}
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {t.security.title}
              </h2>
              <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                {t.security.subtitle}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {t.security.pillar1Title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t.security.pillar1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {t.security.pillar2Title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t.security.pillar2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {t.security.pillar3Title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t.security.pillar3Desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/security"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
                >
                  <span>{t.security.btnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Security Box */}
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-700 text-xs text-gray-400">
                <span className="font-mono text-emerald-400">SECURITY INVARIANT AUDIT</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" /> PASSED 100%
                </span>
              </div>
              <pre className="font-mono text-xs text-gray-300 bg-gray-950/70 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`// Security Check: Qdrant Search Invariant
const searchResult = await qdrant.search({
  collection: "corporate_docs",
  filter: {
    must: [
      { key: "tenant_id", match: { value: current_tenant } } // MUST EXIST
    ]
  },
  vector: questionEmbedding,
  limit: 5,
  score_threshold: 0.75
});

// Result: 0 data leaks across tenants detected`}
              </pre>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-700/50">
                  <div className="text-xs text-gray-400">GDPR Compliance</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {language === "en" ? "Right to Erasure" : "Право на удаление"}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-700/50">
                  <div className="text-xs text-gray-400">AI Architecture</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {language === "en" ? "Zero training on PII" : "Без обучения на PII"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TARGET PERSONAS */}
      <section className="py-20 bg-gray-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t.personas.tag}
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              {t.personas.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Persona 1: HR */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {t.personas.hrTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.personas.hrDesc}
              </p>
            </div>

            {/* Persona 2: IT Companies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {t.personas.itTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.personas.itDesc}
              </p>
            </div>

            {/* Persona 3: Sales */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {t.personas.salesTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.personas.salesDesc}
              </p>
            </div>

            {/* Persona 4: Agencies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {t.personas.agencyTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.personas.agencyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GAP ANALYTICS PREVIEW */}
      <section className="py-20 bg-white dark:bg-[#12151E] border-t border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                {t.gaps.tag}
              </span>
              <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
                {t.gaps.title}
              </h2>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.gaps.subtitle}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {t.gaps.point1}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {t.gaps.point2}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {t.gaps.point3}
                </li>
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => handleProtectedAction("/app/analytics")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:underline"
                >
                  {t.gaps.btnDemo}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table Mockup */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#161922] shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 mb-4">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {language === "en" ? "Unanswered Questions (HR Alert)" : "Неотвеченные вопросы (сигнал для HR)"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs font-medium">
                  {language === "en" ? "3 open gaps" : "3 открытых"}
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      {language === "en"
                        ? "How to reserve underground parking lot?"
                        : "Как получить парковочное место в БЦ?"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "en" ? "Asked 14 times" : "Спрашивали 14 раз"}
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded bg-red-50 dark:bg-red-950/50 text-red-600 text-[11px] font-medium">
                    {language === "en" ? "No SOP found" : "Нет регламента"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      {language === "en"
                        ? "Does company cover Spanish language courses?"
                        : "Оплачивает ли компания курсы испанского?"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "en" ? "Asked 9 times" : "Спрашивали 9 раз"}
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 text-[11px] font-medium">
                    {language === "en" ? "Needs review" : "Требует уточнения"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      {language === "en"
                        ? "Daily per diem for Astana office trip"
                        : "Суточные при поездке в офис в Астане"}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {language === "en" ? "Asked 6 times" : "Спрашивали 6 раз"}
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 text-[11px] font-medium">
                    {language === "en" ? "Resolved (PDF added)" : "Решено (добавлен PDF)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION (Anchor id="faq") */}
      <section
        id="faq"
        className="py-20 bg-white dark:bg-[#12151E] border-t border-gray-200/80 dark:border-gray-800/80 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t.faq.tag}
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl text-gray-900 dark:text-white">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>{t.faq.q1}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.faq.a1}
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>{t.faq.q2}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.faq.a2}
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>{t.faq.q3}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.faq.a3}
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>{t.faq.q4}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.faq.a4}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight">
            {t.ctaBanner.title}
          </h2>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            {t.ctaBanner.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleProtectedAction("/app/knowledge-base")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-900 font-bold text-base shadow-lg hover:bg-indigo-50 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-indigo-700" />
              <span>{t.ctaBanner.btnLaunch}</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
