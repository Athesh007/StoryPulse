/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "./components/Navbar";
import { useRef, useState } from "react";
import Form_Generate from "./components/Form";
import DisplayComponent from "./components/DisplayComponent";
import Generation from "./components/Generation";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [fetcher, setFetcher] = useState<any>();
  const [formloading, setFormloading] = useState(false);
  const [chat, setChat] = useState<
    { story: string; title: string; genre: string }[]
  >([]);
  const [continue_btn, setContinue_btn] = useState(true);
  const [highlighted, setHighlighted] = useState<string | undefined>("");
  const [selectedstate, setSelectedstate] = useState(false);
  const [dummy, setDummy] = useState("");
  const editref = useRef<any>(null);
  const printref = useRef<any>(null);

  return (
    <div className="w-full font-sans min-h-screen flex flex-col items-center">
      <Navbar downloadref={printref} />
      <div className="w-full flex items-center justify-center lg:pt-10">
        {!fetcher ? (
          <div className="rounded-lg w-[40rem]">
            <Form_Generate
              setFormloading={setFormloading}
              setFetcher={setFetcher}
              formloading={formloading}
            />
          </div>
        ) : (
          <div className="w-full pt-6 lg:pt-0 md:pt-0">
            <DisplayComponent
              chat={chat}
              printref={printref}
              setSelectedstate={setSelectedstate}
              formloading={formloading}
              setHighlighted={setHighlighted}
              setDummy={setDummy}
              editref={editref}
              highlighted={highlighted}
              selectedstate={selectedstate}
              setFormloading={setFormloading}
              dummy={dummy}
              fetcher={fetcher}
              setChat={setChat}
            />
            <Generation
              loading={loading}
              fetcher={fetcher}
              continue_btn={continue_btn}
              setChat={setChat}
              setFetcher={setFetcher}
              setContinue_btn={setContinue_btn}
              setLoading={setLoading}
              chat={chat}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
