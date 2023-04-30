export default function QueryRoom() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      {new Array(3).fill(0).map((_, i) => (
        <div key={i} className="grid w-full grid-cols-12 gap-4">
          <div className="col-span-6 flex flex-col justify-between gap-24 rounded-xl bg-[#d87d7d] px-8 py-4">
            <div className="flex items-center justify-between">
              <div>Keyboard Modding w/ tape</div>
              <div>Alex Holt </div>
            </div>

            <div className="w-full">
              <input
                className="w-full rounded-xl px-4 py-2"
                placeholder="Continue chatting"
                type="text"
              />
            </div>
          </div>

          <div
            className="bg-repeat-none col-span-3 h-full w-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/keyboard.png)",
            }}
          ></div>

          <div className="col-span-3 flex flex-col">
            <div className="h-full rounded-xl bg-[#a7cd4f] py-4 text-center">
              Query
              <textarea
                className="h-full w-full rounded-xl bg-[#a7cd4f] px-4 pt-4 focus:outline-none text-black placeholder-zinc-500"
                placeholder="Write queries here do you don't forget in the conversation"
              ></textarea>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
