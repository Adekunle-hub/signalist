// hooks/useStockData.ts
import { getStockDetails } from "@/lib/actions/finhub.actions";
import { useState, useEffect } from "react";

interface StockItem {
  symbol: string;
  [key: string]: any;
}

type SymbolInput = string | StockItem;


const CACHE_DURATION = 10 * 60 * 1000; // 15 minutes
const CACHE_KEY = 'stock_cache';


const loadCache = (): Record<string, { data: any; timestamp: number }> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};


const saveCache = (cache: Record<string, { data: any; timestamp: number }>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
};


const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const useStockData = (symbols: SymbolInput[]) => {
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStocks = async () => {
      if (!symbols || symbols.length === 0) {
        setStocksData([]);
        return;
      }

      setLoading(true);

     
      const cache = loadCache();

      const results = await Promise.all(
        symbols.map(async (item) => {
          const symbol = typeof item === "string" ? item : item.symbol;

          
          if (cache[symbol] && isCacheValid(cache[symbol].timestamp)) {
            return cache[symbol].data;
          }

        
          const data = await getStockDetails(symbol);
          
         
          cache[symbol] = {
            data,
            timestamp: Date.now(),
          };

          return data;
        })
      );

    
      saveCache(cache);

      setStocksData(results);
      setLoading(false);
    };

    fetchStocks();
  }, [symbols]);

  return { stocksData, loading };
};