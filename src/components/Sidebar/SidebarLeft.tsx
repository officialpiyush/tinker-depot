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

export default function Sidebar() {
  const LinksAndIcons = [
    {
      name: "Home",
      icon: <Home className="" size="30" />,
      link: "/",
    },
    {
      name: "Live",
      icon: <Youtube className="" size="30" />,
      link: "/live",
    },
    {
      name: "Query",
      icon: <LucideHelpCircle className="" size="30" />,
      link: "/query",
    },
    {
      name: "Creator Hub",
      icon: <LucideUsers className="" size="30" />,
      link: "/creator",
    },
    {
      name: "Project Chat",
      icon: <LucideMessagesSquare className="" size="30" />,
      link: "/project-chat",
    },
  ];

  return (
    <div className="flex h-full flex-col items-center gap-8 p-8">
      <div>
        <div className="h-20 w-20 rounded-full bg-[#EDAE59]" />
      </div>

      <div className="flex h-full flex-col items-center gap-6 rounded-full bg-[#EDAE59] px-3 py-6">
        {LinksAndIcons.map((link) => (
          <Link
            className="rounded-full px-3 py-3 hover:bg-zinc-700/20"
            key={link.link}
            href={link.link}
          >
            {link.icon}
          </Link>
        ))}

        <div className=" mt-auto">
          <button
            className="rounded-full px-3 py-3 hover:bg-red-700/20"
            onClick={() => void signOut()}
          >
            <LucideLogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
