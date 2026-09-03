"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import HomePage from "../page";

export default function LoginPage() {
  const { openAuthModal } = useAuth();

  useEffect(() => {
    openAuthModal("login");
  }, [openAuthModal]);

  return <HomePage />;
}
