const Mapper = ({ solo_data }: { solo_data: { chat: [] } }) => {
  return (
    <div
      className="border border-neutral-500 shadow-xl rounded-lg h-[17rem] p-4 cursor-pointer"
      onClick={() => console.log(solo_data)}
    >
      Test Data
    </div>
  );
};

export default Mapper;
