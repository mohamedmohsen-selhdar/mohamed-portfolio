import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, country, theme } = body;

    if (!city || !country) {
      return NextResponse.json({ error: "City and Country are required" }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g., "username/mohamed-portfolio"

    if (!githubToken || !githubRepo) {
      // For localhost demo or if token is missing
      console.warn("Missing GITHUB_TOKEN or GITHUB_REPO in environment variables.");
      return NextResponse.json(
        { message: "Simulated trigger since credentials are not configured.", success: true },
        { status: 200 }
      );
    }

    const filename = `${city.toLowerCase().replace(/\s+/g, '-')}-${theme}`;

    // Trigger GitHub Action using workflow_dispatch
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/actions/workflows/generate-map.yml/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          city,
          country,
          theme,
          filename,
        },
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errText = await response.text();
      throw new Error(`GitHub API returned ${response.status}: ${errText}`);
    }
  } catch (error: any) {
    console.error("Generate map error:", error);
    return NextResponse.json({ error: error.message || "Failed to trigger generation" }, { status: 500 });
  }
}
