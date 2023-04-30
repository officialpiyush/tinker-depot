import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next/types";
import { useEffect } from "react";
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
    } else {
      void router.push(`/creator/${session.data.user.id}`);
    }
  }, [session, router]);

  return <div>Loading...</div>;
}
