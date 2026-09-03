"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import HomePage from "../page";

export default function SignupPage() {
  const { openAuthModal } = useAuth();

  useEffect(() => {
    openAuthModal("register");
  }, [openAuthModal]);

  return <HomePage />;
}
