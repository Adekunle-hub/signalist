"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import ButtonComponent from "./ButtonComponent";
import { formatMarketCap } from "@/lib/utils";
import { WATCHLIST_STOCKS } from "@/lib/constants";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import { useStockData } from "@/app/hooks/useStockData";

const WatchlistTable = () => {
  const [watchlist, setWatchlist] = useState(WATCHLIST_STOCKS);

  const { stocksData, loading } = useStockData(watchlist);

  const addStock = (newStock: { name: string; symbol: string }) => {
    if (!watchlist.find((s) => s.symbol === newStock.symbol)) {
      setWatchlist([...watchlist, newStock]);
    }
  };

  const removeStock = (symbol: string) => {
    setWatchlist(watchlist.filter((s) => s.symbol !== symbol));

  };

  

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white font-semibold text-base">Watchlist</h1>
        <ButtonComponent onClick={()=>console.log("Add stock")}>Add Stock</ButtonComponent>
      </div>

      <div className="border border-[#212328] rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-[#CCDADC] hover:bg-transparent">
              <TableHead className="bg-[#212328] w-4" />
              <TableHead className="bg-[#212328]">Company</TableHead>
              <TableHead className="bg-[#212328]">Symbol</TableHead>
              <TableHead className="bg-[#212328]">Price</TableHead>
              <TableHead className="bg-[#212328]">Change</TableHead>
              <TableHead className="bg-[#212328]">Market Cap</TableHead>
              <TableHead className="bg-[#212328]">Alert</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? watchlist.map((stock) => (
                  <TableRow key={stock.symbol} className="animate-pulse">
                    <TableCell>
                      <FaStar color="#555" />
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {stock.name}
                    </TableCell>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell colSpan={4} className="text-gray-500">
                      --
                    </TableCell>
                  </TableRow>
                ))
              : stocksData.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell className="cursor-pointer">
                      <FaStar onClick={()=> removeStock(stock.symbol)} color="#E8BA40" />
                    </TableCell>
                    <TableCell>{stock.profile.name}</TableCell>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>${stock.quote.c.toFixed(2)}</TableCell>
                    <TableCell
                      className={
                        stock.quote.d >= 0
                          ? "text-green-400 font-semibold"
                          : "text-red-400 font-semibold"
                      }
                    >
                      {stock.quote.dp.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      {formatMarketCap(stock.profile.marketCapitalization)}
                    </TableCell>
                    <TableCell>
                      <Button className="px-4 py-1 hover:bg-[#FF824333]/90 cursor-pointer text-sm bg-[#FF824333] text-[#FF8243] rounded-sm">
                        Set Alert
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default WatchlistTable;
