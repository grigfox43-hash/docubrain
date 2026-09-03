import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";
import { getGeminiEmbedding } from "@/lib/ai/gemini";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenant_id") || "tenant-demo-acme";
    const docId = params.id;

    const doc = db.getDocument(tenantId, docId);
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const chunks = db.getTenantChunks(tenantId).filter((c) => c.document_id === docId);

    for (const chunk of chunks) {
      try {
        const emb = await getGeminiEmbedding(chunk.chunk_text);
        db.setChunkEmbedding(tenantId, chunk.id, emb);
      } catch {
        // continue
      }
    }

    return NextResponse.json({
      success: true,
      message: `Переиндексировано ${chunks.length} фрагментов для документа "${doc.title}".`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
