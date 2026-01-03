import Header from "@/components/Header";

import SearchCommandWrapper from "@/components/SearchCommandWrapper";
import { auth } from "@/lib/better-auth/auth";


import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
 
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
  return (
    <main>
      <div>
        <Header user={user} />
      </div>
      <section className="relative min-h-screen">
        <div className="absolute inset-0 min-h-screen">
          <SearchCommandWrapper />

          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
