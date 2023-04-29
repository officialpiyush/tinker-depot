import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div className="h-screen bg-zinc-900">
    <Component {...pageProps} />
  </div>;
};

export default api.withTRPC(MyApp);
