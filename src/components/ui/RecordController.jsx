import React from 'react'

const RecordController = ({ limit , setLimit , setPage}) => {
  return (
    <div>
        <select
      value={limit}
      onChange={(e) => {
        setLimit(parseInt(e.target.value));
        setPage(1);
      }}
className="px-2 py-1 border rounded-md text-[11px] bg-gray-900 text-white hover:bg-gray-800 transition"    >
      <option value={4}>4 records</option>
      <option value={5}>5 records</option>
      <option value={8}>8 records</option>
    </select>
    </div>
  )
}

export default RecordController