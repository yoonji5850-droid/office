/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { integrationStatus, publishReport, type DayReport, type PublishEnv } from "./report";
import { getDailyIssues, getEntertainmentNews } from "./news";

interface Env extends PublishEnv {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 연동 설정 여부만 알려준다 (값은 절대 내보내지 않는다)
    if (url.pathname === "/api/integrations") {
      return Response.json(integrationStatus(env));
    }

    // 완료 보고를 Notion + Discord로 동시 발행
    if (url.pathname === "/api/report") {
      if (request.method !== "POST") return new Response("POST only", { status: 405 });
      try {
        const report = (await request.json()) as DayReport;
        const result = await publishReport(report, env);
        return Response.json(result);
      } catch (error) {
        return Response.json({ error: String(error) }, { status: 400 });
      }
    }

    // 연예계 모니터링팀: 아이돌·가수·배우 관련 실시간 이슈 (구글 뉴스, 키 불필요)
    if (url.pathname === "/api/news/entertainment") {
      try {
        return Response.json(await getEntertainmentNews());
      } catch (error) {
        return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
      }
    }

    // 데일리 이슈팀: 연예계 밖 일반 화제·트렌드 (구글 뉴스, 키 불필요)
    if (url.pathname === "/api/news/daily-issues") {
      try {
        return Response.json(await getDailyIssues());
      } catch (error) {
        return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
