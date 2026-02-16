import { NextRequest, NextResponse } from "next/server";
import { assertCronSecret } from "@/lib/auth";
import { runEnabledRulesImport } from "@/lib/importer";

const runCron = async () => {
  const results = await runEnabledRulesImport();

  const summary = {
    total: results.length,
    success: results.filter((item) => item.status === "success").length,
    skipped: results.filter((item) => item.status === "skipped").length,
    error: results.filter((item) => item.status === "error").length
  };

  return { summary, results };
};

export async function GET(request: NextRequest) {
  if (!assertCronSecret(request)) {
    return NextResponse.json({ error: "Cron secret invalido" }, { status: 401 });
  }

  try {
    const payload = await runCron();
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no cron" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
