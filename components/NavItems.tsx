"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

import { useEffect } from "react";
import SearchCommand from "./SearchCommand";
import { UseUIStore } from "@/lib/store/useUIStore";

const NavItems = () => {
  const showSearchModal = UseUIStore((state) => state.showSearchModal);

  const closeSearchModal = UseUIStore((state) => state.closeSearchModal);
  const toggleSearchModal = UseUIStore((state) => state.toggleSearchModal);

  const pathname = usePathname();

  useEffect(() => {
    if (showSearchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSearchModal]);

  const isActive: (path: string) => boolean = (path) => {
    {
      if (path === "/") return pathname === "/";
      return pathname.startsWith(path);
    }
  };
  return (
    <>
      <ul className="flex  flex-col sm:flex-row py-1 md:py-2 sm:gap-4  justify-center">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            {item.label === "Search" ? (
              <Button
                className={` text-[#9095A1] bg-transparent! hover:bg-transparent! py-0! px-0! h-fit! hover:text-yellow-500 cursor-pointer text-sm font-medium transition-colors 
                 ${
                   showSearchModal
                     ? "text-white"
                     : "text-[#9095A1] hover:text-yellow-500"
                 }
  
                }`}
                onClick={toggleSearchModal}
              >
                {item.label}
              </Button>
            ) : (
              <Link
                className={` text-[#9095A1] hover:text-yellow-500 text-sm font-medium transition-colors ${
                  !showSearchModal && isActive(item.href) ? "text-white" : ""
                }`}
                href={item.href}
                onClick={closeSearchModal}
              >
                {" "}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {showSearchModal && (
        <div
          className="fixed left-0 hidden right-0 bottom-0 top-16 z-40
               md:flex pt-6  justify-center
               bg-black/40 backdrop-blur-sm"
        >
          <div
            className="w-full  h-fit max-w-lg px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchCommand />
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
