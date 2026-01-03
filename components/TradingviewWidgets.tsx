"use client";
import useTradingViewWidget from "@/app/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";
import React, { useRef, memo, RefObject } from "react";

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: tradingViewWidgetProps) => {
  const container = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-gray-100 text-xl font-semibold mb-4">{title}</h2>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={container}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: height, width: "100%" }}
        />
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
