import { LucidePlus } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DiY</title>
        <meta name="description" content="DiY ya stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="rounded-full px-4 py-3 text-2xl w-1/2 focus:outline-none"
            placeholder="Search"
          />

          <div>
            <button className="rounded-full bg-[#A3C05E] hover:bg-opacity-90 px-4 py-4">
              <LucidePlus />
            </button>
          </div>

          <div>
            <Link className="px-8 py-4 rounded-full bg-[#CABDD9] hover:bg-opacity-90" href="/projects">
              Your Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
