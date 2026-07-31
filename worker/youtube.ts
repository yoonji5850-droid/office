/** 연예계 모니터링팀 실시간 연동 — mumw 유튜브 채널(@MAKEUMINEWORKS) 신규 영상 감지 + AI 분석 */
import Anthropic from "@anthropic-ai/sdk";

export type YoutubeEnv = {
  YOUTUBE_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
};

export type LatestVideo = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

export type VideoAnalysis = {
  analysis: string;
  secondaryIdeas: string[];
  reactionSummary: string;
};

const CHANNEL_HANDLE = "MAKEUMINEWORKS";

let cachedChannelId: string | null = null;

async function resolveChannelId(apiKey: string): Promise<string> {
  if (cachedChannelId) return cachedChannelId;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`유튜브 채널 조회 실패 (HTTP ${response.status})`);
  const json = (await response.json()) as { items?: { id: string }[] };
  const id = json.items?.[0]?.id;
  if (!id) throw new Error(`@${CHANNEL_HANDLE} 채널을 찾을 수 없어요`);
  cachedChannelId = id;
  return id;
}

export async function getLatestVideo(env: YoutubeEnv): Promise<LatestVideo> {
  if (!env.YOUTUBE_API_KEY) throw new Error("YOUTUBE_API_KEY 미설정");
  const channelId = await resolveChannelId(env.YOUTUBE_API_KEY);
  const url = `https://www.googleapis.com/youtube/v3/search?key=${env.YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=1&type=video`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`유튜브 최신 영상 조회 실패 (HTTP ${response.status})`);
  const json = (await response.json()) as {
    items?: {
      id: { videoId: string };
      snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: { high?: { url: string }; default: { url: string } };
      };
    }[];
  };
  const item = json.items?.[0];
  if (!item) throw new Error("아직 올라온 영상이 없어요");
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  };
}

export async function analyzeVideo(video: LatestVideo, env: YoutubeEnv): Promise<VideoAnalysis> {
  if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY 미설정");
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `mumw(MAKE U MINE WORKS) 유튜브 채널에 새로 올라온 영상이야.

제목: ${video.title}
설명: ${video.description}
게시일: ${video.publishedAt}

아티스트 분석팀 관점에서 분석해줘. 아래 JSON 형식으로만 답해줘 (다른 텍스트 없이 JSON만):
{
  "analysis": "이 영상의 톤·소재·아티스트 매력 포인트 분석 (3~4문장)",
  "secondary_ideas": ["2차 숏폼 콘텐츠 아이디어 1", "아이디어 2", "아이디어 3"],
  "reaction_summary": "예상되는 팬·대중 반응 요약 (2~3문장)"
}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("분석 실패: 응답이 비어있어요");

  const jsonText = textBlock.text.slice(textBlock.text.indexOf("{"), textBlock.text.lastIndexOf("}") + 1);
  const parsed = JSON.parse(jsonText) as {
    analysis: string;
    secondary_ideas: string[];
    reaction_summary: string;
  };
  return {
    analysis: parsed.analysis,
    secondaryIdeas: parsed.secondary_ideas,
    reactionSummary: parsed.reaction_summary,
  };
}
