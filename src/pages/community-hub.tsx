import Chip from "~/components/Chip";

export default function CommunityHub() {
  return (
    <div className="flex h-full items-center gap-8 py-4">
      {[
        {
          image: "/cmt/genshin.png",
          title: "Sowing a chibi Yae Miko Genshin plushie [ for beginners ]",
          tags: "#sewing and tailoring",
        },
        {
          image: "/cmt/mochi.png",
          title: "3 ingredient strawberry mochi recipe [ for beginners <3 ] ",
          tags: "#cooking",
        },
        {
          image: "/cmt/blender.png",
          title: "Blender 3D modelling a living room [ Intermediate ]",
          tags: "#3D modelling",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex h-full flex-col rounded-xl bg-[#a7cd4f] px-4 py-4"
        >
          <div
            className="relative h-48 w-96 rounded-xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute left-0 top-0 px-4 py-4">
              <Chip className="mb-2 w-fit bg-opacity-50" title="Trending" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-center gap-3 rounded-b-xl bg-[#4D6B70] bg-opacity-70 py-3 text-xs text-white">
              <div className="text[#D9D9D9]">{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
