import React from 'react'

const Searchbox = ({search, setPage , setSearch}) => {
  return (
    <div>
    <input
    type="text"
    placeholder="Search todos..."
    value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setPage(1); // reset page on search
    }} className="px-3 py-2 border rounded-md text-sm"/>
    </div>
  )
}

export default Searchbox