import { STATUS } from "../../constants/statusStyles";

const StatusFilter = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-md border text-sm"
      >
        <option value="all">All</option>
        <option value={STATUS.IN_PROGRESS}>in-progress</option>
        <option value={STATUS.ON_HOLD}>on-hold</option>
        <option value={STATUS.COMPLETE}>complete</option>
      </select>
    </div>
  );
};

export default StatusFilter;