"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { getNews } from "@/lib/actions/finhub.actions";
import { WATCHLIST_STOCKS } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";

const News = () => {
  const [news, setNews] = useState<MarketNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const symbols = WATCHLIST_STOCKS.map((stock) => stock.symbol);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(symbols);
        setNews(data);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

 
  const NewsCardSkeleton = () => (
    <div className="bg-[#141414] rounded-lg p-4 flex flex-col gap-3">
      {/* Source */}
      <Skeleton className="h-3 w-24" />

      {/* Headline */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

      {/* Summary */}
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-11/12" />
      <Skeleton className="h-3 w-4/6" />

      {/* Footer */}
      <Skeleton className="h-3 w-20 mt-2" />
    </div>
  );

  return (
    <main className="py-4 flex flex-col gap-4">
      <h3 className="font-bold text-base">News</h3>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {news.map((article) => (
            <NewsCard
              key={article.id ?? article.url}
              symbol={article.related}
              headline={article.headline}
              source={article.source}
              summary={article.summary}
              datetime={article.datetime}
              url={article.url}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default News;
