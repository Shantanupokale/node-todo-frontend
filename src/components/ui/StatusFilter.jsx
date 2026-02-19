import { STATUS } from "../../constants/statusStyles";

const StatusFilter = ({ value, onChange }) => {
  const options = [
    { label: "ALL", value: "" },
    { label: "COMPLETED", value: STATUS.COMPLETE },
    { label: "ON HOLD", value: STATUS.ON_HOLD },
    { label: "IN PROGRESS", value: STATUS.IN_PROGRESS },
  ];

  return (
    <div className="flex items-center gap-6 py-3 border-gray-200">
      {options.map((option) => (
        <label
          key={option.label}
          className={`flex items-center gap-2 cursor-pointer text-[11px] font-medium tracking-wide transition ${
            value === option.value
              ? "text-black"
              : "text-gray-400 hover:text-gray-800"
          }`}
        >
          <input
            type="radio"
            name="status"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="accent-blue-600 w-3 h-3"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default StatusFilter;