/** 데일리 이슈팀 · 연예계 모니터링팀 실시간 연동 — 구글 뉴스 RSS (API 키 불필요) */

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  publishedAt: string;
};

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return "";
  return match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchGoogleNewsRss(query: string, limit: number): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`뉴스 조회 실패 (HTTP ${response.status})`);
  const xml = await response.text();

  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) && items.length < limit) {
    const block = match[1];
    const title = decodeEntities(extractTag(block, "title"));
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    const sourceMatch = block.match(/<source[^>]*>([^<]*)<\/source>/);
    const source = sourceMatch ? decodeEntities(sourceMatch[1]) : "";
    if (title && link) items.push({ title, link, source, publishedAt: pubDate });
  }
  return items;
}

/** 연예계 모니터링팀: 아이돌·가수·배우 관련 실시간 이슈 */
export async function getEntertainmentNews(): Promise<NewsItem[]> {
  return fetchGoogleNewsRss("연예계 OR 아이돌 OR 케이팝", 10);
}

/** 데일리 이슈팀: 연예계 밖 일반 화제·트렌드 이슈 */
export async function getDailyIssues(): Promise<NewsItem[]> {
  return fetchGoogleNewsRss("오늘의 화제 OR 실시간 이슈 OR 밈", 10);
}
