import { auth } from "@/lib/better-auth/auth";

import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { FaStar } from "react-icons/fa";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <div className="w-[90%] mx-auto sm:w-[45%] px-0 py-6 md:p-8  ">
        <Image
          src="/head.webp"
          alt="Logo"
          width={320}
          height={320}
          className="text-white"
        />
        {children}
      </div>
      <div className="text-white  flex flex-col w-full mx-auto sm:w-[55%] bg-[#141414] ">
        <div className="px-4 sm:px-8 md:px-16 pt-4 md:pt-12  pb-4 md:pb-8 ">
          <blockquote>
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between  mt-4 w-full">
            <article className="flex flex-col">
              <cite className="text-sm font-semibold">— Ethan R.</cite>
              <span className="text-[#CCDADC] text-xs"> Retail Investor</span>
            </article>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <FaStar key={index} color="#CCDADC" />
              ))}
            </div>
          </div>
        </div>
        <div className=" hidden sm:flex relative w-[95%] ml-auto  h-full">
          <Image
            src="/screen-mockup.webp"
            alt="screen-mockup"
            fill
            className="h-full w-full sm:object-contain  "
          />
        </div>
      </div>
    </main>
  );
};

export default layout;
