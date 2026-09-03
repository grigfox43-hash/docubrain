import { NextRequest, NextResponse } from "next/server";
import { processRAGQuery } from "@/lib/ai/rag-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, tenant_id = "tenant-demo-acme", channel_type = "web_playground", api_key } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required and must be a string." },
        { status: 400 }
      );
    }

    const result = await processRAGQuery({
      tenantId: tenant_id,
      question: question.trim(),
      channelType: channel_type,
      apiKey: api_key,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process query" },
      { status: 500 }
    );
  }
}
