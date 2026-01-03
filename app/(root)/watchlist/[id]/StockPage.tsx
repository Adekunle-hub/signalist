"use client";
import { useParams } from "next/navigation";
import React from "react";
import TradingviewWidgets from "@/components/TradingviewWidgets";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  FUNDAMENTAL_DATA_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import ButtonComponent from "@/components/ButtonComponent";

const StockPage = () => {
  const params = useParams<{ id: string }>();
  const symbol = params.id;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] bg-black gap-4 md:gap-6 lg:gap-8 py-4 md:py-6 lg:py-8 w-[95%]  sm:w-[90%] mx-auto">
      <section className="flex flex-col gap-6 md:gap-8 lg:gap-12 ">
        <div className="w-full flex flex-col">
          <TradingviewWidgets
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
            className="custom-chart"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
          />
          <ButtonComponent className="block md:hidden">
            Add to watchlist
          </ButtonComponent>
        </div>
        <div className="w-full">
          <TradingviewWidgets
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={170}
            className="custom-chart"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          />
        </div>
        <div className="w-full">
          <TradingviewWidgets
            config={BASELINE_WIDGET_CONFIG(symbol)}
            height={170}
            className="custom-chart"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          />
        </div>
      </section>

      <section className="hidden md:flex flex-col gap-3 md:gap-4 pt-0 lg:pt-4 ">
        <div className="sticky top-4 flex flex-col gap-3 md:gap-4">
          <ButtonComponent className="hidden md:block">
            Add to watchlist
          </ButtonComponent>

          <div className="p-0 m-0 max-h-96 border border-gray-500/30 rounded-sm overflow-hidden">
            <TradingviewWidgets
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
            />
          </div>

          <div className="border border-gray-500/30 rounded-sm overflow-hidden">
            <TradingviewWidgets
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
            />
          </div>

          <div className="border border-gray-500/30 rounded-sm overflow-hidden">
            <TradingviewWidgets
              config={FUNDAMENTAL_DATA_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
            />
          </div>
        </div>
      </section>



      <section className="flex flex-col sm:hidden w-full  gap-3 pt-0 lg:pt-4">
        <div className="sticky top-4 flex flex-col w-full max-w-full gap-3">
          <div className="border border-gray-500/30 rounded-sm overflow-hidden">
            <TradingviewWidgets
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
            />
          </div>

          <div className="border border-gray-500/30 rounded-sm overflow-hidden">
            <TradingviewWidgets
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
            />
          </div>

          <div className="border border-gray-500/30 rounded-sm max-w-fit overflow-hidden ">
            <TradingviewWidgets
              config={FUNDAMENTAL_DATA_WIDGET_CONFIG(symbol)}
              height={170}
              className="custom-chart"
              scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default StockPage;
