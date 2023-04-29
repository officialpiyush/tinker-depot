export default function LoginPage() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full bg-[#EDAE59] bg-[url(/dot_grid.png)] bg-right-bottom bg-no-repeat">
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="border-2xl col-span-6 rounded-r-3xl bg-[#45259A]">
          .
        </div>
        <div className="col-span-6">.</div>
      </div>

      <div className="absolute right-0 top-0 p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className=" h-96" src="/squares.svg" alt="squares" />
      </div>
    </div>
  );
}
