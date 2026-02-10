const FancyInput = ({
  Icon,
  desc,
  placeholder,
  type = "text",
  value,
  onChange,
  }) => {
  return (
    <>
    <div className="flex flex-col gap-0">
      <p className="font-semibold text-xs">{desc}</p>
      <div className="relative flex w-full">
        {Icon && <Icon className="absolute left-2 top-[0.4rem] h-5 text-gray-400" />}
        <input
          className="w-full rounded border bg-white py-1 pr-3 pl-10 text-black"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
    </>
  );
};

export default FancyInput;
