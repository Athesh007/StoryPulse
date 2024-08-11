import { useEffect, useState } from "react";
import Mapper from "./Mapper";
import Navbar from "./Navbar";

const Homepage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const res = async () => {
      const response = await fetch(
        "https://story-pulse-backend.vercel.app/get-story"
      ).then((res) => res.json());
      setStories(response);
    };
    res();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center p-8">
        <div className="text-4xl font-sans font-semibold pb-10">
          Story Gallery
        </div>
        {stories.length !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 md:w-[80%] lg:grid-cols-3 gap-6 md:gap-14 lg:gap-14 lg:w-[80%]">
            {stories.map(
              (
                solo_data: {
                  chat: [{ title: string; genre: string; story: string }];
                },
                index: number
              ) => (
                <Mapper solo_data={solo_data} key={index} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
