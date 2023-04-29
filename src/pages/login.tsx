export default function LoginPage() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full bg-[#EDAE59] bg-[url(/dot_grid.png)] bg-right-bottom bg-no-repeat font-playfair">
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="border-2xl col-span-6 justify-between rounded-tr-3xl bg-[#45259A]">
          <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center">
              
            </div>

            <div className="rounded-tr-3xl bg-[#240C64] px-12 py-24 text-6xl font-bold leading-none tracking-wide text-[#EDAE59]">
              Start creating and let inspiration follow
            </div>
          </div>
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
