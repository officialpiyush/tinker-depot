import { LucideCamera, LucidePhone, LucideVideo } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type GetServerSideProps } from "next/types";
import { useEffect } from "react";
import Topic from "~/components/Topic";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function UserLivePage() {
  const router = useRouter();
  const session = useSession();

  const { id } = router.query;

  useEffect(() => {
    console.log(session);
    if (!session) {
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
    </div>
  );
}
