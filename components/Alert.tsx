"use client";

import React from "react";
import ButtonComponent from "./ButtonComponent";
import AlertCard from "./AlertCard";
import { WATCHLIST_STOCKS } from "@/lib/constants";
import { useStockData } from "@/app/hooks/useStockData";
import { Skeleton } from "./ui/skeleton";

const Alert = () => {
  const alertSymbols = WATCHLIST_STOCKS;
  const { stocksData, loading } = useStockData(alertSymbols);

  /* Inline skeleton card */
  const AlertCardSkeleton = () => (
    <div className="flex items-center justify-between bg-[#1a1a1a] rounded-md p-4">
      {/* Left: icon + name */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Right: price + change */}
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-base">Alerts</h1>
        <ButtonComponent>Create Alert</ButtonComponent>
      </div>

      <section className="flex flex-col mt-7 max-h-[80vh] overflow-y-auto bg-[#141414] gap-6 rounded-md p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <AlertCardSkeleton key={index} />
            ))}
          </>
        ) : (
          stocksData.map((stock) => (
            <div className=" ">
  <AlertCard
              key={stock.symbol}
              companyName={stock.name}
              symbol={stock.symbol}
              price={stock.currentPrice}
              changePercent={stock.percentChange}
              closingPrice={stock.closingPrice}
              icon={stock.logo}
            />
            </div>
          
          ))
        )}
      </section>
    </main>
  );
};

export default Alert;
