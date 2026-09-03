import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenant_id") || "tenant-demo-acme";

  const list = db.getUnansweredQuestions(tenantId);
  return NextResponse.json({
    success: true,
    questions: list,
    open_count: list.filter((q) => q.status === "open").length,
    resolved_count: list.filter((q) => q.status === "resolved").length,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenant_id = "tenant-demo-acme", question_id, status } = body;

    if (!question_id || !status) {
      return NextResponse.json(
        { error: "question_id and status are required." },
        { status: 400 }
      );
    }

    const updated = db.resolveQuestion(tenant_id, question_id, status);
    return NextResponse.json({ success: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
