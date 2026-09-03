import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenant_id") || "tenant-demo-acme";
  const docId = params.id;

  const success = db.deleteDocument(tenantId, docId);
  if (!success) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Документ и связанные векторы удалены.",
  });
}
