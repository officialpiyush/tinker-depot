import {
  LucideCheckCircle,
  LucideCoins,
  LucideMail,
  LucideMessageSquare,
  LucidePersonStanding,
  LucidePhone,
  LucideUser,
  LucideVideo,
  LucideXCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import Chip from "~/components/Chip";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function CreatorPage() {
  const session = useSession();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [creatorAvailable, setCreatorAvailable] = useState(false);

  const { userId } = router.query;

  const { data: creatorData, refetch: creatorRefetch } =
    api.creators.getCreator.useQuery({
      userId: userId as string,
    });
  const registerForNotificationMutation =
    api.creators.addToNotification.useMutation();
  const statusMutation = api.creators.toggleAvailability.useMutation();

  useEffect(() => {
    if (!session.data) {
      void router.push("/login");
      return;
    }
  }, [session, router]);

  useEffect(() => {
    if (creatorData?.available !== undefined) {
      setCreatorAvailable(creatorData.available);
    }
  }, [creatorData]);

  const registerForNotificaton = async () => {
    await registerForNotificationMutation.mutateAsync({
      userId: userId as string,
    });

    alert("Done!");
  };

  const toggleStatus = async () => {
    await statusMutation.mutateAsync({
      available: !creatorData?.available,
    });

    void creatorRefetch();
  };

  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className=" col-span-8">
        <div className="flex h-full flex-col gap-4 ">
          {/* top bar */}
          <div className="flex items-center justify-between">
            {/* about the author */}
            <div className="flex w-fit items-center gap-2 rounded-3xl rounded-bl-none bg-[#D9D9D9] py-2 pl-2 pr-4">
              <div className="rounded-full bg-[#714F4F] p-2">
                <LucidePersonStanding size={20} color="#D5B8B8" />
              </div>

              <span className="text-md">About the Creator</span>
            </div>

            {/* status indicator */}
            <div className="flex w-fit items-center gap-2 rounded-md bg-[#8C78C3] px-2 py-1 text-sm text-white">
              Status
              <div
                style={{
                  backgroundColor: creatorData?.available
                    ? "#A7CD4F"
                    : "#EDAE59",
                }}
                className="rounded-md px-2 py-1 text-xs text-black"
              >
                {creatorData?.available ? "Available" : "Unavailable"}
              </div>
            </div>

            <div
              className={cn(
                session.data?.user.id !== userId && "hidden",
                "flex items-center"
              )}
              onClick={() => void toggleStatus()}
            >
              <button className="rounded-md bg-[#EDAE59] px-4 py-2 text-sm hover:bg-opacity-90">
                Toggle Status
              </button>
            </div>
          </div>

          {/* banner image */}
          <div className="relative h-full w-full flex-1 rounded-xl bg-[url(/dashboard/iot.png)]">
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 bg-[#4D6B70] py-3 text-white">
              <div className="rounded-full p-1 ring-2 ring-white">
                <LucideUser color="white" />
              </div>

              <div className="text[#D9D9D9]">
                {session.data?.user.name || "Ghost"}
              </div>
            </div>
          </div>

          {/* project */}
          <div className="flex flex-col gap-2">
            <Chip className="mb-2 w-fit bg-white" title="Projects" />

            {[
              "Getting started with IoT Devices",
              "Understanding the Node MCU",
            ].map((chip, index) => (
              <Link
                key={index}
                href={`/creators/${
                  session.data?.user.id || "ghost"
                }/${encodeURIComponent(chip)}`}
              >
                <Chip
                  className=" rounded-md bg-[#CABDD9] py-2 hover:underline"
                  title={chip}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* right sidebar */}
      <div className="col-span-4 h-full ">
        <div className="flex h-full flex-col justify-between gap-4">
          {/* profile */}
          <div className="flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="block h-52 w-52 rounded-full object-cover ring-4 ring-white"
              src="/neko.jpeg"
              alt=""
            />

            <div className="mx-4 my-2 rounded-md bg-[#D9D9D9] px-4 py-2 text-center">
              Hi there! My name is {session.data?.user.name} and I'm a hobbyist
              who loves exploring new activities in my free time. I'm always on
              the lookout for new hobbies to try and I enjoy challenging myself
              to learn new skills. One of my favorite hobbies is tinkering with
              IoT devices, which I've been doing for the past few years. I love
              [doing it as it keeps my brain fresh, and it's an excellent way
              for me to unwind and destress after a busy day.
            </div>
          </div>

          {/* contact icons */}
          <div className="flex gap-4">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-[#EDAE59]">
              <div className="rounded-full border border-black p-4">
                <LucideCoins size={42} color="#623D0B" />
              </div>

              <button className="rounded-full bg-[#B76F0E] px-12 py-2">
                Support
              </button>
            </div>

            <div className="flex w-full flex-col items-center gap-4 rounded-xl bg-[#8C78C3]">
              <button
                onClick={() => void registerForNotificaton()}
                disabled={creatorData?.available}
                className="flex gap-2 px-4 pt-4  text-[#E7E1F6] disabled:cursor-not-allowed"
              >
                <LucideMail size={20} color="white" />
                SMS when available
              </button>
              <div className="flex w-full flex-col gap-6 rounded-xl bg-[#A7CD4F] px-4 py-6 text-sm font-medium">
                <div className="flex items-center justify-between gap-2">
                  <LucideMessageSquare size={20} color="black" />
                  <div>Whatsapp</div>
                  {creatorAvailable ? (
                    <LucideCheckCircle size={20} color="#56672E" />
                  ) : (
                    <LucideXCircle size={20} color="#56672E" />
                  )}
                </div>

                <Link href={`/call/${session.data?.user.id || "ghost"}`}>
                  <div className="flex items-center justify-between gap-2 hover:underline">
                    <LucideVideo size={20} color="black" />
                    <div>Video Call</div>
                    {creatorAvailable ? (
                      <LucideCheckCircle size={20} color="#56672E" />
                    ) : (
                      <LucideXCircle size={20} color="#56672E" />
                    )}
                  </div>
                </Link>

                <Link href={`/call/${session.data?.user.id || "ghost"}`}>
                  <div className="flex items-center justify-between gap-2 hover:underline">
                    <LucidePhone size={20} color="black" />
                    <div>Voice Call</div>
                    {creatorAvailable ? (
                      <LucideCheckCircle size={20} color="#56672E" />
                    ) : (
                      <LucideXCircle size={20} color="#56672E" />
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
