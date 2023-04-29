interface TopicProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

export default function Topic(props: TopicProps) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-[#A7CD4F] px-4 py-2">
      <div className="bg-[#8EB03F] text-[#275548] py-1 px-6 rounded-md">TOPIC</div>

      <div className="text-black truncate">{props.title}</div>
    </div>
  );
}
