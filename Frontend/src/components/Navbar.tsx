import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "./ui/use-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navbar = ({ downloadref }: any) => {
  const handleDownloadPdf = async () => {
    if (downloadref.current === null) {
      toast({
        title: "Cannot Download!",
        description: "Please Generate and select story to download",
      });
      return;
    }
    if (!downloadref) {
      toast({
        title: "Cannot Download!",
        description: "Please select a story to download",
      });
      return;
    }
    const element = downloadref.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };
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
      <Button
        className="bg-slate-900 text-white hover:bg-neutral-700 hidden lg:flex"
        onClick={() => handleDownloadPdf()}
      >
        Export as PDF
      </Button>
    </div>
  );
};

export default Navbar;
