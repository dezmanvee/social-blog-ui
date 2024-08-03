const Pagination = ({page, data, paginationHandler}) => {
  return (
    <div className="flex justify-center items-center my-8 space-x-4">
        {page > 1 && (
          <button
            onClick={() => paginationHandler(page - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}

        <span className="text-sm font-semibold">
          Page {page} of {data?.totalPages}
        </span>

        {page < data?.totalPages && (
          <button
            onClick={() => paginationHandler(page + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Next
          </button>
        )}
      </div>
  )
}
export default Pagination