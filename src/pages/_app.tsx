import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import SidebarLeft from "~/components/Sidebar/SidebarLeft";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="h-screen bg-zinc-900">
        <main className="flex h-screen gap-12 py-4">
          <div className="flex h-full justify-center overflow-y-auto px-4">
            <SidebarLeft />
          </div>

          <div className="h-full w-full flex-1 overflow-y-auto">
            <Component {...pageProps} />
          </div>

          <div className="flex h-full justify-center overflow-y-auto px-4">
          </div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
