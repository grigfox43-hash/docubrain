import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";
import { chunkText } from "@/lib/ai/chunker";
import { getGeminiEmbedding } from "@/lib/ai/gemini";
import { DocumentChunk } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenant_id") || "tenant-demo-acme";

  const docs = db.getDocuments(tenantId);
  const tenant = db.getTenant(tenantId);

  return NextResponse.json({
    success: true,
    documents: docs,
    total: docs.length,
    tenant_plan: tenant?.plan || "team",
    limit: tenant?.plan === "scale" ? 9999 : 50,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tenant_id = "tenant-demo-acme",
      title,
      content,
      source_type = "pdf",
      source_url,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Document title and text content are required." },
        { status: 400 }
      );
    }

    // 1. Check plan limit (Spec Section 3.1)
    const tenant = db.getTenant(tenant_id);
    const existingDocs = db.getDocuments(tenant_id);
    const maxAllowed = tenant?.plan === "scale" || tenant?.plan === "on_premises" ? 9999 : 50;

    if (existingDocs.length >= maxAllowed) {
      return NextResponse.json(
        {
          error: `Достигнут лимит тарифа (${maxAllowed} документов). Пожалуйста, обновите тариф до Scale.`,
          upgradeRequired: true,
        },
        { status: 403 }
      );
    }

    // 2. Chunk document (~500-800 tokens, 100 overlap)
    const rawChunks = chunkText(content, 220, 35);
    const chunks: DocumentChunk[] = [];

    for (const c of rawChunks) {
      let embedding: number[] | undefined = undefined;
      try {
        embedding = await getGeminiEmbedding(c.text);
      } catch {
        // embedding can be computed lazily
      }

      chunks.push({
        id: `chunk-${Date.now()}-${c.index}`,
        document_id: "", // will be bound by addDocument
        tenant_id,
        chunk_index: c.index,
        chunk_text: c.text,
        embedding,
        source_url,
      });
    }

    // 3. Save to database
    const newDoc = db.addDocument(tenant_id, {
      tenant_id,
      title,
      source_type,
      source_url,
      status: "indexed",
      chunk_count: chunks.length,
      chunks,
    });

    return NextResponse.json({
      success: true,
      document: newDoc,
      message: `Документ успешно загружен и разбит на ${chunks.length} фрагментов.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create document" },
      { status: 500 }
    );
  }
}
