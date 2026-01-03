"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FiTrendingUp } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { getStock } from "@/lib/actions/finhub.actions";
import { normalizeStockData, POPULAR_STOCKS } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { UseUIStore } from "@/lib/store/useUIStore";

const SearchCommand = () => {
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState<any[]>(POPULAR_STOCKS);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const showSearchModal = UseUIStore((state) => state.showSearchModal);
  const openSearchModal = UseUIStore((state) => state.openSearchModal);
  const closeSearchModal = UseUIStore((state) => state.closeSearchModal);
  const toggleSearchModal = UseUIStore((state) => state.toggleSearchModal);

  const [debouncedQuery] = useDebounce(query, 400);
  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.trim().length < 2) {
        setStocks(POPULAR_STOCKS);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getStock(debouncedQuery);
        const normalizedData = normalizeStockData(data);

        setStocks(normalizedData);
      } catch (error) {
        console.error("Search failed", error);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [debouncedQuery]);

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol);
      } else {
        newFavorites.add(symbol);
      }
      return newFavorites;
    });
  };

  return (
    <div className="fixed md:relative md:top-0 top-16 left-0 right-0 bottom-0 z-50 min-h-screen! ">
      <Command
        shouldFilter={false}
        className="rounded-lg border shadow-md w-full min-h-screen!  md:min-w-[450px]"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search by symbol or company name"
          className="text-[#9095A1] py-4!"
          onClear={() => {
            if (!query) {
              closeSearchModal();
              setStocks(POPULAR_STOCKS);
            } else {
              setQuery("");
            }
          }}
        />

        <CommandList className=" min-h-screen!">
          {loading && (
            <CommandEmpty className="text-white text-base ">
              Searching…
            </CommandEmpty>
          )}
          {!loading && stocks.length === 0 && (
            <CommandEmpty className="text-white font-semibold text-base text-center py-4">
              No results found.
            </CommandEmpty>
          )}

          <CommandGroup className="min-h-screen!">
            <h4 className="text-xs  w-full bg-[#141414] text-[#CCDADC] py-2 px-3">
              {loading
                ? "Searching..."
                : query
                ? `Search results (${stocks.length})`
                : `Popular stocks (${POPULAR_STOCKS.length})`}
            </h4>

            {stocks.map((stock, index) => (
              <CommandItem
                key={`${stock.symbol}-${index}`}
                className="text-white flex gap-2  justify-between pt-4 items-center px-4"
              >
                <Link
                  href={`/watchlist/${stock.symbol}`}
                  onClick={closeSearchModal}
                  className="flex gap-4 flex-1"
                >
                  <FiTrendingUp />
                  <div className="flex flex-col gap-1">
                    <span>{stock.name}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      {stock.myDescription.map(
                        (desc: string, index: number) => (
                          <span key={index} className="flex items-center">
                            {desc}
                            {index < stock.myDescription.length - 1 && (
                              <span className="mx-1">•</span>
                            )}
                          </span>
                        )
                      )}
                    </span>
                  </div>
                </Link>

                <Button
                  className="bg-transparent hover:bg-transparent cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(stock.symbol);
                  }}
                >
                  <FaStar
                    className={`cursor-pointer transition-colors ${
                      favorites.has(stock.symbol)
                        ? "text-[#E8BA40]"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    
    </div>
  );
};

export default SearchCommand;
