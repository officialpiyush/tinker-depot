import { LucideFileText, LucideSend } from "lucide-react";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

export default function ProjectPage() {
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
    <div className="grid h-full w-full grid-cols-12 gap-4">
      <div className="col-span-8 flex h-full w-full flex-col gap-4">
        <div
          className="relative h-full flex-1 rounded-xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/dashboard/tape.png)",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 bg-[#4D6B70] py-3 text-white">
            <div className="text[#D9D9D9]">
              Let’s talk about this DIY workflow
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-xl bg-[#8c78c3] px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex w-fit items-center gap-2 rounded-3xl rounded-bl-none bg-[#D9D9D9] py-2 pl-2 pr-4">
              <div className="rounded-full bg-[#714F4F] p-2">
                <LucideFileText size={20} color="#D5B8B8" />
              </div>

              <span className="text-md">Description</span>
            </div>

            <div className="flex gap-4">
              <Chip title="Chat with Creator" className="py-2 text-sm" />
              <Chip title="Checkout Creator" className="py-2 text-sm" />
            </div>
          </div>

          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the1500s, when an unknown printer took a galley of type
            and scrambled it to. Lorem Ipsum has been the industrys standard
            dummy text ever since the1500s, when an unknown printer took a
            galley of type and scrambled it to
          </div>
        </div>
      </div>

      <div className="col-span-4">
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

            <div className="flex w-full flex-col gap-4 overflow-y-auto px-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-zinc-600 scrollbar-track-rounded scrollbar-thumb-rounded">
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
    </div>
  );
}
