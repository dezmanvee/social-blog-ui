import { Button } from "../../components/ui/button"

const Pagination = ({page, data, paginationHandler}) => {
  return (
    <div className="flex justify-center items-center my-8 space-x-4">
        {page > 1 && (
          <Button
            onClick={() => paginationHandler(page - 1)}
            className="rounded-xl bg-inherit text-slate-300 border-slate-300 border-2 hover:bg-slate-300 font-extrabold"
            variant="outline"
          >
            Previous
          </Button>
        )}

        <span className="text-sm font-semibold text-slate-200">
          Page {page} of {data?.totalPages}
        </span>

        {page < data?.totalPages && (
          <Button
            onClick={() => paginationHandler(page + 1)}
            className="rounded-xl bg-inherit text-slate-300 border-slate-300 border-2 hover:bg-slate-300 font-extrabold"
            variant="outline"
          >
            Next
          </Button>
        )}
      </div>
  )
}
export default Pagination