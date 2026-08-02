/** 콘텐츠 초안팀·디자인 제작팀 — 대표가 뉴스 피드에서 고른 이슈로 카드뉴스 문안 생성 */
import Anthropic from "@anthropic-ai/sdk";

export type CardNewsEnv = {
  ANTHROPIC_API_KEY?: string;
};

export type CardNewsRequest = {
  title: string;
  link: string;
  source: string;
};

export type CardNewsResult = {
  cover: string;
  cards: string[];
  caption: string;
};

export async function generateCardNews(item: CardNewsRequest, env: CardNewsEnv): Promise<CardNewsResult> {
  if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY 미설정");
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `대표가 아래 뉴스 이슈를 카드뉴스로 제작하기로 골랐어.

제목: ${item.title}
출처: ${item.source}
링크: ${item.link}

콘텐츠 초안팀·디자인 제작팀 관점에서 카드뉴스 문안을 만들어줘. 아래 JSON 형식으로만 답해줘 (다른 텍스트 없이):
{
  "cover": "표지 카드 후킹 문구 (15자 내외)",
  "cards": ["2번째 카드 본문", "3번째 카드 본문", "4번째 카드 본문(CTA 포함)"],
  "caption": "SNS 게시물 캡션 (해시태그 포함, 2~3문장)"
}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("생성 실패: 응답이 비어있어요");

  const jsonText = textBlock.text.slice(textBlock.text.indexOf("{"), textBlock.text.lastIndexOf("}") + 1);
  return JSON.parse(jsonText) as CardNewsResult;
}
