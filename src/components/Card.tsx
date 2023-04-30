import { cn } from "~/lib/utils";

interface HomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  image: string;
  className?: string;
  titlebg: string;
}

export default function HomeCard(props: HomeCardProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${props.image})`,
      }}
      {...props}
      className={cn(
        "relative h-full w-full rounded-xl bg-cover bg-center bg-no-repeat",
        props.className
      )}
    >
      <div
        style={{
          backgroundColor: props.titlebg,
        }}
        className={cn(
          "absolute bottom-0 left-0 right-0 py-4 text-center",
          `rounded-b-xl`,
          "text-white"
        )}
      >
        {props.title}
      </div>
    </div>
  );
}
