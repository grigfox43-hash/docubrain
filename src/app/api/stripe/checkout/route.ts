import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";
import { PlanType } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, tenant_id = "tenant-demo-acme", return_url } = body;

    if (!plan || !["team", "scale", "on_premises"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    if (plan === "on_premises") {
      return NextResponse.json({
        redirect: "/contact-sales?topic=on_premises",
      });
    }

    // Update tenant plan
    db.updateTenantPlan(tenant_id, plan as PlanType);

    return NextResponse.json({
      success: true,
      plan,
      message: `Тариф успешно изменён на ${plan.toUpperCase()}!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
