export default function QueryRoom() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
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
            <div className="bg-[#a7cd4f] text-center rounded-xl h-full py-6 px-8">
                Query
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
