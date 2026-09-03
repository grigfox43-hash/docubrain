import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, teamSize, message, type = "demo" } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Пожалуйста, укажите имя и корпоративный email." },
        { status: 400 }
      );
    }

    // In production, send to CRM or Slack webhook or Postgres
    console.log("[Sales Lead Received]:", {
      name,
      email,
      company,
      teamSize,
      message,
      type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        type === "on_premises"
          ? "Спасибо! Мы получили ваш запрос на On-Premises деплой. Архитектор свяжется с вами в течение 2 часов для обсуждения инфраструктуры."
          : "Спасибо за заявку! Наш специалист свяжется с вами для демонстрации RAG-ассистента DocuBrain.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
