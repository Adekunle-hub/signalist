"use server";

import { getDateRange, validateArticle, formatArticle } from "@/lib/utils";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const NEXT_PUBLIC_FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? "";

async function fetchJSON<T>(
  url: string,
  revalidateSeconds?: number
): Promise<T> {
  const options: RequestInit & { next?: { revalidate?: number } } =
    revalidateSeconds
      ? { cache: "force-cache", next: { revalidate: revalidateSeconds } }
      : { cache: "no-store" };

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export { fetchJSON };

export async function getNews(
  symbols?: string[]
): Promise<MarketNewsArticle[]> {
  try {
    const range = getDateRange(5);
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      throw new Error("FINNHUB API key is not configured");
    }
    const cleanSymbols = (symbols || [])
      .map((s) => s?.trim().toUpperCase())
      .filter((s): s is string => Boolean(s));

    const maxArticles = 8;

    if (cleanSymbols.length > 0) {
      const perSymbolArticles: Record<string, RawNewsArticle[]> = {};

      await Promise.all(
        cleanSymbols.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(
              sym
            )}&from=${range.from}&to=${range.to}&token=${token}`;
            const articles = await fetchJSON<RawNewsArticle[]>(url, 300);
            perSymbolArticles[sym] = (articles || []).filter(validateArticle);
          } catch (e) {
            console.error("Error fetching company news for", sym, e);
            perSymbolArticles[sym] = [];
          }
        })
      );

      const collected: MarketNewsArticle[] = [];
      // Round-robin up to 6 picks
      for (let round = 0; round < maxArticles; round++) {
        for (let i = 0; i < cleanSymbols.length; i++) {
          const sym = cleanSymbols[i];
          const list = perSymbolArticles[sym] || [];
          if (list.length === 0) continue;
          const article = list.shift();
          if (!article || !validateArticle(article)) continue;
          collected.push(formatArticle(article, true, sym, round));
          if (collected.length >= maxArticles) break;
        }
        if (collected.length >= maxArticles) break;
      }

      if (collected.length > 0) {
        // Sort by datetime desc
        collected.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
        return collected.slice(0, maxArticles);
      }
    }

    // General market news fallback or when no symbols provided
    const generalUrl = `${FINNHUB_BASE_URL}/news?category=general&token=${token}`;
    const general = await fetchJSON<RawNewsArticle[]>(generalUrl, 300);

    const seen = new Set<string>();
    const unique: RawNewsArticle[] = [];
    for (const art of general || []) {
      if (!validateArticle(art)) continue;
      const key = `${art.id}-${art.url}-${art.headline}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(art);
      if (unique.length >= 20) break; // cap early before final slicing
    }

    const formatted = unique
      .slice(0, maxArticles)
      .map((a, idx) => formatArticle(a, false, undefined, idx));
    return formatted;
  } catch (err) {
    console.error("getNews error:", err);
    throw new Error("Failed to fetch news");
  }
}

export async function getStock(query: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  );

  const data = await response.json();
  return Array.isArray(data.result) ? data.result : [];
}

// export async function getStockDetails(symbol: string) {
//   const quoteRes = await fetch(
//     `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
//   );

//   const profileRes = await fetch(
//     `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
//   );

//   const [quote, profile] = await Promise.all([
//     quoteRes.json(),
//     profileRes.json(),
//   ]);

//   return {
//     symbol,
//     profile,
//     quote,
//     name: profile.name,
//     logo:profile.logo,
//     closingPrice:quote.pc,
//     currentPrice: quote.c,
//     percentChange: quote.dp,
//     marketCap: profile.marketCapitalization,
//     peRatio: profile.peBasicExclExtraTTM || "N/A", // optional P/E ratio
//   };
// }

export async function getStockDetails(symbol: string) {
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  if (!apiKey) {
    throw new Error("Finnhub API key is missing");
  }

  const maxRetries = 3;
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const quoteRes = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      const profileRes = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
      );

      if (quoteRes.status === 429 || profileRes.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment.");
      }

      if (!quoteRes.ok) {
        throw new Error(`Quote API error: ${quoteRes.status}`);
      }
      if (!profileRes.ok) {
        throw new Error(`Profile API error: ${profileRes.status}`);
      }

      const [quote, profile] = await Promise.all([
        quoteRes.json(),
        profileRes.json(),
      ]);

      return {
        symbol,
        profile,
        quote,
        name: profile.name,
        logo: profile.logo,
        closingPrice: quote.pc,
        currentPrice: quote.c,
        percentChange: quote.dp,
        marketCap: profile.marketCapitalization,
        peRatio: profile.peBasicExclExtraTTM || "N/A",
      };
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed for ${symbol}:`, error);

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1))
        );
      }
    }
  }

  throw new Error(
    `Failed to fetch stock details for ${symbol} after ${maxRetries} attempts: ${lastError}`
  );
}
