// components/SearchCommandWrapper.tsx (Client Component)
"use client";

import SearchCommand from "@/components/SearchCommand";
import { UseUIStore } from "@/lib/store/useUIStore";

export default function SearchCommandWrapper() {
  const showSearchModal = UseUIStore((state) => state.showSearchModal);

  if (!showSearchModal) return null;

  return (
    <div className="block md:hidden">
      <SearchCommand />;
    </div>
  );
}
