import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import NextNProgress from "nextjs-progressbar";

import "~/styles/globals.css";
import SidebarLeft from "~/components/Sidebar/SidebarLeft";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress />
      <div className="h-screen bg-[#2F2A3B] bg-[url('/dashboard-grid.svg')] bg-center">
        <main className="flex h-screen gap-2 py-4">
          <div className="flex h-full justify-center overflow-y-auto px-4">
            <SidebarLeft />
          </div>

          <div className="h-full w-full flex-1 overflow-y-auto py-8 pr-8">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
