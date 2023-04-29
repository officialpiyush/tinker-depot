import { cn } from "~/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function Chip(props: ChipProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-full px-4 py-1 text-sm focus:outline-none",
        "bg-[#D6A15A]",
        props.className
      )}
    >
      #{props.title}
    </div>
  );
}
