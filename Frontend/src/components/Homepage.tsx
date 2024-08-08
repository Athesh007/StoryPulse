import { useEffect, useState } from "react";
import Mapper from "./Mapper";

const Homepage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const res = async () => {
      const response = await fetch("http://localhost:3000/get-story").then(
        (res) => res.json()
      );
      setStories(response);
      console.log(response);
    };
    res();
  }, []);

  return (
    <div className="w-full border-2 border-black flex flex-col items-center p-8">
      <div className="text-xl font-sans font-semibold pb-10">Story Gallery</div>
      {stories.length !== 0 && (
        <div className="grid grid-cols-3  gap-20 w-[80%]">
          {stories.map((solo_data: { chat: [] }, index: number) => (
            <Mapper solo_data={solo_data} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;