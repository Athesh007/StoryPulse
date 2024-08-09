/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef } from "react";

const Test = () => {
  const location = useLocation();
  const item = location.state;
  const printref = useRef<any>(null);
  return (
    <div>
      <Navbar downloadref={printref} />
      <div
        className="lg:w-[70%] w-[90%] md:w-[70%] font-sans mx-auto items-center justify-center flex flex-col lg:py-10 py-6"
        ref={printref}
      >
        <div className="text-2xl font-semibold p-4">{item.title}</div>
        <div className="p-4 font-semibold text-xl">
          Genre: {item.genre.slice(0, 1).toUpperCase() + item.genre.slice(1)}
        </div>
        <div className="text-xl p-4 border border-neutral-500 shadow-xl bg-neutral-100 rounded-xl">
          {item.story}
        </div>
      </div>
    </div>
  );
};

export default Test;
