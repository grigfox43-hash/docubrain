"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Shield, Mail, Trash2, CheckCircle2, Building2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "admin" | "viewer";
  date: string;
}

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "u1",
      name: "Алексей Смирнов",
      email: "alex.hr@acmetech.io",
      role: "admin",
      date: "3 авг 2026",
    },
    {
      id: "u2",
      name: "Дарья Ковалёва",
      email: "daria.ops@acmetech.io",
      role: "viewer",
      date: "20 авг 2026",
    },
  ]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "viewer">("viewer");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInviteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newM: Member = {
      id: `u-${Date.now()}`,
      name: inviteName || inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      date: "Сегодня",
    };

    setMembers([...members, newM]);
    setInviteModalOpen(false);
    setInviteEmail("");
    setInviteName("");
  };

  const handleRemove = (id: string) => {
    if (confirm("Отозвать доступ для этого пользователя?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
            Команда и доступы к панели
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Администраторы и HR-специалисты компании Acme Technologies с доступом к управлению базой знаний.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Пригласить сотрудника</span>
        </button>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Сотрудник</th>
              <th className="py-3.5 px-6">Роль</th>
              <th className="py-3.5 px-6">Дата добавления</th>
              <th className="py-3.5 px-6 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900 dark:text-white">{m.name}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" />
                    {m.email}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      m.role === "admin"
                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    {m.role === "admin" ? "Администратор" : "Наблюдатель"}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-gray-500">{m.date}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleRemove(m.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                    title="Отозвать доступ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div
          onClick={() => setInviteModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
          >
            <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
              Приглашение коллеги в панель DocuBrain
            </h3>
            <form onSubmit={handleInvite} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Имя коллеги:
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Мария Иванова"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Корпоративный email:
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="maria@acmetech.io"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Роль:
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                >
                  <option value="viewer">Наблюдатель (только чтение и просмотр аналитики)</option>
                  <option value="admin">Администратор (загрузка документов, удаление, боты)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-700 text-white text-xs font-semibold hover:bg-indigo-800"
                >
                  Отправить инвайт
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
