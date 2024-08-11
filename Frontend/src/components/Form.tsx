/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

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

const Form_Generate = ({ setFormloading, setFetcher, formloading }: any) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormloading(true);
    try {
      const res = await fetch(
        "https://story-pulse-backend.vercel.app/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre: data.genre, userdata: data.userdata }),
        }
      ).then((response) => response.json());
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
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again.",
      });
    }
    setFormloading(false);
  }

  return (
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
                              (framework) => framework.value === field.value
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
  );
};

export default Form_Generate;
