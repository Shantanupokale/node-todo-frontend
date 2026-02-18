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
      className="px-3 py-2 border rounded-md text-sm bg-white shadow-sm"
    >
      <option value={4}>4 records</option>
      <option value={5}>5 records</option>
      <option value={8}>8 records</option>
    </select>
    </div>
  )
}

export default RecordController