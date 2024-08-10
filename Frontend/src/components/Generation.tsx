/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "./ui/use-toast";

const Generation = ({
  loading,
  fetcher,
  continue_btn,
  setChat,
  setFetcher,
  setContinue_btn,
  setLoading,
  chat,
}: any) => {
  const { toast } = useToast();

  const handleClick = async (event: any, choice: number) => {
    event?.preventDefault();
    const to_insert: { story: string; title: string; genre: string } =
      choice === 0
        ? {
            story: fetcher.story1,
            title: fetcher.title,
            genre: fetcher.genre,
          }
        : {
            story: fetcher.story2,
            title: fetcher.title,
            genre: fetcher.genre,
          };
    setChat((prev: any) => [...prev, to_insert]);
    setFetcher("data");
  };

  const Continue_generation = async (event: any, choice: number) => {
    event.preventDefault();

    if (choice === 1) {
      setContinue_btn(false);
      const response = await fetch(
        "https://story-pulse.vercel.app/save-story",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: chat,
          }),
        }
      ).then((resp) => resp.json());
      if (response._key) {
        toast({
          title: "Your story has been saved!",
          description: "You can view your story in gallery",
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please try again.",
        });
      }
      return;
    }

    setLoading(true);
    //fetch new data
    const response = await fetch("https://story-pulse.vercel.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genre: fetcher.genre,
        selected_story: chat[chat.length - 1].story,
      }),
    }).then((resp) => resp.json());
    try {
      const tester = JSON.parse(response.server);
      setFetcher(tester);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
      });
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-6 lg:w-[70%] md:[70%] w-[90%] mx-auto lg:pt-10 pt-6 md:pt-10">
      {loading ? (
        <div className="w-full">
          <div className="text-xl flex flex-col lg:flex-row md:flex-row w-full justify-between gap-8 animate-pulse pb-10">
            <div className="p-4 border rounded-lg border-neutral-500 w-full lg:h-[25rem] md:h-[25rem] h-[15rem] flex items-center justify-center">
              Please Wait...
            </div>

            <div className="p-4 border rounded-lg border-neutral-500 w-full lg:h-[25rem] md:h-[25rem] h-[15rem] flex items-center justify-center">
              Please Wait...
            </div>
          </div>
        </div>
      ) : fetcher === "data" ? (
        <div></div>
      ) : (
        <div>
          <div className="w-full flex items-center justify-center text-xl p-4 pb-4 lg:pb-10 font-semibold font-sans">
            Please select any one of the below stories to continue
          </div>
          <div className="text-xl flex justify-between gap-8 flex-col lg:flex-row">
            <div
              className="text-justify cursor-pointer"
              onClick={(e) => handleClick(e, 0)}
            >
              <div className="p-4 border rounded-lg border-neutral-500 shadow-xl">
                {fetcher.story1}
              </div>
            </div>
            <div
              className="text-justify cursor-pointer"
              onClick={(e) => handleClick(e, 1)}
            >
              <div className="p-4 border rounded-lg border-neutral-500 shadow-xl">
                {fetcher.story2}
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && continue_btn && (
        <div className="pb-6 lg:gap-20 gap-8 flex items-center justify-center lg:w-[90%] md:w-[90%]">
          <button
            className="p-2 px-4 boredr border-neutral-500 bg-neutral-900 rounded-lg text-white text-lg"
            onClick={(e) => Continue_generation(e, 0)}
          >
            Continue Story
          </button>

          <button
            className="p-2 px-4 boredr border-neutral-500 bg-neutral-900 rounded-lg text-white text-lg"
            onClick={(e) => Continue_generation(e, 1)}
          >
            Save Story
          </button>
        </div>
      )}
    </div>
  );
};

export default Generation;
