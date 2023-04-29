import { cn } from "~/lib/utils";

interface HomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  image: string;
  className?: string;
  imageClassName?: string;
  titleBg: string;
}

export default function HomeCard(props: HomeCardProps) {
  return (
    <div {...props} className={cn("relative rounded-xl", props.className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cn("rounded-xl", props.imageClassName)}
        src={props.image}
        alt={props.title}
      />

      <div
        style={{
          backgroundColor: props.titleBg,
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
