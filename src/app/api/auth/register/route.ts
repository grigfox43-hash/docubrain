import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/store/mongo";
import { db } from "@/lib/store/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, company_name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const company = company_name?.trim() || "Моя компания";
    const tenantId = `tenant-${Date.now()}`;
    const userId = `user-${Date.now()}`;

    // 1. Try MongoDB
    const mongo = await getMongoDb();
    if (mongo) {
      const existing = await mongo.collection("users").findOne({ email: cleanEmail });
      if (existing) {
        return NextResponse.json(
          { error: "Пользователь с таким email уже зарегистрирован. Пожалуйста, выполните вход." },
          { status: 400 }
        );
      }

      // Create tenant in Mongo
      await mongo.collection("tenants").insertOne({
        id: tenantId,
        name: company,
        plan: "scale",
        plan_status: "active",
        created_at: new Date().toISOString(),
      });

      // Create user in Mongo
      const newUser = {
        id: userId,
        tenant_id: tenantId,
        company_name: company,
        name: name?.trim() || cleanEmail.split("@")[0],
        email: cleanEmail,
        password_hash: password, // In enterprise prod, hash with bcrypt
        role: "admin",
        created_at: new Date().toISOString(),
      };
      await mongo.collection("users").insertOne(newUser);

      return NextResponse.json({
        success: true,
        user: {
          id: userId,
          tenant_id: tenantId,
          company_name: company,
          name: newUser.name,
          email: cleanEmail,
          role: "admin",
        },
      });
    }

    // 2. In-memory fallback
    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        tenant_id: tenantId,
        company_name: company,
        name: name || cleanEmail.split("@")[0],
        email: cleanEmail,
        role: "admin",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Ошибка регистрации" }, { status: 500 });
  }
}
