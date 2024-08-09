import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex border-2 border-red-400 w-full p-4 px-8 justify-between items-center">
      <div className="text-2xl font-semibold">Story Pulse</div>
      <div className="flex gap-4 text-xl font-semibold">
        <Link
          to={"/gallery"}
          className="p-2 text-base hover:bg-neutral-800 cursor-pointer rounded-xl flex items-center justify-center bg-black text-white"
        >
          Gallery
        </Link>
        <Link
          to={"/"}
          className="p-2 text-base hover:bg-neutral-800 cursor-pointer rounded-xl flex items-center justify-center bg-black text-white"
        >
          Homepage
        </Link>
      </div>
      <Button className="bg-slate-900 text-white hover:bg-neutral-700 hidden lg:flex">
        Export as PDF
      </Button>
    </div>
  );
};

export default Navbar;
