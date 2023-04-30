import { LucidePersonStanding, LucideUser } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import Chip from "~/components/Chip";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function CreatorPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data) {
      void router.push("/login");
      return;
    }
  }, [session, router]);

  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className=" col-span-8">
        <div className="flex h-full flex-col gap-4 ">
          {/* top bar */}
          <div className="flex items-end justify-between">
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
              <div className="rounded-md bg-[#EDAE59] px-2 py-1 text-xs text-black">
                Unavailable
              </div>
            </div>
          </div>

          {/* banner image */}
          <div className="relative h-full w-full flex-1 rounded-xl bg-[url(/dashboard/iot.png)]">
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 bg-[#4D6B70] py-3 text-white">
              <div className="rounded-full p-1 ring-2 ring-white">
                <LucideUser color="white" />
              </div>

              <div className="text[#D9D9D9]">Ricky Abdominoa</div>
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
              className="block h-52 w-52 rounded-full ring-4 ring-white"
              src="/profile.png"
              alt=""
            />

            <div className="mx-4 my-2 bg-[#D9D9D9] px-4 py-2 rounded-md text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, maiores nam nisi, sit reiciendis quis rerum enim
              earum et tempora ut ipsum? Ducimus iste quod laboriosam, rem quo
              eligendi dolore.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
