import TradingviewWidgets from "@/components/TradingviewWidgets";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const page = () => {
  return (
    <main className="grid w-full lg:px-16  md:px-8 px-4 mx-auto gap-4 my-6 space-y-4 h-[50%]">
      <section className="flex gap-4 flex-col md:flex-row">
        <div className="md:flex-1/3 flex-1  ">
          <TradingviewWidgets
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className="flex-1 md:flex-2/3  ">
          <TradingviewWidgets
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 md:flex-1/3">
          <TradingviewWidgets
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className="flex-1 md:flex-2/3">
          <TradingviewWidgets
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
            config={MARKET_DATA_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
      </section>
    </main>
  );
};

export default page;
