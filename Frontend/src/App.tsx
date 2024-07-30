import Navbar from "./components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";

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
  const [data, setData] = useState<
    {
      story1: string;
      story2: string;
      story1_short_form: string;
      story2_short_form: string;
    }[]
  >([
    {
      story1:
        "A man is alone in the heart of an impenetrable jungle. The canopy is so thick that even the moon's light struggles to pierce through, casting eerie shadows that dance and distort in the undergrowth. His supplies are dwindling, and a growing sense of paranoia gnaws at him. Strange noises echo through the dense foliage, and as night descends, a blood-curdling scream shatters the silence. Fear, hunger, and the unknown conspire to push him to the brink of sanity.",
      story1_short_form:
        "Lost and alone in the jungle, paranoia and terror creep in.",
      story2:
        "An experienced survivalist, Daniel, ventures into the heart of the Amazon rainforest. Armed with state-of-the-art equipment and years of training, he's prepared for the challenges that lie ahead. However, as he delves deeper, he encounters unexplainable phenomena. Ancient, whispered legends of the jungle begin to haunt his dreams. A creature, unseen but felt, stalks him through the undergrowth. His scientific mind clashes with the growing belief in the supernatural as he fights to survive.",
      story2_short_form:
        "Survivalist encounters the unexplainable in the Amazon.",
    },
    {
      story1:
        "A man is alone in the heart of an impenetrable jungle. The canopy is so thick that even the moon's light struggles to pierce through, casting eerie shadows that dance and distort in the undergrowth. His supplies are dwindling, and a growing sense of paranoia gnaws at him. Strange noises echo through the dense foliage, and as night descends, a blood-curdling scream shatters the silence. Fear, hunger, and the unknown conspire to push him to the brink of sanity.",
      story1_short_form:
        "Lost and alone in the jungle, paranoia and terror creep in.",
      story2:
        "An experienced survivalist, Daniel, ventures into the heart of the Amazon rainforest. Armed with state-of-the-art equipment and years of training, he's prepared for the challenges that lie ahead. However, as he delves deeper, he encounters unexplainable phenomena. Ancient, whispered legends of the jungle begin to haunt his dreams. A creature, unseen but felt, stalks him through the undergrowth. His scientific mind clashes with the growing belief in the supernatural as he fights to survive.",
      story2_short_form:
        "Survivalist encounters the unexplainable in the Amazon.",
    },
  ]);

  const [selected, setSelected] = useState<string[]>(["story1", "story2"]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const a = { test1: "left_story1", test2: "right_story1" };
    const b = { test1: "left_story2", test2: "right_story2" };
    setData((prev) => [...prev, a, b]);
  }

  return (
    <div className="w-full font-sans border-2 border-black min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full">
        {data.length === 0 ? (
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
                          className="py-2 pr-2 bg-transparent w-full outline-none resize-none border-none placeholder:text-neutral-400 font-medium"
                          placeholder="Ask anything..."
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
                                  "w-[200px] justify-between",
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
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-[70%] mx-auto">
            {data.map((individual_data, index: number) => (
              <div className="text-xl flex justify-between gap-8" key={index}>
                <div
                  className={`flex flex-col shadow-xl p-4 gap-2 border border-neutral-500 rounded-lg ${
                    selected[index] === "story2" && "bg-neutral-400"
                  }`}
                  onClick={() => setSelected((prev) => [...prev, "story1"])}
                >
                  <div className="text-xl font-semibold">
                    {individual_data.story1_short_form}
                  </div>
                  <div className="text-justify font-normal">
                    {individual_data.story1}
                  </div>
                </div>
                <div
                  className={`flex flex-col shadow-xl p-4 gap-2 border border-neutral-500 rounded-lg ${
                    selected[index] === "story1" && "bg-neutral-400"
                  }`}
                  onClick={() => setSelected((prev) => [...prev, "story2"])}
                >
                  <div className="text-xl font-semibold">
                    {individual_data.story2_short_form}
                  </div>
                  <div className="text-justify font-normal">
                    {individual_data.story2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
