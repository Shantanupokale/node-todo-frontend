import { STATUS } from "../../constants/statusStyles";

const StatusFilter = ({ value, onChange }) => {
  const options = [
    { label: "ALL", value: "" },
    { label: "COMPLETED", value: STATUS.COMPLETE },
    { label: "ON HOLD", value: STATUS.ON_HOLD },
    { label: "IN PROGRESS", value: STATUS.IN_PROGRESS },
  ];

  return (
    <div className="flex items-center gap-8 mb-4">
      {options.map((option) => (
        <label
          key={option.label}
          className="flex items-center gap-2 cursor-pointer text-xs tracking-wide"
        >
          <input
            type="radio"
            name="status"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="accent-blue-600 w-4 h-4"
          />
          <span className=" text-gray-700">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default StatusFilter;