import { cn } from "~/lib/utils";

interface ChatBubbleProps extends React.ComponentPropsWithoutRef<"div"> {
  message: string;
  user: string;
}

export default function ChatBubble(props: ChatBubbleProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-2 px-4 py-2",
        "rounded-full",
        "bg-[#cabdd9] text-black",
        props.className
      )}
    >
      {/* <div className="flex items-center gap-1">
        <div className="h-8 w-8 rounded-full bg-yellow-800"></div>
        <div>{props.user}</div>
      </div> */}

      <div>{props.message}</div>
    </div>
  );
}
