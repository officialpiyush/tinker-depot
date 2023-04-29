import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function Live() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data) {
      console.log("no session");
      void router.push("/login");
      return;
    } else {
      void router.push(`/user/${session.data.user.id}/live`);
      return;
    }
  }, [router, session]);
  return <div>Live</div>;
}
