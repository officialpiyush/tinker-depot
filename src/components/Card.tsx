import { cn } from "~/lib/utils";

interface HomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  image: string;
  className?: string;
  imageClassName?: string;
}

export default function HomeCard(props: HomeCardProps) {
  return (
    <div {...props} className={cn("rounded-xl", props.className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cn("rounded-xl", props.imageClassName)}
        src={props.image}
        alt={props.title}
      />
    </div>
  );
}
