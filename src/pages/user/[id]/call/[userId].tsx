import dayjs from "dayjs";
import { LucidePhone, LucideVideo } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import Topic from "~/components/Topic";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function UserCallPage() {
  const router = useRouter();
  const session = useSession();
  const [now, setNow] = useState("00:00 GG");

  const { id, userId } = router.query;

  const { data, error } = api.users.getNameFromId.useQuery({
    userId: userId as string,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs().format("HH:mm:s A"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(session);
    if (!session || session.data?.user.id !== id) {
      void router.push("/login");
      return;
    }
  }, [session, router]);

  return (
    <div className="grid h-full grid-cols-12 gap-4">
      {/* calling screen */}
      <div className="col-span-8 flex h-full flex-col gap-4">
        <div className="flex w-fit items-center gap-2 rounded-3xl rounded-bl-none bg-[#D9D9D9] py-2 pl-2 pr-4">
          <div className="rounded-full bg-[#714F4F] p-2">
            <LucidePhone size={20} color="#D5B8B8" />
          </div>

          <span className="text-md">Calling Screen</span>
        </div>

        {/* call screen */}
        <div className="flex-1">
          <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-[#CABDD9]">
            <div className="rounded-full bg-white p-6 ring-2 ring-black">
              <LucidePhone size={52} color="#8C78C3" />
            </div>

            <span>Start a Call</span>
          </div>
        </div>

        <Topic title="ESP8266" />

        <div className="flex w-full items-center justify-center">
          <div className="w-fit">
            <button className="flex items-center gap-4 rounded-full bg-[#E84D4D] py-1 pl-1 pr-6 hover:bg-opacity-90">
              <div className="rounded-full bg-[#512D2D] p-2">
                <LucideVideo color="#E5BEBE" />
              </div>

              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-4 flex h-full flex-col gap-4">
        <div className="flex w-full gap-2">
          <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
            <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              00 : 00
            </div>

            <div className="font-medium uppercase">Ongoing Call</div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
            <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              {now}
            </div>

            <div className="font-medium uppercase">Current Time</div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2 rounded-md bg-[#8C78C3] px-4 py-4 text-[#EDE6F4]">
          {/* <div className="rounded-md bg-[#CABDD9] px-4 py-2 text-black">
              00 : 00
            </div> */}

          <div className="text-xl font-bold">
            {error ? "Error" : data?.userName ?? "Loading..."}
          </div>

          <div className="font-medium uppercase">Talking with</div>
        </div>

        <div className="flex flex-1 flex-col-reverse gap-4 rounded-md bg-[#A7CD4F] px-4 py-4 font-mono">
          <div className="flx w-full justify-center">
            <div className="flex justify-center rounded-md bg-[#8EB03F] px-8 py-2 text-center text-xl font-bold text-[#275548]">
              NOTES
            </div>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Your place to take some notes"
              className="h-full w-full resize-none rounded-md bg-[#A7CD4F] p-2 placeholder-zinc-600 focus:outline-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}