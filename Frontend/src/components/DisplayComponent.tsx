/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";

const DisplayComponent = ({
  chat,
  printref,
  setSelectedstate,
  formloading,
  setHighlighted,
  setDummy,
  editref,
  highlighted,
  selectedstate,
  setFormloading,
  dummy,
  fetcher,
  setChat,
}: any) => {
  const handleReimagine = async (event: any) => {
    event?.preventDefault();
    setFormloading(true);
    const response = await fetch("https://story-pulse.vercel.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_chat: chat[chat.length - 1].story,
        need_change: dummy,
        genre: fetcher.genre,
        input: editref.current?.value,
      }),
    }).then((res) => res.json());
    const tester = JSON.parse(response.server);
    const newarr = [...chat];
    newarr[chat.length - 1] = tester;
    setChat(newarr);
    setSelectedstate(false);
    setFormloading(false);
  };
  return (
    <div>
      {chat.length === 0 ? (
        <div></div>
      ) : (
        <div
          ref={printref}
          className="lg:w-[70%] w-[90%] md:w-[70%] p-4 lg:py-4 lg:px-0 mx-auto  flex flex-col border border-neutral-500 rounded-xl shadow-xl"
        >
          {chat.map(
            (
              solo_data: { story: string; title: string; genre: string },
              index: number
            ) => (
              <div
                key={index}
                className="text-xl relative"
                onMouseUp={() => {
                  setSelectedstate(true);

                  setHighlighted(window.getSelection()?.toString());
                  if (highlighted) {
                    setDummy(highlighted);
                  }
                }}
              >
                {index === 0 && (
                  <div className="w-full pb-4 items-center justify-center flex font-semibold text-3xl">
                    {solo_data.title}
                  </div>
                )}

                {selectedstate && (
                  <div className="w-[95%] mx-auto p-2 border border-neutral-500 rounded-xl text-white">
                    <textarea
                      className="w-full border-none resize-none text-black outline-none text-lg"
                      ref={editref}
                    />
                    <div className="flex justify-end">
                      {formloading === true ? (
                        <button
                          className="flex animate-pulse border border-neutral-500 px-4 p-2 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                          disabled
                        >
                          Please wait...
                        </button>
                      ) : (
                        <button
                          className="text-white bg-black pt-1 pb-2 px-4 text-base rounded-lg flex items-center justify-center"
                          onClick={handleReimagine}
                        >
                          ReImagine
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <ReactMarkdown className="lg:px-6 py-2">
                  {solo_data.story}
                </ReactMarkdown>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayComponent;
