import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store/db";
import { processRAGQuery } from "@/lib/ai/rag-engine";

export async function GET(req: NextRequest) {
  // Returns Slack App Manifest JSON ready for 1-click install
  const { searchParams } = new URL(req.url);
  const host = req.headers.get("host") || "docubrain.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const manifest = {
    display_information: {
      name: "DocuBrain Assistant",
      description: "AI-ассистент по внутренним регламентам компании без риска утечки данных",
      background_color: "#4338CA",
    },
    features: {
      bot_user: {
        display_name: "DocuBrain",
        always_online: true,
      },
      slash_commands: [
        {
          command: "/docubrain",
          url: `${baseUrl}/api/bots/slack/events`,
          description: "Задать вопрос корпоративному ассистенту по регламентам",
          usage_hint: "[вопрос про отпуск, технику, доступы]",
          should_escape: false,
        },
      ],
    },
    oauth_config: {
      scopes: {
        bot: [
          "app_mentions:read",
          "chat:write",
          "channels:history",
          "im:history",
          "commands",
        ],
      },
    },
    settings: {
      event_subscriptions: {
        request_url: `${baseUrl}/api/bots/slack/events`,
        user_events: [],
        bot_events: ["app_mention", "message.im"],
      },
      org_deploy_enabled: false,
      socket_mode_enabled: false,
    },
  };

  return NextResponse.json(manifest);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, tenant_id = "tenant-demo-acme", team_id, team_name } = body;

    if (action === "connect_workspace") {
      const tenant = db.getTenant(tenant_id);
      const activeChannels = db.getBotChannels(tenant_id).filter((c) => c.is_active);
      const tgActive = activeChannels.some((c) => c.channel_type === "telegram");

      if (tenant?.plan === "team" && tgActive) {
        return NextResponse.json(
          {
            error:
              "На тарифе Team можно подключить только 1 канал (Slack ИЛИ Telegram). Перейдите на тариф Scale для одновременного подключения.",
            upgradeRequired: true,
          },
          { status: 403 }
        );
      }

      db.saveBotChannel(tenant_id, {
        id: `bot-slack-${Date.now()}`,
        tenant_id,
        channel_type: "slack",
        slack_team_id: team_id || "T08SLACK99",
        slack_team_name: team_name || "Acme Workspace",
        slack_bot_token_masked: "xoxb-99182...44f2",
        is_active: true,
        connected_at: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: `Slack workspace "${team_name || "Acme Workspace"}" успешно подключен!`,
      });
    }

    if (action === "disconnect") {
      const channels = db.getBotChannels(tenant_id);
      const slackChan = channels.find((c) => c.channel_type === "slack");
      if (slackChan) {
        slackChan.is_active = false;
      }
      return NextResponse.json({ success: true, message: "Slack отключен." });
    }

    // Slack Events API challenge or event
    if (body.type === "url_verification") {
      return NextResponse.json({ challenge: body.challenge });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
