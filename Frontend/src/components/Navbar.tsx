import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex border-2 border-red-400 w-full p-4 px-8 justify-between items-center">
      <div className="text-2xl font-semibold">Story Pulse</div>
      <Button>Export as PDF</Button>
    </div>
  );
};

export default Navbar;
