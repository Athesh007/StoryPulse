import Navbar from "./components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./components/ui/use-toast";

const frameworks = [
  {
    value: "horror",
    label: "Horror",
  },
  {
    value: "action",
    label: "Action",
  },
  {
    value: "adventure",
    label: "Adventure",
  },
  {
    value: "fantasy",
    label: "Fantasy",
  },
  {
    value: "science_fiction",
    label: "Sci-fi",
  },
  {
    value: "mystery",
    label: "Mystery",
  },
  {
    value: "romance",
    label: "Romance",
  },
  {
    value: "comedy",
    label: "Comedy",
  },
  {
    value: "drama",
    label: "Drama",
  },
  {
    value: "thriller",
    label: "Thriller",
  },

  {
    value: "crime",
    label: "Crime",
  },
] as const;

const FormSchema = z.object({
  genre: z.string({
    required_error: "Please select a genre.",
  }),
  userdata: z.string(),
});

const App = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetcher, setFetcher] = useState<any>();
  const [formloading, setFormloading] = useState(false);
  const [chat, setChat] = useState<
    { story: string; title: string; genre: string }[]
  >([]);
  const [continue_btn, setContinue_btn] = useState(true);
  const [highlighted, setHighlighted] = useState<string | undefined>("");
  const [selectedstate, setSelectedstate] = useState(false);
  const [dummy, setDummy] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editref = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const printref = useRef<any>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    setChat((prev) => [...prev, to_insert]);
    setFetcher("data");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Continue_generation = async (event: any, choice: number) => {
    event.preventDefault();

    if (choice === 1) {
      setContinue_btn(false);
      const response = await fetch("http://localhost:3000/save-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: chat,
        }),
      }).then((resp) => resp.json());
      console.log(response);
      if (response._key) {
        toast({
          title: "Your story has been saved!",
          description: "You can view your message in gallery",
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
    const response = await fetch("http://localhost:3000/generate", {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReimagine = async (event: any) => {
    event?.preventDefault();
    setFormloading(true);
    const response = await fetch("http://localhost:3000/generate", {
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

  useEffect(() => {
    console.log(chat, "from use Effect");
  }, [chat]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormloading(true);
    try {
      const res = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genre: data.genre, userdata: data.userdata }),
      }).then((response) => response.json());
      console.log(res);
      if (res.server === "Harmful") {
        toast({
          title: "Uh oh! Harmfull content detected",
          description: "Please do not  genrate any harmful content",
        });
        setFormloading(false);
        return;
      }
      const sender = await JSON.parse(res.server);
      sender.genre = data.genre;
      setFetcher(sender);
    } catch (err) {
      console.log(err);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
      });
    }
    setFormloading(false);
  }

  return (
    <div className="w-full font-sans border-2 border-black min-h-screen flex flex-col items-center">
      <Navbar downloadref={printref} />
      <div className="w-full flex items-center justify-center lg:pt-10">
        {!fetcher ? (
          <div className="rounded-lg w-[40rem]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col rounded-lg border border-neutral-300 shadow-xl p-4 "
              >
                <FormField
                  control={form.control}
                  name="userdata"
                  render={() => (
                    <FormItem>
                      <div className=" w-full ">
                        <Textarea
                          className="py-2 pr-2 bg-transparent w-full outline-none resize-none border-none placeholder:text-neutral-400 text-base"
                          placeholder="Generate your story..."
                          onChange={(event) => {
                            form.setValue("userdata", event.target.value);
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center pt-4">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem className="flex flex-col border border-neutral-300 rounded-lg">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="secondary"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? frameworks.find(
                                      (framework) =>
                                        framework.value === field.value
                                    )?.label
                                  : "Select genre"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] mt-2 p-0 bg-white">
                            <Command>
                              <CommandInput placeholder="Search genre..." />
                              <CommandList>
                                <CommandEmpty>No genre found.</CommandEmpty>
                                <CommandGroup>
                                  {frameworks.map((framework) => (
                                    <CommandItem
                                      value={framework.label}
                                      key={framework.value}
                                      onSelect={() => {
                                        form.setValue("genre", framework.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          framework.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formloading === true ? (
                    <button
                      className="flex animate-pulse border border-neutral-500 px-4 p-2 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                      disabled
                    >
                      Processing...
                    </button>
                  ) : (
                    <Button type="submit" className="px-0">
                      <div className="bg-neutral-200 p-2 rounded-lg cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                          />
                        </svg>
                      </div>
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="w-full pt-6 lg:pt-0 md:pt-0">
            <div>
              {chat.length === 0 ? (
                <div></div>
              ) : (
                <div
                  ref={printref}
                  className="lg:w-[70%] w-[90%] md:w-[70%] p-4 lg:py-4 lg:px-0 mx-auto  flex flex-col border border-neutral-500 rounded-xl shadow-xl"
                >
                  {chat.map((solo_data, index) => (
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
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6 lg:w-[70%] md:[70%] w-[90%] mx-auto lg:pt-10 pt-6 md:pt-10">
              {loading ? (
                <div className="w-full">
                  <div className="text-xl flex flex-col lg:flex-row md:flex-row w-full justify-between gap-8 animate-pulse">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
