import { LucidePlus, LucideSend } from "lucide-react";
import { type GetServerSideProps, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "~/components/Card";
import ChatBubble from "~/components/ChatBubble";
import Chip from "~/components/Chip";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

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

  const [message, setMessage] = useState("");
  const { data: messages, refetch: refetchMessages } =
    api.chats.getMessages.useQuery({
      room: "general",
    });
  const sendMessageMutation = api.chats.storeChat.useMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      void refetchMessages();
    }, 10_000);

    return () => clearInterval(interval);
  }, [refetchMessages]);

  const sendMessage = async () => {
    await sendMessageMutation.mutateAsync({
      room: "general",
      message,
    });
  };

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
                titlebg={card.titleBg}
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

          <div className="flex h-full w-96 flex-col items-center overflow-y-auto rounded-xl bg-[#8C78C3] py-2 text-[#D8CFEF] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900">
            <span className="scroll-m-20 pb-2 text-center text-2xl font-medium transition-colors first:mt-0">
              ChatRoom
            </span>

            <div className="flex w-full flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-zinc-600 scrollbar-track-gray-100 px-4">
              {messages?.messages.map((message) => (
                <ChatBubble
                  className="w-full"
                  key={message.id}
                  user={message.user.name as string}
                  message={message.message}
                />
              ))}
            </div>

            <div className="flex w-full gap-2 border-t-2 border-black px-8 pb-2 pt-4">
              <input
                onKeyDown={(e) => void setMessage(e.currentTarget.value)}
                onKeyUp={(e) => void setMessage(e.currentTarget.value)}
                onChange={(e) => void setMessage(e.currentTarget.value)}
                className="w-full rounded-full px-4 py-2 text-black"
                type="text"
                placeholder="Enter message"
              />

              <button
                onClick={() => void sendMessage()}
                className="rounded-full border-2 p-2"
              >
                <LucideSend size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
