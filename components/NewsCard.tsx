import React from "react";
import {
  Card,
  CardAction,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "./ui/card";
import { FaArrowRight } from "react-icons/fa";
import { getTimeAgo } from "@/lib/utils";

interface NewsCardProps {
  symbol?: string;
  headline: string;
  source: string;
  summary: string;
  datetime?: number;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  symbol,
  headline,
  source,
  summary,
  datetime,
  url,
}) => {
  const timeAgo = getTimeAgo(datetime);

  return (
    <Card className="w-full md:max-w-xs bg-[#141414] p-4 rounded-md border-0! shadow-sm flex flex-col h-full">
      
      <CardHeader className="p-0 flex flex-col gap-1">
        {symbol && (
          <CardTitle className="bg-[#72EEA233] text-[#72EEA2] px-2 py-0.5 w-fit rounded-sm text-[10px] font-medium">
            {symbol}
          </CardTitle>
        )}
        <CardDescription className="text-white font-semibold text-sm leading-snug line-clamp-2">
          {headline}
        </CardDescription>
        <div className="text-[#9095A1] text-xs flex items-center gap-2">
          <span>{source}</span>
          {timeAgo && (
            <>
              <span className="before:content-['•'] before:text-[#9095A1]"></span>
              <span>{timeAgo}</span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-[#CCDADC] text-sm leading-relaxed flex-1 overflow-hidden line-clamp-4">
        {summary}
      </CardContent>

      
      <CardAction className="mt-auto">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#E8BA40] text-sm font-medium hover:underline"
        >
          <span>Read more</span>
          <FaArrowRight size={12} className="relative top-[1px]" />
        </a>
      </CardAction>
    </Card>
  );
};

export default NewsCard;
