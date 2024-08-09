import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Mapper = ({ solo_data }: { solo_data: { chat: [] } }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="border border-neutral-500 shadow-xl rounded-lg h-[17rem] p-6 cursor-pointer flex flex-col justify-between"
        onClick={() => navigate("/test", { state: solo_data.chat[0] })}
      >
        <div className="text-3xl font-semibold font-sans">
          {solo_data.chat[0].title}
        </div>
        <div className="font-semibold">
          Genre <div className="text-xl"> {solo_data.chat[0].genre}</div>
        </div>
      </div>
    </div>
  );
};

export default Mapper;
