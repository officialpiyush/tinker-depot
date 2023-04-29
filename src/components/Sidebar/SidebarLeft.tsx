import {
  Home,
  LucideHelpCircle,
  LucideLogOut,
  LucideMessagesSquare,
  LucideUsers,
  Youtube,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function Sidebar() {
  const LinksAndIcons = [
    {
      name: "Home",
      icon: <Home className="" color="black" size="25" />,
      link: "/",
    },
    {
      name: "Live",
      icon: <Youtube className="" color="black" size="25" />,
      link: "/live",
    },
    {
      name: "Query",
      icon: <LucideHelpCircle className="" color="black" size="25" />,
      link: "/query",
    },
    {
      name: "Creator Hub",
      icon: <LucideUsers className="" color="black" size="25" />,
      link: "/creator",
    },
    {
      name: "Project Chat",
      icon: <LucideMessagesSquare className="" color="black" size="25" />,
      link: "/project-chat",
    },
  ];

  return (
    <div className="flex h-full flex-col items-center gap-8 p-8">
      <div>
        <div className="h-16 w-16 rounded-full bg-[#EDAE59]" />
      </div>

      <div className="flex h-full flex-col items-center gap-6 rounded-full bg-[#EDAE59] px-3 py-6">
        {LinksAndIcons.map((link) => (
          <Link
            className={cn("rounded-full px-2 py-2 hover:bg-zinc-700/20")}
            key={link.link}
            href={link.link}
          >
            {link.icon}
          </Link>
        ))}

        <div className=" mt-auto">
          <button
            className="rounded-full px-2 py-2 hover:bg-red-700/20"
            onClick={() => void signOut()}
          >
            <LucideLogOut color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}
