import { Phone } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full bg-[#EDAE59] bg-[url(/dot_grid.png)] bg-right-bottom bg-no-repeat font-playfair">
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="border-2xl col-span-6 justify-between rounded-tr-3xl bg-[#45259A]">
          <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-8">
                <div>
                  <img
                    className="h-20 rounded-full ring-4 ring-white"
                    src="/PattaGobhi.png"
                    alt="patta"
                  />
                </div>

                <div className="flex gap-2 text-white">
                  <input
                    type="number"
                    className="rounded-md bg-[#9D5EE8] px-4 placeholder-white focus:outline-none focus:ring-0"
                    placeholder="Enter your phone number"
                  />

                  <div>
                    <button className="flex items-center justify-center rounded-md bg-[#EDAE59] px-4 py-3">
                      <Phone color="black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-tr-3xl bg-[#240C64] px-6 py-12 text-3xl font-bold leading-none tracking-wide text-[#EDAE59]">
              Start creating and let inspiration follow
            </div>
          </div>
        </div>
        <div className="col-span-6">.</div>
      </div>

      <div className="absolute right-0 top-0 p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className=" h-40" src="/squares.svg" alt="squares" />
      </div>
    </div>
  );
}
