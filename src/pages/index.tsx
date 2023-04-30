import { LucidePlus } from "lucide-react";
import { type GetServerSideProps, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "~/components/Card";
import Chip from "~/components/Chip";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const Home: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data) {
      console.log("no session");
      void router.push("/login");
      return;
    }

    console.log({ session });
  }, [session, router]);

  const tags = ["computer-games", "electronics", "food", "origami"];
  const homePageCards = [
    {
      title: "How to paint on T-Shirts",
      image: "/dashboard/tshirt.png",
      imageClassName: "object-cover",
      className: "col-span-6",
      titleBg: "#973A4A",
    },
    {
      title: "Let’s talk about this DIY workflow...",
      image: "/dashboard/tape.png",
      imageClassName: "h-96",
      className: "col-span-6",
      titleBg: "#275548",
    },
    {
      title: "Easy guide to make aesthetic postcards~",
      image: "/dashboard/cutting.png",
      imageClassName: "w-96",
      className: "col-span-4",
      titleBg: "#714F2E",
    },
    {
      title: "Getting started with IoT",
      image: "/dashboard/iot.png",
      imageClassName: "w-96 h-full object-cover",
      className: "col-span-8",
      titleBg: "#4D6B70",
    },
  ];

  return (
    <>
      <Head>
        <title>DiY</title>
        <meta name="description" content="DiY ya stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full w-full gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="w-1/2 rounded-full px-4 py-3 text-xl focus:outline-none"
              placeholder="Search"
            />

            <div>
              <button className="rounded-full bg-[#A3C05E] px-4 py-4 hover:bg-opacity-90">
                <LucidePlus />
              </button>
            </div>

            <div>
              <Link
                className="rounded-full bg-[#CABDD9] px-8 py-4 hover:bg-opacity-90"
                href="/projects"
              >
                Your Projects
              </Link>
            </div>
          </div>

          {/* tags | chips */}
          <div className="flex gap-4">
            {tags.map((tag) => (
              <Chip key={tag} title={`#${tag}`} />
            ))}
          </div>

          <div className="grid h-full w-full grid-cols-12 gap-4">
            {homePageCards.map((card) => (
              <Card
                key={card.image}
                title={card.title}
                image={card.image}
                className={card.className}
                imageClassName={card.imageClassName}
                titleBg={card.titleBg}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-full w-96 flex-col items-center rounded-xl bg-[#8C78C3] pb-2 pt-4 text-[#D8CFEF]">
            <span className="w-full scroll-m-20 text-center text-xl font-medium transition-colors first:mt-0">
              Trending
            </span>

            <div className="flex w-full flex-col gap-4 px-4 pt-4">
              {[
                "Sowing a chibi Yae Miko Genshin plushie [ for beginners ]",
                "3 ingredient strawberry mochi recipe [ for beginners <3 ]",
                "Blender 3D modelling a living room [ Intermediate ]",
                "Swapping MX switches on a mechanical keyboard [ Intermediate ]",
                "How to survive in JSPM [ Veteran ]",
              ].map((title) => (
                <Link
                  key={title}
                  href="/trending"
                  className="text-black hover:underline"
                >
                  <Chip
                    title={title}
                    className="w-full truncate rounded-md bg-[#cabdd9] py-2 text-black"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex h-full w-96 justify-center rounded-xl bg-[#8C78C3] py-2 text-[#D8CFEF]">
            <span className="scroll-m-20 text-center text-2xl font-medium transition-colors first:mt-0">
              ChatRoom
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
