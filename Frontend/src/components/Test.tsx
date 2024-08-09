import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Test = () => {
  const location = useLocation();
  const item = location.state;
  return (
    <div>
      <Navbar />
      <div className="w-[70%] font-sans mx-auto items-center justify-center flex flex-col pt-10">
        <div className="text-2xl font-semibold p-4">{item.title}</div>
        <div className="p-4 font-semibold text-xl">Genre: {item.genre}</div>
        <div className="text-xl p-4 border border-neutral-500 shadow-xl bg-neutral-100 rounded-xl">
          {item.story}
        </div>
      </div>
    </div>
  );
};

export default Test;
