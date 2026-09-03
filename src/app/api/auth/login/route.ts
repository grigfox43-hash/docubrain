import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/store/mongo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Введите email и пароль." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check demo user
    if (cleanEmail === "alex.hr@acmetech.io") {
      return NextResponse.json({
        success: true,
        user: {
          id: "user-1",
          tenant_id: "tenant-demo-acme",
          company_name: "Acme Technologies",
          name: "Алексей Смирнов",
          email: "alex.hr@acmetech.io",
          role: "admin",
        },
      });
    }

    // 2. Check MongoDB
    const mongo = await getMongoDb();
    if (mongo) {
      const user = await mongo.collection("users").findOne({ email: cleanEmail });
      if (!user) {
        return NextResponse.json(
          { error: "Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь." },
          { status: 404 }
        );
      }

      if (user.password_hash && user.password_hash !== password) {
        return NextResponse.json(
          { error: "Неверный пароль. Попробуйте снова." },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          tenant_id: user.tenant_id,
          company_name: user.company_name || "Моя компания",
          name: user.name,
          email: user.email,
          role: user.role || "admin",
        },
      });
    }

    // Fallback login
    return NextResponse.json({
      success: true,
      user: {
        id: `user-${Date.now()}`,
        tenant_id: "tenant-demo-acme",
        company_name: "Acme Technologies",
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        role: "admin",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Ошибка входа" }, { status: 500 });
  }
}
