import React from 'react'

const PageController = ({ page , setPage , totalPages }) => {
  return (
    <div>
        <div className="flex items-center justify-center gap-4 mt-8">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-4 py-1.5 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-50"
    >
      Prev
    </button>

    <span className="text-sm text-gray-600">
      Page <span className="font-medium">{page}</span> of{" "}
      <span className="font-medium">{totalPages}</span>
    </span>

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="px-4 py-1.5 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-50"
    >
      Next
    </button>
  </div>
    </div>
  )
}

export default PageController